import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../images/logo.svg";

const Header = () => {
	const [userEmail, setUserEmail] = useState("");
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const storedUserEmail = localStorage.getItem("userEmail");
		if (storedUserEmail) {
			setUserEmail(storedUserEmail);
		}
	});

	function closeSession() {
		localStorage.removeItem("userToken");
		localStorage.removeItem("userEmail");
		setUserEmail("");
		navigate("/");
	}
	return (
		<header className="header">
			<div className="header__logo">
				<Link to="/">
					<img src={logo} alt="Around the US Logo" />
				</Link>
			</div>
			<div className="header__access">
				{!userEmail ? (
					location.pathname === "/signup" ? (
						<Link to="/signin">Iniciar sesión</Link>
					) : (
						<Link to="/signup">Regístrate</Link>
					)
				) : (
					<>
						{userEmail} &nbsp;/&nbsp;
						<Link to="/signin" onClick={closeSession}>
							Cerrar sesión
						</Link>
					</>
				)}
			</div>
		</header>
	);
};

export default Header;
