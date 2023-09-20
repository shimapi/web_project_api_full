import "../index.css";
import React, { useState, useEffect, useContext } from "react";
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

function App() {
	const currentUserContext = useContext(CurrentUserContext);

	const [currentUser, setCurrentUser] = useState({});
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
	const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
	const [isImageOpen, setIsImageOpen] = useState(false);
	const [selectedCard, setSelectedCard] = useState({});
	const [cards, setCards] = useState([]);
	const [loggedIn, setLoggedIn] = useState(false);
	const [email, setEmail] = useState("");
	const navigate = useNavigate();
	const [token, setToken] = useState(localStorage.getItem('userToken'));

	useEffect(() => {
		async function handleToken() {
			const storedToken = localStorage.getItem('userToken');
			if (storedToken) {
				// const token = localStorage.getItem("userToken");
				setToken(storedToken);
				const response = await api.checkUserToken(token);
				const userData = await response.json();
				if (userData.data.email) {
					setLoggedIn(true);
					setEmail(userData.data.email);
					navigate("/");
				}
			}
		}
		handleToken();
	}, []);

	useEffect(() => {
		api.getCards().then((res) => {
			setCards(res);
		});
	}, []);

	useEffect(() => {
		api
			.getProfileInitialInfo()
			.then((res) => {
				setCurrentUser({ ...res, email });
				currentUserContext.setCurrentUser({ ...res, email });
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	function handleCardLike(card) {
		const isLiked = card.likes.some((i) => i._id === currentUser._id);

		api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
			setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
		});
	}
	function handleAddPlace(name, link) {
		api.addNewCard(name, link).then((data) => {
			setCards([data, ...cards]);
			closeAllPopups();
		});
	}
	function handleCardDelete(card) {
		api.deleteCard(card._id).then(() => {
			setCards(
				cards.filter((item) => {
					return item._id !== card._id;
				})
			);
		});
	}

	function handleUpdateUser(user) {
		api.editProfileInfo(user.name, user.about).then((data) => {
			setCurrentUser(data);
			closeAllPopups();
		});
	}

	function handleUpdateAvatar(avatar) {
		api.editProfileAvatar(avatar).then((data) => {
			setCurrentUser(data);
			closeAllPopups();
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
		await authorizeUser(email, password);
		localStorage.setItem("userEmail", email);
	}
	function handleChangeLoginState() {
		setLoggedIn(true);
	}
	return (
		<div className="App container">
			<CurrentUserContext.Provider value={currentUser}>
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
