import axios from 'axios'
import { getToken } from '../lib/token'

export const apiInstance = axios.create({
	baseURL: import.meta.env.VITE_REACT_APP_API_DOMAIN,
	headers: {
		'Content-Type': 'application/json',
	},
})


apiInstance.interceptors.request.use(
	async config => {
		const token = getToken()
		console.log(token)
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)