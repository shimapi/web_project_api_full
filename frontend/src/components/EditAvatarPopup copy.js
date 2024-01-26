import React, { useRef, useContext } from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { errURL, okURL } from '../utils/variables.js'

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
	const { currentUser } = useContext(CurrentUserContext);
	const avatar = useRef(currentUser.avatar);
	const errorAvatarEmptyInput = document.querySelector('.edit-avatar__link-error');

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
		errorAvatarEmptyInput.classList.add("form__input-error_active");
		errorAvatarEmptyInput.classList.remove("form__input-success");

		if ((e.target.value.trim() === '') || (!isValidURL(e.target.value))) {
			errorAvatarEmptyInput.textContent = errURL;
		} else {
			errorAvatarEmptyInput.classList.add("form__input-success");
			errorAvatarEmptyInput.textContent = okURL;
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
			<span className="edit-avatar__link-error form__input-error">

			</span>
		</PopupWithForm>
	);
}