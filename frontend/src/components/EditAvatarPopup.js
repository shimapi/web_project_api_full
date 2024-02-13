import React, { useContext, useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { errURL, inputOK, classSuccessStyle } from '../utils/variables.js'
import { isValidImageURL } from '../utils/helpers.js'

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
	const { currentUser } = useContext(CurrentUserContext);
	const [avatarURL, setAvatarURL] = useState(currentUser.avatar || '');
	const [inputError, setInputError] = useState('');
	const [classSuccess, setClassSuccess] = useState('');

	useEffect(() => {
		setAvatarURL('');
		setInputError('');
		setClassSuccess('');
	}, [onClose])

	function handleSubmit(e) {
		e.preventDefault();
		onUpdateAvatar(avatarURL);
		setAvatarURL(avatarURL);
	}

	function handleImageURL(e) {
		const url = e.target.value.trim();

		if ((url === '') || (!isValidImageURL(url))) {
			setInputError(errURL);
			setClassSuccess('')
		} else {
			setAvatarURL(url);
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
				value={avatarURL}
				onChange={handleImageURL}
			/>
			<span className={`edit-avatar__link-error form__input-error ${classSuccess}`}>
				{inputError}
			</span>
		</PopupWithForm >
	);
}