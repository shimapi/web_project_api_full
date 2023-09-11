export class Api {
	constructor() {
		this.authorization = "e693c678-e26f-42f9-a95c-4c1ab4d74246";
		this.originURL = "https://around.nomoreparties.co/v1/web_es_cohort_03";
	}

	async _useFetch(url, method, body) {
		const res = await fetch(url, {
			headers: {
				authorization: this.authorization,
				"Content-Type": "application/json",
			},
			method,
			body: JSON.stringify(body),
		});

		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Error: ${res.status}`);
	}

	async getProfileInitialInfo() {
		const profileInitialInfo = await this._useFetch(
			`${this.originURL}/users/me`,
			"GET"
		);
		return profileInitialInfo;
	}

	async getCards() {
		const cards = await this._useFetch(`${this.originURL}/cards`, "GET");
		return cards;
	}

	async editProfileInfo(name, about) {
		const profileInfo = await this._useFetch(
			`${this.originURL}/users/me`,
			"PATCH",
			{ name, about }
		);
		return profileInfo;
	}

	async editProfileAvatar(avatar) {
		const profileAvatar = await this._useFetch(
			`${this.originURL}/users/me/avatar`,
			"PATCH",
			{ avatar }
		);
		return profileAvatar;
	}

	async addNewCard(name, link) {
		const newCard = await this._useFetch(`${this.originURL}/cards`, "POST", {
			name,
			link,
		});
		return newCard;
	}

	async deleteCard(cardId) {
		const deletedCard = await this._useFetch(
			`${this.originURL}/cards/${cardId}`,
			"DELETE"
		);
		return deletedCard;
	}

	async likeCard(cardId) {
		const likesCard = await this._useFetch(
			`${this.originURL}/cards/likes/${cardId}`,
			"PUT"
		);
		return likesCard;
	}

	async dislikeCard(cardId) {
		const dislikesCard = await this._useFetch(
			`${this.originURL}/cards/likes/${cardId}`,
			"DELETE"
		);
		return dislikesCard;
	}

	async changeLikeCardStatus(cardId, isLiked) {
		const changingLikeCardStatus = isLiked
			? await this.dislikeCard(cardId)
			: await this.likeCard(cardId);
		return changingLikeCardStatus;
	}

	async registerUser(email, password) {
		const newUser = await this._useFetch(
			`https://register.nomoreparties.co/signup`,
			"POST",
			{
				email,
				password,
			}
		);
		return newUser;
	}

	async authorizeUser(email, password) {
		const authUser = await this._useFetch(
			`https://register.nomoreparties.co/signin`,
			"POST",
			{
				email,
				password,
			}
		);
		return authUser;
	}

	async checkUserToken(token) {
		return fetch("https://register.nomoreparties.co/users/me", {
			method: "GET",
			headers: {
				authorization: `Bearer ${token}`,
			},
		});
	}
}

const api = new Api();

export default api;
