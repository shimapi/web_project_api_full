import React, { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import InfoTooltip from "./InfoTooltip.js";
import { errEditName, errEditOcupation } from "../utils/variables.js";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
	const currentUser = useContext(CurrentUserContext);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [error, setError] = React.useState(false);
	const [openInfoTool, setOpenInfoTool] = React.useState(false);
	const [errorMessage, setErrorMessage] = React.useState('');

	const methods = {
		setName,
		setDescription,
	}
	const errorMessages = {
		editProfileName: errEditName,
		editProfileAbout: errEditOcupation,
	}

	useEffect(() => {
		setName(currentUser.name);
		setDescription(currentUser.about);
	}, [currentUser]);


	function onInputChange(e) {
		const fieldName = e.target.name;
		const dataMethod = e.target.dataset.method;
		const value = e.target.value;

		//asigno el valor al input correspondiente
		methods[dataMethod](value); //setPlaceName(e.target.value);

		if (!e.target.validity.valid) {
			setOpenInfoTool(true)
			setErrorMessage(errorMessages[fieldName] || 'Error');
			return setError(true)
		}
		setError(false);
		setErrorMessage('');;
	}

	function handleSubmit(e) {
		e.preventDefault();
		try {
			onUpdateUser({
				name,
				about: description,
			});
		} catch (error) {
			setErrorMessage(error)
			setError(true);
			setOpenInfoTool(true);
		}
	}
	function handleClose() {
		setError(false);
		setOpenInfoTool(false);
	}

	return (
		<>
			<PopupWithForm
				title="Editar Perfil"
				submitText="Guardar"
				isOpen={isOpen}
				onClose={onClose}
				onSubmit={handleSubmit}
			>
				<input
					type="text"
					id="edit-profile__name"
					name="editProfileName"
					data-method='setName'
					className="form__input modal__input edit-profile__input edit-profile__name"
					required
					minLength="2"
					maxLength="40"
					value={name || ""}
					onChange={onInputChange}
				/>
				<span className="edit-profile__name-error form__input-error"></span>
				<input
					type="text"
					id="edit-profile__about"
					name="editProfileAbout"
					data-method='setDescription'
					className="form__input modal__input edit-profile__input edit-profile__about"
					required
					minLength="2"
					maxLength="200"
					value={description || ""}
					onChange={onInputChange}
				/>
				<span className="edit-profile__about-error form__input-error"></span>
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
