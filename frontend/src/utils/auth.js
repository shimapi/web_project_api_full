/* Toda la funcionalidad de tu aplicación estará disponible únicamente para usuarios autorizados a través de la ruta raíz /. Vamos a implementar dos nuevas rutas para usuarios no autorizados en un archivo aparte auth.js:
/signup — para el registro de usuarios
/signin — para a autorización de usuarios
Si un usuario no autorizado visita la aplicación, debería ser redirigido a la página de inicio de sesión, independientemente de la ruta desde la que accedió. */

import api from "./api";
import { MAIN_URL } from './variables.js';

export const registerUser = async (email, password) => {

	const res = await fetch(`${MAIN_URL}/signup`, {
		headers: {
			"Content-Type": "application/json",
		},
		method: 'POST',
		body: JSON.stringify({ email, password }),
	});

	if (res.ok) {
		const response = await res.json();
		if (response.token) {
			localStorage.setItem("userToken", response.token);
			return response.token;
		}
	}
	return Promise.reject(`Error: ${res.status}`);
};

export const authorizeUser = async (email, password) => {
	try {
		const res = await fetch(`${MAIN_URL}/signin`, {
			headers: {
				"Content-Type": "application/json",
			},
			method: 'POST',
			body: JSON.stringify({ email, password }),
		});
		// 🟣🟣🟣🟣🟣 aquí se está generando el token sin siquiera validar al usuario
		console.log('res', res)
		if (!res.ok) {
			throw new Error(`Error: ${res.status}`)
		}
		console.log('👀 JSON.stringify({ email, password}', JSON.stringify({ email, password }))
		console.log('test 1')
		const response = await res.json();
		console.log("response", response)
		//if (response.token) {
		console.log('test 2')
		localStorage.setItem("userToken", response.token);
		return response.token;
		//}
	}
	catch (error) {
		console.log('test3 error en front auth', error.message)
		return Promise.reject(`Error: ${error.message}`);
	}

};

export const authToken = async (token) => {
	return await api.checkUserToken(token);
};
