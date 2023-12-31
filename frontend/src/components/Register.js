//Login — el componente para la autorización de usuarios con las variables de estado necesarias.

import React from "react";
import { Link } from "react-router-dom";
import InfoTooltip from "./InfoTooltip";

export default function Register({ handleUserRegister }) {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [error, setError] = React.useState(false);
	const [openInfoTool, setOpenInfoTool] = React.useState(false);

	function handleChangeEmail(e) {
		setEmail(e.target.value);
	}
	function handleChangePassword(e) {
		setPassword(e.target.value);
	}
	async function handleSubmit(e) {
		try {
			e.preventDefault();
			await handleUserRegister(email, password);
			setOpenInfoTool(true);
		} catch (err) {
			setError(true);
			setOpenInfoTool(true);
			console.log(err);
		}
	}
	function handleClose() {
		setError(false);
		setOpenInfoTool(false);
	}
	return (
		<section className="access">
			<form
				className="access__form"
				action="#"
				onSubmit={handleSubmit}
				noValidate
			>
				<h2>Regístrate</h2>

				<input
					type="email"
					id="register__email"
					name="registerEmail"
					className="access__input form__input"
					placeholder="Correo electrónico"
					required
					onChange={handleChangeEmail}
				/>
				<span className="add-place__name-error form__input-error"></span>
				<input
					type="password"
					id="register__password"
					name="registerPassword"
					className="access__input form__input"
					placeholder="Contraseña"
					required
					onChange={handleChangePassword}
				/>
				<span className="add-place__link-error form__input-error"></span>
				<button type="submit" className="button button-access">
					Regístrate
				</button>
				<p className="access__subline">
					¿Ya eres miembro? <Link to="/signin">Inicia sesión aquí</Link>
				</p>
			</form>
			<InfoTooltip
				error={error}
				openInfoTool={openInfoTool}
				handleClose={handleClose}
			/>
		</section>
	);
}
