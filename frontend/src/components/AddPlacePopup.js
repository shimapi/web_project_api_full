import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm.js";
import InfoTooltip from "./InfoTooltip.js";
import { errLogin } from "../utils/variables.js";


export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
	const [placeName, setPlaceName] = useState("");
	const [placeLink, setPlaceLink] = useState("");
	const [error, setError] = React.useState(false);
	const [openInfoTool, setOpenInfoTool] = React.useState(false);
	const [errorMessage, setErrorMessage] = React.useState('errorciiito');

	const methods = {
		setPlaceName,
		setPlaceLink,
	}

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

	function onInputChange(e) {
		const dataMethod = e.target.dataset.method;
		const value = e.target.value;

		//asigno el valor al input correspondiente
		methods[dataMethod](value); //setPlaceName(e.target.value);

		if (!e.target.validity.valid) {
			setOpenInfoTool(true)
			return setError(true)
		}
		setError(false)
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
					data-method='setPlaceName'
					className="form__input modal__input add-place__name"
					placeholder="Título de la imagen"
					minLength="2"
					maxLength="30"
					required
					onChange={onInputChange}
				/>
				<span className="add-place__name-error form__input-error"></span>
				<input
					type="URL"
					id="add-place__link"
					name="addPlaceLink"
					data-method='setPlaceLink'
					className="form__input modal__input add-place__link"
					placeholder="URL de la imagen"
					required
					onChange={onInputChange}
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
