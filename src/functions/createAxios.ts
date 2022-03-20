import axios from 'axios';
import camelCase from 'lodash.camelcase';

export default function createAxios(token?: string) {
	const client = axios.create({
		baseURL: 'https://osu.ppy.sh/api/v2/',
	});

	client.interceptors.response.use((response) => {
		if (
			typeof response.data === 'object' &&
			!Array.isArray(response.data)
		) {
			response.data = camelCaseObject(response.data);
		} else {
			response.data = response.data.map((v) => camelCaseObject(v));
		}

		return response;
	});

	if (token) {
		client.defaults.headers['Authorization'] = `Bearer ${token}`;
	}

	return client;
}

const camelCaseObject = (object: object | object[]) => {
	let newObject = {};

	for (const key in object) {
		const newKey = camelCase(key);

		if (typeof object[key] === 'object' && !Array.isArray(object[key])) {
			newObject[newKey] = camelCaseObject(object[key]);
		} else if (Array.isArray(object[key])) {
			newObject[newKey] = [];

			object[key].forEach((value) => {
				if (typeof value === 'object') value = camelCaseObject(value);
				newObject[newKey].push(value);
			});
		} else {
			newObject[newKey] = object[key];
		}
	}

	return newObject;
};
