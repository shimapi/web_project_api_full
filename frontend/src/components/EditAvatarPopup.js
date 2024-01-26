import React, { useRef, useContext, useState } from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { errURL, okURL } from '../utils/variables.js'

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
	const { currentUser } = useContext(CurrentUserContext);
	const avatar = useRef(currentUser.avatar);

	const [inputError, setInputError] = useState('');
	const [classSuccess, setClassSuccess] = useState('');

	function handleSubmit(e) {
		e.preventDefault();
		onUpdateAvatar(avatar.current);
	}

	function isValidURL(value) {
		const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
		return urlRegex.test(value);
	}

	function handleURL(e) {
		avatar.current = e.target.value;

		if ((e.target.value.trim() === '') || (!isValidURL(e.target.value))) {
			setInputError(errURL);
			setClassSuccess('')
		} else {
			setInputError(okURL);
			setClassSuccess('form__input-success')
		}
	}
	return (
		<PopupWithForm
			title="Editar Avatar"
			submitText="Guardar"
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
		>
			<input
				type="URL"
				id="edit-avatar__link"
				name="editAvatarLink"
				className="form__input modal__input edit-avatar__link"
				placeholder="URL de la imagen"
				required
				onChange={handleURL}
			/>
			<span className={`edit-avatar__link-error form__input-error ${classSuccess}`}>
				{inputError}
			</span>
		</PopupWithForm >
	);
}