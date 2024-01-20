import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm.js";
import InfoTooltip from "./InfoTooltip.js";
import { errLogin } from "../utils/variables.js";


export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
	const [placeName, setPlaceName] = useState("");
	const [placeLink, setPlaceLink] = useState("");
	const [error, setError] = React.useState(false);
	const [openInfoTool, setOpenInfoTool] = React.useState(false);
	const [errorMessage, setErrorMessage] = React.useState('errorciiito')

	function handleSubmit(e) {
		e.preventDefault();
		try {
			onAddPlace(placeName, placeLink);
		} catch (error) {
			console.log("Error en inicio de sesión", error);
			setErrorMessage(errLogin)
			setError(true);
			setOpenInfoTool(true);
		}
	}

	function onNameChange(e) {
		setPlaceName(e.target.value);
	}

	function onLinkChange(e) {
		setPlaceLink(e.target.value);
	}
	function handleClose() {
		setError(false);
		setOpenInfoTool(false);
	}

	return (
		<>
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
			<InfoTooltip
				error={error}
				openInfoTool={openInfoTool}
				handleClose={handleClose}
				errorMessage={errorMessage}
			/>
		</>
	);
}
