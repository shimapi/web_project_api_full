/* Toda la funcionalidad de tu aplicación estará disponible únicamente para usuarios autorizados a través de la ruta raíz /. Vamos a implementar dos nuevas rutas para usuarios no autorizados en un archivo aparte auth.js:
/signup — para el registro de usuarios
/signin — para a autorización de usuarios
Si un usuario no autorizado visita la aplicación, debería ser redirigido a la página de inicio de sesión, independientemente de la ruta desde la que accedió. */

import api from "./api";

export const registerUser = async (email, password) => {
	//return await api.registerUser(email, password);

	// fetch(localhost) mail pass POST header application JSON
	const res = await fetch('https://api.shirleymallea.com/signup', {
		headers: {
			"Content-Type": "application/json",
		},
		method: 'POST',
		body: JSON.stringify({ email, password }),
	});

	if (res.ok) { // Replicar en register
		return await res.json();
	}
	return Promise.reject(`Error: ${res.status}`);

};




export const authorizeUser = async (email, password) => {
	// fetch(localhost) mail pass POST header application JSON
	const res = await fetch('https://api.shirleymallea.com/signin', {
		headers: {
			"Content-Type": "application/json",
		},
		method: 'POST',
		body: JSON.stringify({ email, password }),
	});

	if (res.ok) { // Replicar en register
		const response = await res.json();
		if (response.token) {
			localStorage.setItem("userToken", response.token);
			return response.token;
		}
	}
	return Promise.reject(`Error: ${res.status}`);

};

export const authToken = async (token) => {
	return await api.checkUserToken(token);
};
