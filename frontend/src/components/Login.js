import React from "react";
import Header from "./Header";

function Login({ handleLogin }) {
  const [auth, setAuth] = React.useState({
    email: "",
    password: "",
  });

  function handleOnChange(evt) {
    const { name, value } = evt.target;
    setAuth({ ...auth, [name]: value });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleLogin(auth);
  }

  return (
    <>
      <Header headerText={"Регистрация"} link="/signup" />
      <div className="authorization">
        <form onSubmit={handleSubmit} className="authorization__form">
          <h3 className="authorization__title">Вход</h3>
          <input
            type="email"
            required
            minLength="2"
            maxLength="40"
            name="email"
            className="authorization__input"
            value={auth.email}
            onChange={handleOnChange}
            placeholder="Email"
          />
          <input
            type="password"
            required
            minLength="2"
            maxLength="200"
            name="password"
            className="authorization__input"
            value={auth.password}
            onChange={handleOnChange}
            placeholder="Пароль"
          />
          <button className="authorization__button" type="submit">
            Войти
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
