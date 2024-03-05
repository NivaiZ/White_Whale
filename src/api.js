import axios from 'axios'

const api = axios.create({
	baseURL: import.meta.env.VITE_REACT_APP_API_DOMAIN,
	headers: {
		'Content-Type': 'application/json',
	},
})

// Добавим функцию для извлечения токена из localStorage
const getToken = () => {
	return localStorage.getItem('token')
}

api.interceptors.request.use(
	async config => {
		// Извлекаем токен перед каждым запросом
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

// Добавим функцию для сохранения токена в localStorage
const saveToken = token => {
	localStorage.setItem('token', token)
}

const removeToken = () => {
	localStorage.removeItem('token')
}

export { getToken, removeToken, saveToken }
export default api
