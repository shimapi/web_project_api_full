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
import useEscKey from "../custom-hooks/useEscKey.js";

function App() {

	const [currentUser, setCurrentUser] = useState({});
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
	const [isImageOpen, setIsImageOpen] = useState(false);
	const [selectedCard, setSelectedCard] = useState({});
	const [cards, setCards] = useState([]);
	const [loggedIn, setLoggedIn] = useState(false);
	const [token, setToken] = useState('');
	const [error, setError] = React.useState('');
	const [openInfoTool, setOpenInfoTool] = React.useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		async function handleToken() {
			if (localStorage.getItem("userToken")) {
				const token = localStorage.getItem("userToken");
				setToken(token);
				setLoggedIn(true);
				navigate("/");
			}
		}
		handleToken();
	}, [navigate, token]);

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
					setCurrentUser({ ...res });
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, [token]);

	function closeAllPopups() {
		setIsEditProfilePopupOpen(false);
		setIsAddPlacePopupOpen(false);
		setIsEditAvatarPopupOpen(false);
		setIsImageOpen(false);
		setError('');
		setOpenInfoTool(false);
	}


	useEscKey(closeAllPopups);

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
		api.addNewCard(token, name, link)
			.then((data) => {
				setCards([data, ...cards]);
				closeAllPopups();
			})
			.catch((error) => {
				console.log(error);
			});
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
		setOpenInfoTool(true);
	}
	function handleEditAvatarClick() {
		setIsEditAvatarPopupOpen(true);
	}
	function handleImageOpenClick(card) {
		setSelectedCard(card);
		setIsImageOpen(true);
	}

	async function handleUserRegister(email, password) {
		try {
			await registerUser(email, password);
			navigate('/signin');
		}
		catch (error) {
			return Promise.reject(error);
		}
	}
	async function handleUserLogin(email, password) {
		try {
			const awaitToken = await authorizeUser(email, password);
			localStorage.setItem("userEmail", email);
			setToken(awaitToken);
			return { email, password }
		}
		catch (error) {
			return Promise.reject(error);
		}
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
						element={
							<Register
								handleUserRegister={handleUserRegister}
							/>}
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
					openInfoTool={openInfoTool}
					handleClose={closeAllPopups}
					error={error}
				/>
			</CurrentUserContext.Provider>
		</div>
	);
}

export default App;
