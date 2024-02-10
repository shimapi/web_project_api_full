import React, { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { errEditName, errEditOcupation, inputOK, classSuccessStyle } from '../utils/variables.js'

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
	const { currentUser } = useContext(CurrentUserContext);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [inputErrorUsername, setInputErrorUsername] = useState('');
	const [inputErrorDescription, setInputErrorDescription] = useState('');
	const [classSuccessUsername, setClassSuccessUsername] = useState('');
	const [classSuccessDescription, setClassSuccessDescription] = useState('');

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
		if ((e.target.value.length < 2) && (e.target.value.length < 30)) {
			setInputErrorUsername(errEditName);
			setClassSuccessUsername('');
		} else {
			setInputErrorUsername(inputOK);
			setClassSuccessUsername(classSuccessStyle);
		}
		setName(e.target.value);
	};
	const handleChangeDescription = (e) => {
		if ((e.target.value.length < 2) && (e.target.value.length < 30)) {
			setInputErrorDescription(errEditOcupation);
			setClassSuccessDescription('');
		} else {
			setInputErrorDescription(inputOK);
			setClassSuccessDescription(classSuccessStyle);
		}
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
				maxLength="30"
				value={name || ""}
				onChange={handleChangeUsername}
			/>
			<span className={`edit-profile__name-error form__input-error ${classSuccessUsername}`}>
				{inputErrorUsername}
			</span>
			<input
				type="text"
				id="edit-profile__about"
				name="editProfileAbout"
				className="form__input modal__input edit-profile__input edit-profile__about"
				required
				minLength="2"
				maxLength="30"
				value={description || ""}
				onChange={handleChangeDescription}
			/>
			<span className={`edit-profile__about-error form__input-error ${classSuccessDescription}`}>
				{inputErrorDescription}
			</span>

		</PopupWithForm>
	);
}