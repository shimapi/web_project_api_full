import React, { useRef, useContext } from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
	const currentUser = useContext(CurrentUserContext);
	const avatar = useRef(currentUser.avatar);

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
				}}
			/>
			<span className="edit-avatar__link-error form__input-error"></span>
		</PopupWithForm>
	);
}
