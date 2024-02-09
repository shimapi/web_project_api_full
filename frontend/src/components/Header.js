import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../images/logo.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Header = () => {
	const { setCurrentUser } = useContext(CurrentUserContext);
	const [userEmail, setUserEmail] = useState("");
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const storedUserEmail = localStorage.getItem("userEmail");
		if (storedUserEmail) {
			setUserEmail(storedUserEmail);
		}
	});

	function logout() {
		localStorage.removeItem("userToken");
		localStorage.removeItem("userEmail");
		setUserEmail("");
		navigate("/signin");
		setCurrentUser({});
	}
	return (
		<header className="header">
			<div className="header__logo">
				<Link to="/signin">
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
						<Link to="/signin" onClick={logout}>
							Cerrar sesión
						</Link>
					</>
				)}
			</div>
		</header>
	);
};

export default Header;
