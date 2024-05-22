import React from 'react'
import { Link } from 'react-router-dom'
import styles from './registration.module.css'
import { useRegistration } from './useRegistration'

export default function Registration() {
  const { 
    username, 
    email, 
    password, 
    passwordConfirm, 
    errorMessage, 
    handleUsernameChange, 
    handleEmailChange, 
    handlePasswordChange, 
    handlePasswordConfirmChange, 
    handleSubmit 
  } = useRegistration();

  return (
    <div className={styles.registration}>
      <form onSubmit={handleSubmit} className={styles.registrationForm}>
        <h2>Регистрация</h2>
        {errorMessage && <div className={styles.error}>{errorMessage}</div>}
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Username"
          required
        />
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
          required
        />
        <input
          type="password"
          value={passwordConfirm}
          onChange={handlePasswordConfirmChange}
          placeholder="Confirm Password"
          required
        />
        <button type="submit">Зарегистрироваться</button>
      </form>
      <Link to="/login">Уже есть аккаунт? Войти</Link>
    </div>
  );
}
