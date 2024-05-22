import axios from 'axios'
import { useState } from 'react'

export function useRegistration() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handlePasswordConfirmChange = (e) => setPasswordConfirm(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setErrorMessage('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('/api/register', {
        username,
        email,
        password,
      });
      console.log('Registration successful:', response.data);
    } catch (error) {
      setErrorMessage('Registration failed');
      console.error('Registration error:', error);
    }
  };

  return {
    username,
    email,
    password,
    passwordConfirm,
    errorMessage,
    handleUsernameChange,
    handleEmailChange,
    handlePasswordChange,
    handlePasswordConfirmChange,
    handleSubmit,
  };
}
