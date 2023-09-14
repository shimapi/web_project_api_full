import { useState, useEffect } from "react";

const authorization = "e693c678-e26f-42f9-a95c-4c1ab4d74246";
export const originURL = "https://around.nomoreparties.co/v1/web_es_cohort_03";

// custom hook es funcion js
export const useApi = (url, method, body = null) => {
	// data, error, loading

	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);

			try {
				const res = await fetch(url, {
					headers: {
						authorization,
						"Content-Type": "application/json",
					},
					method,
					body: body && JSON.stringify(body),
				});

				if (res.ok) {
					const json = await res.json();
					setData(json);
				} else {
					throw new Error(`Error: ${res.status}`);
				}
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [url, method, body]);

	return [data, error, loading];
};
