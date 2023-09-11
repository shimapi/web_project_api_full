import React, { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
	const currentUser = useContext(CurrentUserContext);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");

	useEffect(() => {
		setName(currentUser.name);
		setDescription(currentUser.about);
	}, [currentUser]);

	function handleSubmit(e) {
		e.preventDefault();
		onUpdateUser({
			name,
			about: description,
		});
	}

	const handleChangeUsername = (e) => {
		setName(e.target.value);
	};
	const handleChangeDescription = (e) => {
		setDescription(e.target.value);
	};

	return (
		<PopupWithForm
			title="Editar Perfil"
			submitText="Guardar"
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
		>
			<input
				type="text"
				id="edit-profile__name"
				name="editProfileName"
				className="form__input modal__input edit-profile__input edit-profile__name"
				required
				minLength="2"
				maxLength="40"
				value={name || ""}
				onChange={handleChangeUsername}
			/>
			<span className="edit-profile__name-error form__input-error"></span>
			<input
				type="text"
				id="edit-profile__about"
				name="editProfileAbout"
				className="form__input modal__input edit-profile__input edit-profile__about"
				required
				minLength="2"
				maxLength="200"
				value={description || ""}
				onChange={handleChangeDescription}
			/>
			<span className="edit-profile__about-error form__input-error"></span>
		</PopupWithForm>
	);
}
