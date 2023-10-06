import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm.js";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
	const [placeName, setPlaceName] = useState("");
	const [placeLink, setPlaceLink] = useState("");
	function handleSubmit(e) {
		e.preventDefault();
		onAddPlace(placeName, placeLink);
	}
	function onNameChange(e) {
		setPlaceName(e.target.value);
	}
	function onLinkChange(e) {
		setPlaceLink(e.target.value);
	}
	return (
		<PopupWithForm
			title="Añadir Lugar"
			submitText="Crear"
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
		>
			<input
				type="text"
				id="add-place__name"
				name="addPlaceName"
				className="form__input modal__input add-place__name"
				placeholder="Título de la imagen"
				minLength="2"
				maxLength="30"
				required
				onChange={onNameChange}
			/>
			<span className="add-place__name-error form__input-error"></span>
			<input
				type="URL"
				id="add-place__link"
				name="addPlaceLink"
				className="form__input modal__input add-place__link"
				placeholder="URL de la imagen"
				required
				onChange={onLinkChange}
			/>
			<span className="add-place__link-error form__input-error"></span>
		</PopupWithForm>
	);
}
