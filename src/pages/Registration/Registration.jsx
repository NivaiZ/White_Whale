import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api'
import Header from '../../components/Header/Header'
import styles from './registration.module.css'
/**
 * Компонент для отображения формы регистрации.
 * @returns {JSX.Element} Элемент JSX для рендера компонента.
 */
export default function Registration() {
	// Состояния для хранения значений полей ввода, состояний кликов и ошибок
	const [emailInputValue, setEmailInputValue] = useState('')
	const [passwordInputValue, setPasswordInputValue] = useState('')
	const [nameInputValue, setNameInputValue] = useState('')

	const [emailInputClicked, setEmailInputClicked] = useState(false)
	const [passwordInputClicked, setPasswordInputClicked] = useState(false)
	const [nameInputClicked, setNameInputClicked] = useState(false)

	const [emailError, setEmailError] = useState('')
	const [passwordError, setPasswordError] = useState('')
	const [nameError, setNameError] = useState('')

	const [isFormValid, setIsFormValid] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [registrationError, setRegistrationError] = useState('')
	const navigate = useNavigate()

	// Обработчик изменения значения в поле ввода email
	const handleEmailInputChange = e => {
		const value = e.target.value
		setEmailInputValue(value)
		setEmailError('')
		checkFormValidity(value, passwordInputValue, nameInputValue)
	}

	// Обработчик клика на поле ввода email
	const handleEmailInputClick = () => {
		setEmailInputClicked(true)
		setPasswordInputClicked(false)
		setNameInputClicked(false)
	}

	// Обработчик изменения значения в поле ввода пароля
	const handlePasswordInputChange = e => {
		const value = e.target.value
		setPasswordInputValue(value)
		setPasswordError('')
		checkFormValidity(emailInputValue, value, nameInputValue)
	}

	// Обработчик клика на поле ввода пароля
	const handlePasswordInputClick = () => {
		setPasswordInputClicked(true)
		setEmailInputClicked(false)
		setNameInputClicked(false)
	}

	// Обработчик клика вне полей ввода для сброса состояния клика
	const handleDocumentClick = e => {
		if (!e.target.closest(`.${styles.registration__input}`)) {
			setEmailInputClicked(false)
			setPasswordInputClicked(false)
			setNameInputClicked(false)
		}
	}
	const handleNameInputChange = e => {
		const value = e.target.value
		setNameInputValue(value)
		setNameError('')
		checkFormValidity(emailInputValue, passwordInputValue, value)
	}
	// Проверяет валидность формы и устанавливает соответствующее состояние
	const checkFormValidity = () => {
		setIsFormValid(
			emailInputValue.trim() !== '' && passwordInputValue.trim() !== ''
		)
	}
	const handleNameInputClick = () => {
		setNameInputClicked(true)
		setEmailInputClicked(false)
		setPasswordInputClicked(false)
	}
	// Обработчик отправки формы
	const handleSubmit = async e => {
		e.preventDefault()
		setIsLoading(true)

		try {
			// Отправка запроса на регистрацию
			const response = await api.post(
				'https://615aa29e26d29508.mokky.dev/register',
				{
					email: emailInputValue,
					password: passwordInputValue,
					name: nameInputValue,
				}
			)

			// Получение токена из ответа
			const { token } = response.data

			// Сохранение токена в localStorage
			localStorage.setItem('token', token)

			// Переход на страницу Dashboard (или другую страницу)
			navigate('/dashboard')
		} catch (error) {
			// Обработка ошибки
			setRegistrationError('Ошибка при регистрации')
		} finally {
			setIsLoading(false)
		}
	}

	// Hook useEffect для добавления слушателя событий при монтировании компонента
	useEffect(() => {
		document.addEventListener('click', handleDocumentClick)

		// Hook useEffect для удаления слушателя событий при размонтировании компонента
		return () => {
			document.removeEventListener('click', handleDocumentClick)
		}
	}, [])

	return (
		<>
			<Header />
			<section className={styles.registration__section}>
				<div className={styles.registration__wrapper}>
					<div className={styles.registration__block}>
						<form onSubmit={handleSubmit} method='post'>
							<fieldset className={styles.registration__fieldset}>
								<legend className={styles.registration__heading}>
									Регистрация
								</legend>

								<label
									className={styles.registration__label}
									htmlFor='registration__email'
								>
									<input
										className={`${styles.registration__input} ${
											emailInputClicked || emailInputValue
												? styles.registration__active
												: ''
										}`}
										type='email'
										value={emailInputValue}
										onChange={handleEmailInputChange}
										onClick={handleEmailInputClick}
										id='registration__email'
										name='registrationEmail'
									/>
									<span className={styles.registration__sign}>Почта</span>
								</label>
								{emailError && (
									<span className={styles.registration__error}>
										{emailError}
									</span>
								)}
								<label
									className={styles.registration__label}
									htmlFor='registration__password'
								>
									<input
										className={`${styles.registration__input} ${
											passwordInputClicked || passwordInputValue
												? styles.registration__active
												: ''
										}`}
										type='password'
										value={passwordInputValue}
										onChange={handlePasswordInputChange}
										onClick={handlePasswordInputClick}
										autoComplete='true'
										id='registration__password'
										name='RegistrationPassword'
									/>
									<span className={styles.registration__sign}>Пароль</span>
								</label>
								{passwordError && (
									<span className={styles.registration__error}>
										{passwordError}
									</span>
								)}
								<label
									className={styles.registration__label}
									htmlFor='registration__name'
								>
									<input
										className={`${styles.registration__input} ${
											nameInputClicked || nameInputValue
												? styles.registration__active
												: ''
										}`}
										type='text'
										value={nameInputValue}
										onChange={handleNameInputChange}
										onClick={handleNameInputClick}
										id='registration__name'
										name='registrationName'
									/>
									<span className={styles.registration__sign}>Имя</span>
								</label>
								{nameError && (
									<span className={styles.registration__error}>
										{nameError}
									</span>
								)}
								<label className={styles.registration__label}>
									<button
										className={styles.registration__send}
										type='submit'
										disabled={!isFormValid || isLoading}
										name='typeData'
									>
										<span className={styles.registration__text}>
											{isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
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
