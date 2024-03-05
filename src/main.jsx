import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import Authorization from './pages/Authorization/Authorization'
import Dashboard from './pages/Dashboard/Dashboard'
import ErrorPage from './pages/NotFound/NotFound'
import Registration from './pages/Registration/Registration'
import store from './redux/store'
const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
	},
	{
		path: '/registration',
		element: <Registration />,
		errorElement: <ErrorPage />,
	},
	{
		path: '/authorization',
		element: <Authorization />,
		errorElement: <ErrorPage />,
	},
	{
		path: '/dashboard',
		element: <Dashboard />,
		errorElement: <ErrorPage />,
	},
])
ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
)
