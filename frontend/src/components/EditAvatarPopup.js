import React, { useRef, useContext, useState } from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { errURL, inputOK, classSuccessStyle } from '../utils/variables.js'
import { isValidImageURL } from '../utils/helpers.js'

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
	const { currentUser } = useContext(CurrentUserContext);
	const avatar = useRef(currentUser.avatar);

	const [inputError, setInputError] = useState('');
	const [classSuccess, setClassSuccess] = useState('');

	function handleSubmit(e) {
		e.preventDefault();
		onUpdateAvatar(avatar.current);
	}

	function handleImageURL(e) {
		avatar.current = e.target.value.trim();

		if ((avatar.current === '') || (!isValidImageURL(avatar.current))) {
			setInputError(errURL);
			setClassSuccess('')
		} else {
			setInputError(inputOK);
			setClassSuccess(classSuccessStyle);
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
				onChange={handleImageURL}
			/>
			<span className={`edit-avatar__link-error form__input-error ${classSuccess}`}>
				{inputError}
			</span>
		</PopupWithForm >
	);
}