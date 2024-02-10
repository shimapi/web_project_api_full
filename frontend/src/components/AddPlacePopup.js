import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm.js";
import { errAddPlaceName, errURL, classSuccessStyle, inputOK, } from '../utils/variables.js';
import { isValidImageURL } from '../utils/helpers.js';

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
	const [placeName, setPlaceName] = useState("");
	const [placeLink, setPlaceLink] = useState("");
	const [inputErrorName, setInputErrorName] = useState('');
	const [inputErrorLink, setInputErrorLink] = useState('');
	const [classSuccessName, setClassSuccessName] = useState('');
	const [classSuccessLink, setClassSuccessLink] = useState('');

	function handleSubmit(e) {
		e.preventDefault();
		onAddPlace(placeName, placeLink);
	}
	function handleName(e) {
		if (e.target.value.length < 2) {
			setInputErrorName(errAddPlaceName);
			setClassSuccessName('');
		} else {
			setInputErrorName(inputOK);
			setClassSuccessName(classSuccessStyle);
		}
		setPlaceName(e.target.value);
	}
	function handleLink(e) {
		if ((e.target.value.length < 2) || (!isValidImageURL(e.target.value))) {
			setInputErrorLink(errURL);
			setClassSuccessLink('');
		} else {
			setInputErrorLink(inputOK);
			setClassSuccessLink(classSuccessStyle);
		}
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
				onChange={handleName}
			/>
			<span className={`add-place__name-error form__input-error ${classSuccessName} `}>
				{inputErrorName}
			</span>
			<input
				type="URL"
				id="add-place__link"
				name="addPlaceLink"
				className="form__input modal__input add-place__link"
				placeholder="URL de la imagen"
				required
				onChange={handleLink}
			/>
			<span className={`add-place__link-error form__input-error ${classSuccessLink}`}>
				{inputErrorLink}
			</span>
		</PopupWithForm>
	);
}