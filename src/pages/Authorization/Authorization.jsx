import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {api} from '../../api'
import Header from '../../components/Header/Header'
import styles from './authorization.module.css'
import { saveToken } from '../../lib/token'
/**
 * Компонент для отображения формы регистрации.
 * @returns {JSX.Element} Элемент JSX для рендера компонента.
 */
export default function Authorization() {
	const [emailInputValue, setEmailInputValue] = useState('')
	const [passwordInputValue, setPasswordInputValue] = useState('')

	const [emailInputClicked, setEmailInputClicked] = useState(false)
	const [passwordInputClicked, setPasswordInputClicked] = useState(false)

	const [emailError, setEmailError] = useState('')
	const [passwordError, setPasswordError] = useState('')

	const [isFormValid, setIsFormValid] = useState(false)

	const [isLoading, setIsLoading] = useState(false)
	const [loginError, setLoginError] = useState('')
	const navigate = useNavigate()

	/**
	 * Обработчик изменения значения в поле ввода email.
	 * @param {React.ChangeEvent<HTMLInputElement>} e - Объект события изменения.
	 */
	const handleEmailInputChange = e => {
		setEmailInputValue(e.target.value)
		setEmailError('')
		checkFormValidity()
	}

	/**
	 * Обработчик клика на поле ввода email.
	 */
	const handleEmailInputClick = () => {
		setEmailInputClicked(true)
		setPasswordInputClicked(false)
	}

	/**
	 * Обработчик изменения значения в поле ввода пароля.
	 * @param {React.ChangeEvent<HTMLInputElement>} e - Объект события изменения.
	 */
	const handlePasswordInputChange = e => {
		setPasswordInputValue(e.target.value)
		setPasswordError('')
		checkFormValidity()
	}

	/**
	 * Обработчик клика на поле ввода пароля.
	 */
	const handlePasswordInputClick = () => {
		setPasswordInputClicked(true)
		setEmailInputClicked(false)
	}

	/**
	 * Обработчик клика вне полей ввода для сброса состояния клика.
	 * @param {MouseEvent} e - Объект события клика.
	 */
	const handleDocumentClick = e => {
		if (!e.target.closest(`.${styles.login__input}`)) {
			setEmailInputClicked(false)
			setPasswordInputClicked(false)
		}
	}

	/**
	 * Проверяет валидность формы и устанавливает соответствующее состояние.
	 */
	const checkFormValidity = () => {
		setIsFormValid(
			emailInputValue.trim() !== '' && passwordInputValue.trim() !== ''
		)
	}

	/**
	 * Обработчик отправки формы.
	 * @param {React.FormEvent<HTMLFormElement>} e - Объект события отправки формы.
	 */
	const handleSubmit = async e => {
		e.preventDefault()
		setIsLoading(true)

		try {
			const response = await api.post(
				'https://615aa29e26d29508.mokky.dev/auth',
				{
					email: emailInputValue,
					password: passwordInputValue,
				}
			)

			// Получение токена из ответа
			const { token } = response.data
			if (token) {
				saveToken(token)
			}

			// Переход на страницу Dashboard (или другую страницу)
			navigate('/dashboard')
		} catch (error) {
			// Обработка ошибки
			setLoginError('Неверные почта или пароль')
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		document.addEventListener('click', handleDocumentClick)

		return () => {
			document.removeEventListener('click', handleDocumentClick)
		}
	}, [])

	return (
		<>
			<Header />
			<section className={styles.login__section}>
				<div className={styles.login__wrapper}>
					<div className={styles.login__block}>
						<form onSubmit={handleSubmit}>
							<fieldset className={styles.login__fieldset}>
								<legend className={styles.login__heading}>Авторизация</legend>
								<label className={styles.login__label} htmlFor='login__email'>
									<input
										className={`${styles.login__input} ${
											emailInputClicked || emailInputValue
												? styles.login__active
												: ''
										}`}
										type='email'
										value={emailInputValue}
										onChange={handleEmailInputChange}
										onClick={handleEmailInputClick}
										id='login__email'
									/>
									<span className={styles.login__sign}>Почта</span>
								</label>
								{emailError && (
									<span className={styles.login__error}>{emailError}</span>
								)}
								<label
									className={styles.login__label}
									htmlFor='login__password'
								>
									<input
										className={`${styles.login__input} ${
											passwordInputClicked || passwordInputValue
												? styles.login__active
												: ''
										}`}
										type='password'
										value={passwordInputValue}
										onChange={handlePasswordInputChange}
										onClick={handlePasswordInputClick}
										autoComplete='true'
										id='login__password'
									/>
									<span className={styles.login__sign}>Пароль</span>
								</label>
								{passwordError && (
									<span className={styles.login__error}>{passwordError}</span>
								)}
								{loginError && (
									<span className={styles.login__error}>{loginError}</span>
								)}
								<label className={styles.login__label}>
									<button
										className={styles.login__send}
										type='submit'
										disabled={!isFormValid || isLoading}
									>
										<span className={styles.login__text}>
											{isLoading ? 'Вход...' : 'Войти'}
										</span>
									</button>
								</label>
							</fieldset>
						</form>
					</div>
				</div>
			</section>
		</>
	)
}
