import React, { useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import InfoTooltip from "./InfoTooltip.js";
import { errEditAvatar } from "../utils/variables.js";


export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
	const currentUser = useContext(CurrentUserContext);
	const [avatar, setAvatar] = React.useState('')

	const [error, setError] = React.useState(false);
	const [openInfoTool, setOpenInfoTool] = React.useState(false);
	const [errorMessage, setErrorMessage] = React.useState('');

	const methods = {
		setAvatar,
	}
	const errorMessages = {
		editAvatarLink: errEditAvatar,
	}

	useEffect(() => {
		setAvatar(currentUser.avatar);
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
			onUpdateAvatar({ avatar });
			console.log({ avatar })
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
					data-method='setAvatar'
					className="form__input modal__input edit-avatar__link"
					placeholder="URL de la imagen"
					required
					onChange={onInputChange}
				/>
				<span className="edit-avatar__link-error form__input-error"></span>
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
