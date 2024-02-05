import { useState, useEffect } from "react";

export const useApi = (url, method, body = null) => {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);

			try {
				const res = await fetch(url, {
					headers: {
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
