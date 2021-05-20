import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  //Подписка на контекст CurrentUserContext
  const currentUser = React.useContext(CurrentUserContext);

  //Cтейты имени и описания профиля
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  //После загрузки данных пользователя из API
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  //Функция для изменения имени
  function handleChangeName(e) {
    setName(e.target.value);
  }

  //Функция для изменения описания профиля
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  //Обработчик сабмита формы
  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profileprofileEdit"
      title="Редактировать профиль"
      buttonName="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <form className="popup__form" name="infoForm">
        <input
          name="userName"
          type="text"
          className="popup__input"
          placeholder="Имя"
          maxLength="40"
          minLength="2"
          required
          id="name"
          autoComplete="off"
          onChange={handleChangeName}
          value={name}
        />

        <span id="name-error" className="error" />

        <input
          name="description"
          type="text"
          className="popup__input"
          placeholder="О себе"
          maxLength="200"
          minLength="2"
          required
          id="about"
          autoComplete="off"
          onChange={handleChangeDescription}
          value={description}
        />

        <span id="about-error" className="error" />
      </form>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
