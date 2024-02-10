import { MAIN_URL } from './variables.js';
export class Api {
	constructor() {
		this.originURL = MAIN_URL;
	}

	async _useFetch(token, url, method, body) {
		try {
			const res = await fetch(url, {
				headers: {
					authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				method,
				body: JSON.stringify(body),
			});

			if (res.ok) {
				return res.json();
			}
			return Promise.reject(`Error: ${res.status}`);
		} catch (error) {
			return error;
		}
	}

	async getProfileInitialInfo(token) {
		try {
			const profileInitialInfo = await this._useFetch(
				token,
				`${this.originURL}/users/me`,
				"GET"
			);
			return profileInitialInfo;
		} catch (error) {
			return error;
		}
	}

	async getCards(token) {
		try {
			const cards = await this._useFetch(token, `${this.originURL}/cards`, "GET");
			return cards;
		} catch (error) {
			return error;
		}
	}

	async editProfileInfo(token, name, about) {
		try {
			const profileInfo = await this._useFetch(
				token,
				`${this.originURL}/users/me`,
				"PATCH",
				{ name, about }
			);
			return profileInfo;
		} catch (error) {
			return error;
		}
	}

	async editProfileAvatar(token, avatar) {
		try {
			const profileAvatar = await this._useFetch(
				token,
				`${this.originURL}/users/me/avatar`,
				"PATCH",
				{ avatar }
			);
			return profileAvatar;
		} catch (error) {
			return error;
		}
	}

	async addNewCard(token, name, link) {
		try {
			const newCard = await this._useFetch(token, `${this.originURL}/cards`, "POST", {
				name,
				link,
			});
			return newCard;
		}
		catch (error) {
			return error;
		}
	}

	async deleteCard(token, cardId) {
		try {
			const deletedCard = await this._useFetch(
				token,
				`${this.originURL}/cards/${cardId}`,
				"DELETE"
			);
			return deletedCard;
		} catch (error) {
			return error;
		}
	}

	async likeCard(token, cardId) {
		try {
			const likesCard = await this._useFetch(
				token,
				`${this.originURL}/cards/likes/${cardId}`,
				"PUT"
			);
			return likesCard;
		} catch (error) {
			return error;
		}
	}

	async dislikeCard(token, cardId) {
		try {
			const dislikesCard = await this._useFetch(
				token,
				`${this.originURL}/cards/likes/${cardId}`,
				"DELETE"
			);
			return dislikesCard;
		} catch (error) {
			return error;
		}
	}

	async changeLikeCardStatus(token, cardId, isLiked) {
		try {
			const changingLikeCardStatus = isLiked
				? await this.dislikeCard(token, cardId)
				: await this.likeCard(token, cardId);
			return changingLikeCardStatus;
		} catch (error) {
			return error;
		}
	}

	async registerUser(email, password) {
		try {
			const newUser = await this._useFetch(
				`${this.originURL}/signup`,
				"POST",
				{
					email,
					password,
				}
			);
			return newUser;
		} catch (error) {
			return error;
		}
	}

	async checkUserToken(token) {
		try {
			return fetch(`${this.originURL}/users/me`, {
				method: "GET",
				headers: {
					authorization: `Bearer ${token}`,
				},
			});
		} catch (error) {
			return error;
		}
	}
}

const api = new Api();

export default api;
