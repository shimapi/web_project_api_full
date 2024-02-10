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

	function isValidImageURL(value) {
		const imageRegex = /\.(jpeg|jpg|gif|png|svg)(\?.*)?$/i;
		return imageRegex.test(value);
	}

	function handleImageURL(e) {
		avatar.current = e.target.value.trim();

		if ((avatar.current === '') || (!isValidImageURL(avatar.current))) {
			setInputError(errURL);
			setClassSuccess('')
		} else {
			setInputError(okURL);
			setClassSuccess('form__input-success');
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