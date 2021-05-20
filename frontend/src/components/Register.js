import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

function Register({ handleRegister }) {
  const [register, setRegister] = React.useState({
    email: "",
    password: "",
  });

  function handleSubmit(evt) {
    evt.preventDefault();
    handleRegister(register);
  }

  function handleOnChange(evt) {
    const { name, value } = evt.target;
    setRegister({ ...register, [name]: value });
  }

  return (
    <>
      <Header headerText={"Войти"} link="/signin" />
      <div className="authorization">
        <form onSubmit={handleSubmit} className="authorization__form">
          <h3 className="authorization__title">Регистрация</h3>
          <input
            type="email"
            required
            minLength="2"
            maxLength="40"
            name="email"
            className="authorization__input"
            value={register.email}
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
            value={register.password}
            onChange={handleOnChange}
            placeholder="Пароль"
          />
          <button className="authorization__button" type="submit">
            Зарегистрироваться
          </button>
          <Link to="/signin" className="authorization__text">
            Зарегистрированы? Войти
          </Link>
        </form>
      </div>
    </>
  );
}

export default Register;
