import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import '../AuthForm.css';
import authService from '../../services/AuthService';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Login() {
  const [user, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userError, setUserError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [error, setError] = useState(null);
  const [hasErrors, setHasErrors] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (hasErrors || loading) {
      return;
    }

    setLoading(true);

    authService.login(user, password)
      .then(response => {
        console.log('Login bem-sucedido:', response);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao fazer login:', error);
        setError(error.response.data.message || 'Credenciais inválidas. Por favor, tente novamente.');
        setLoading(false);
      });
  };

  const validateUser = () => {
    const hasError = user.length === 0;
    setUserError(hasError);
    updateFormErrorState();
  };

  const validatePassword = () => {
    const hasError = password.length === 0;
    setPasswordError(hasError);
    updateFormErrorState();
  };

  const updateFormErrorState = () => {
    setHasErrors(userError || passwordError);
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <h1>Entrar</h1>
        {error && (
          <div className="error-message">
            {Array.isArray(error) ? error.map((err, index) => <p key={index}>{err}</p>) : <p>{error}</p>}
          </div>
        )}
        <form onSubmit={handleLogin}>
          <div className="form-control">
            <label>Usuário</label>
            <input
              type="text"
              value={user}
              onChange={(e) => {
                setUsername(e.target.value);
                validateUser();
              }}
              onBlur={validateUser}
              required
            />
            {userError && (
              <p className="error-text">Usuário é obrigatório.</p>
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
              <p className="error-text">Senha é obrigatória.</p>
            )}
          </div>
          <button type="submit" disabled={hasErrors || loading}>
            {loading ? <i className="fa fa-spinner fa-spin"></i> : 'Entrar'}
          </button>
        </form>
        <p>Não tem uma conta? <Link to="/register">Registre-se aqui</Link></p>
      </div>
    </div>
  );
}

export default Login;
