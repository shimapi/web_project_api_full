//ProtectedRoute — utiliza este componente para proteger la ruta / de tal modo que los usuarios no autorizados no puedan acceder a ella.

import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ element, loggedIn }) {
	return loggedIn ? <Outlet /> : <Navigate to="/signin" />;
}
