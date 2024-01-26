import React, { useRef, useContext } from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { errEditAvatar } from '../utils/variables.js'

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
	const { currentUser } = useContext(CurrentUserContext);
	const avatar = useRef(currentUser.avatar);
	const errorAvatarEmptyInput = document.querySelector('.edit-avatar__link-error');

	function handleSubmit(e) {
		e.preventDefault();
		onUpdateAvatar(avatar.current);
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
				onChange={(e) => {
					avatar.current = e.target.value;
					if (e.target.value === '' || e.target.value === ' ') {
						errorAvatarEmptyInput.classList.add("form__input-error_active")
						errorAvatarEmptyInput.textContent = errEditAvatar;
					} else {
						errorAvatarEmptyInput.classList.remove("form__input-error_active")
					}

				}}
			/>
			<span className="edit-avatar__link-error form__input-error"></span>
		</PopupWithForm>
	);
}