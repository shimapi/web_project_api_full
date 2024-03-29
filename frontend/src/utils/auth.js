import api from "./api";
import { MAIN_URL } from './variables.js';

export const registerUser = async (email, password) => {
	try {
		const res = await fetch(`${MAIN_URL}/signup`, {
			headers: {
				"Content-Type": "application/json",
			},
			method: 'POST',
			body: JSON.stringify({ email, password }),
		});

		const response = await res.json();
		if (!res.ok) {
			throw new Error(response.message);
		}
		return response;
	} catch (error) {
		throw new Error(error.message);
	};
}

export const authorizeUser = async (email, password) => {
	try {
		const res = await fetch(`${MAIN_URL}/signin`, {
			headers: {
				"Content-Type": "application/json",
			},
			method: 'POST',
			body: JSON.stringify({ email, password }),
		});
		const response = await res.json();

		if (!res.ok) {
			throw new Error(`Error: ${response.message}`)
		}
		localStorage.setItem("userToken", response.token);
		return response.token;
	}
	catch (error) {
		return Promise.reject(error.message);
	}
};

export const authToken = async (token) => {
	return await api.checkUserToken(token);
};
