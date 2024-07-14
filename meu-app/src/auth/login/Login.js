import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import authService from '../../services/AuthService';

function Login() {
  const [user, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();

    authService.login(user, password)
      .then(response => {
        console.log('Login bem-sucedido:', response);
      })
      .catch(error => {
        console.error('Erro ao fazer login:', error);
        setError('Credenciais inválidas. Por favor, tente novamente.');
      });
  };

  return (
    <div className="login-container">
      <h1>Login Page</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="form-control">
          <label>Username</label>
          <input
            type="text"
            value={user}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>Não tem uma conta? <Link to="/register">Registre-se aqui</Link></p>
    </div>
  );
}

export default Login;

