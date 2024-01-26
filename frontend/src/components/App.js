import "../index.css";
import React, { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip.js";
import { Route, Routes, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { registerUser, authorizeUser } from "../utils/auth";
//import 'dotenv/config'; //revisar después

function App() {
	//console.log({ env: process.env.REACT_APP_NODE_ENV })

	const [currentUser, setCurrentUser] = useState({}); //revisar
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
	const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
	const [isImageOpen, setIsImageOpen] = useState(false);
	const [selectedCard, setSelectedCard] = useState({});
	const [cards, setCards] = useState([]);
	const [loggedIn, setLoggedIn] = useState(false);
	const [email, setEmail] = useState('');
	const [token, setToken] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		async function handleToken() {
			if (localStorage.getItem("userToken")) {
				const token = localStorage.getItem("userToken");
				const response = await api.checkUserToken(token);
				const userData = await response.json();
				if (userData.email) {
					setToken(token);
					setLoggedIn(true);
					setEmail(userData.email);
					navigate("/");
				}
			}
		}
		handleToken();
	}, [token]);

	useEffect(() => {
		if (token) {
			api
				.getCards(token)
				.then((res) => {
					setCards(res.cards);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, [token]);

	useEffect(() => {
		if (token) {
			api
				.getProfileInitialInfo(token)
				.then((res) => {
					setCurrentUser({ ...res, email });
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, [token]);

	function handleCardLike(card) {
		const isLiked = card.likes.some((owner) => {
			return owner === currentUser._id;
		});
		api.changeLikeCardStatus(token, card._id, isLiked)
			.then((newCard) => {
				setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
			})
			.catch((error) => {
				console.log(error);
			});
	}
	function handleAddPlace(name, link) {
		//if (name && link) {
		api.addNewCard(token, name, link)
			.then((data) => {
				setCards([data, ...cards]);
				closeAllPopups();
			})
			.catch((error) => {
				if (error === 400) {
					console.log(error + '40000000000'); //arreglando
					console.log(error);

				}
			});
		/* 		} else {
					console.log('Por favor completa ambos campos') //arreglando
				} */
	}
	function handleCardDelete(card) {
		api.deleteCard(token, card._id)
			.then(() => {
				setCards(
					cards.filter((item) => {
						return item._id !== card._id;
					})
				);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	function handleUpdateUser(user) {
		api.editProfileInfo(token, user.name, user.about)
			.then((data) => {
				setCurrentUser(data);
				closeAllPopups();
			})
			.catch((error) => {
				console.log(error);
			});
	}

	function handleUpdateAvatar(avatar) {
		api.editProfileAvatar(token, avatar)
			.then((data) => {
				setCurrentUser(data);
				closeAllPopups();
			})
			.catch((error) => {
				console.log(error);
			});
	}
	function handleEditProfileClick() {
		setIsEditProfilePopupOpen(true);
	}
	function handleAddPlaceClick() {
		setIsAddPlacePopupOpen(true);
	}
	function handleInfoTooltipClick() {
		setIsInfoTooltipPopupOpen(true);
	}
	function handleEditAvatarClick() {
		setIsEditAvatarPopupOpen(true);
	}
	function handleImageOpenClick(card) {
		setSelectedCard(card);
		setIsImageOpen(true);
	}
	function closeAllPopups() {
		setIsEditProfilePopupOpen(false);
		setIsAddPlacePopupOpen(false);
		setIsEditAvatarPopupOpen(false);
		setIsImageOpen(false);
	}
	async function handleUserRegister(email, password) {
		await registerUser(email, password);
	}
	async function handleUserLogin(email, password) {
		const awaitToken = await authorizeUser(email, password);
		localStorage.setItem("userEmail", email);
		setToken(awaitToken);
	}
	function handleChangeLoginState() {
		setLoggedIn(true);
	}
	return (
		<div className="App container">
			<CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
				<Header />
				<Routes>
					<Route
						path="/signin"
						element={
							<Login
								handleUserLogin={handleUserLogin}
								handleChangeLoginState={handleChangeLoginState}
							/>
						}
					/>
					<Route
						path="/signup"
						element={<Register handleUserRegister={handleUserRegister} />}
					/>
					<Route path="/" element={<ProtectedRoute loggedIn={loggedIn} />}>
						<Route
							path="/"
							element={
								<Main
									onEditProfileClick={handleEditProfileClick}
									onAddPlaceClick={handleAddPlaceClick}
									onInfoTooltipClick={handleInfoTooltipClick}
									onEditAvatarClick={handleEditAvatarClick}
									closeAllPopups={closeAllPopups}
									isImageOpen={isImageOpen}
									onOpenImage={handleImageOpenClick}
									selectedCard={selectedCard}
									cards={cards}
									onCardLike={handleCardLike}
									onCardDelete={handleCardDelete}
								/>
							}
						/>
					</Route>
				</Routes>

				<Footer />

				<EditProfilePopup
					isOpen={isEditProfilePopupOpen}
					onClose={closeAllPopups}
					onUpdateUser={handleUpdateUser}
				/>

				<EditAvatarPopup
					isOpen={isEditAvatarPopupOpen}
					onClose={closeAllPopups}
					onUpdateAvatar={handleUpdateAvatar}
				/>

				<AddPlacePopup
					isOpen={isAddPlacePopupOpen}
					onClose={closeAllPopups}
					onAddPlace={handleAddPlace}
				/>

				<InfoTooltip
					isOpen={isInfoTooltipPopupOpen}
					onClose={closeAllPopups}
					onAddPlace={handleAddPlace}
				/>
			</CurrentUserContext.Provider>
		</div>
	);
}

export default App;
