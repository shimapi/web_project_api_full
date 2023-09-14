/* Toda la funcionalidad de tu aplicación estará disponible únicamente para usuarios autorizados a través de la ruta raíz /. Vamos a implementar dos nuevas rutas para usuarios no autorizados en un archivo aparte auth.js:
/signup — para el registro de usuarios
/signin — para a autorización de usuarios
Si un usuario no autorizado visita la aplicación, debería ser redirigido a la página de inicio de sesión, independientemente de la ruta desde la que accedió. */

import api from "./api";

export const registerUser = async (email, password) => {
	return await api.registerUser(email, password);
};

export const authorizeUser = async (email, password) => {
	const response = await api.authorizeUser(email, password);
	if (response.token) {
		localStorage.setItem("userToken", response.token);
		return response.token;
	}
};

export const authToken = async (token) => {
	return await api.checkUserToken(token);
};
