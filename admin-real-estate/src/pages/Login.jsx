import loginImage from "../assets/login.svg";
import promovillaNew from "../assets/promovillaNew.png";
import React, { useEffect, useState } from "react";
import { useLogin } from "../hooks/useLogin";
import toast from "react-hot-toast";
import MoonLoader from "../components/MoonLoaderSpinner";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading, error } = useLogin();

  const handleLogin = async (e) => {
    e.preventDefault();
    login(username, password);
  };

  useEffect(() => {
    if (error) {
      if (error?.username && error?.password) {
        toast.error("Entrez un nom d'utilisateur et un mot de passe valides");
      } else toast.error(error?.username || error?.password);
    }
  }, [error]);

  return (
    <div className='login'>
      <img
        src={loginImage}
        alt='login-immobilier-image'
        className='login-img'
      />
      <div className='parent-login-container'>
        <div className='login-container'>
          <div className='login-form'>
            <img
              src={promovillaNew}
              alt='promovilla-immobilier'
              className='promovilla-login'
            />
            <h3>Se connecter</h3>
            <form onSubmit={handleLogin}>
              <input
                type='text'
                placeholder="Nom d'utilisateur"
                autoComplete='username'
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <input
                type='password'
                autoComplete='current-password'
                placeholder='Mot de passe'
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {!isLoading ? (
                <button type='submit' disabled={isLoading}>
                  Se connecter
                </button>
              ) : (
                <MoonLoader />
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
