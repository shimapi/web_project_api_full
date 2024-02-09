import React from "react";
import { Link, useNavigate } from "react-router-dom";
import InfoTooltip from "./InfoTooltip";
import useEscapeKey from "../custom-hooks/useEscKey";

export default function Login({ handleUserLogin, handleChangeLoginState }) {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [error, setError] = React.useState("");
	const [openInfoTool, setOpenInfoTool] = React.useState(false);
	const navigate = useNavigate();

	useEscapeKey(handleClose);

	function handleChangeEmail(e) {
		setEmail(e.target.value);
	}
	function handleChangePassword(e) {
		setPassword(e.target.value);
	}
	async function handleLogin(e) {
		e.preventDefault();
		try {
			await handleUserLogin(email, password);
			await handleChangeLoginState();
			setOpenInfoTool(true);
			navigate("/");
		} catch (error) {
			setError(error.message);
			setOpenInfoTool(true);
		}
	}
	function handleClose() {
		setError("");
		setOpenInfoTool(false);
	}

	return (
		<section className="access">
			<form
				className="access__form"
				action="#"
				noValidate
				onSubmit={handleLogin}
			>
				<h2>Inicia sesión</h2>

				<input
					type="email"
					id="login__email"
					name="loginEmail"
					className="access__input form__input"
					placeholder="Correo electrónico"
					onChange={handleChangeEmail}
					required
				/>
				<span className="add-place__name-error form__input-error"></span>
				<input
					type="password"
					id="login__password"
					name="loginPassword"
					className="access__input form__input"
					placeholder="Contraseña"
					onChange={handleChangePassword}
					required
				/>
				<span className="add-place__link-error form__input-error"></span>
				<button type="submit" className="button button-access">
					Inicia sesión
				</button>
				<p className="access__subline">
					¿Aún no eres miembro? <Link to="/signup">Regístrate aquí</Link>
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