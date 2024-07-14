import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import '../AuthForm.css';
import authService from '../../services/AuthService';

function Register() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [error, setError] = useState(null);
  const [hasErrors, setHasErrors] = useState(true);

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (hasErrors) {
      return;
    }

    authService.register(name, username, email, password)
      .then(response => {
        console.log('Registro bem-sucedido:', response.data);
        navigate('/login');
      })
      .catch(error => {
        console.error('Erro ao registrar usuário:', error);
        const errorMessage = Array.isArray(error.response.data.message)
          ? error.response.data.message
          : 'Erro ao registrar usuário.';
        setError(errorMessage);
      });
  };

  const validateUsername = () => {
    const hasError = username.length < 4 || username.length > 20 || !/^[a-zA-Z0-9]*$/.test(username);
    setUsernameError(hasError);
    updateFormErrorState();
  };

  const validateEmail = () => {
    const hasError = !/\S+@\S+\.\S+/.test(email);
    setEmailError(hasError);
    updateFormErrorState();
  };

  const validatePassword = () => {
    const hasError = password.length < 6 || !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z$*&@#]{6,}/.test(password);
    setPasswordError(hasError);
    updateFormErrorState();
  };

  const updateFormErrorState = () => {
    setHasErrors(usernameError || emailError || passwordError);
  };

  return (
    <div className="register-container">
      <div className="form-container">
        <h1>Cadastro</h1>
        {error && (
          <div className="error-message">
            {Array.isArray(error) ? error.map((err, index) => <p key={index}>{err}</p>) : <p>{error}</p>}
          </div>
        )}
        <form onSubmit={handleRegister}>
          <div className="form-control">
            <label>Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
          </div>
          <div className="form-control">
            <label>Usuário</label>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                validateUsername();
              }}
              onBlur={validateUsername}
              required
            />
            {usernameError && (
              <p className="error-text">Usuário deve conter de 4 a 20 caracteres e não pode conter caracteres especiais.</p>
            )}
          </div>
          <div className="form-control">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail();
              }}
              onBlur={validateEmail}
              required
            />
            {emailError && (
              <p className="error-text">Email inválido.</p>
            )}
          </div>
          <div className="form-control">
            <label>Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validatePassword();
              }}
              onBlur={validatePassword}
              required
            />
            {passwordError && (
              <p className="error-text">Senha deve ter pelo menos 6 caracteres e conter um dígito, uma letra minúscula e uma letra maiúscula.</p>
            )}
          </div>
          <button type="submit" disabled={hasErrors}>Cadastrar</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
