import React from "react";
import { Link } from "react-router-dom";
import InfoTooltip from "./InfoTooltip";
import useEscKey from "../custom-hooks/useEscKey";

export default function Register({ handleUserRegister }) {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [error, setError] = React.useState('');
	const [openInfoTool, setOpenInfoTool] = React.useState(false);

	useEscKey(handleClose);

	function handleChangeEmail(e) {
		setEmail(e.target.value);
	}
	function handleChangePassword(e) {
		setPassword(e.target.value);
	}
	async function handleSubmit(e) {
		e.preventDefault();
		try {
			await handleUserRegister(email, password);
			setOpenInfoTool(true);
		} catch (error) {
			setError(error.message);
			setOpenInfoTool(true);
		}
	}
	function handleClose() {
		setError('');
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
					onChange={handleChangePassword}
					required
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