import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleCardName(e) {
    setName(e.target.value);
  }

  function handleCardLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace(name, link);
  }

  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      buttonName="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <form name="cardForm" className="popup__form popup__form_card">
        <input
          name="cardName"
          type="text"
          className="popup__input popup__input_card"
          placeholder="Название"
          maxLength="30"
          minLength="2"
          required
          id="text"
          autoComplete="off"
          value={name}
          onChange={handleCardName}
        />

        <span id="text-error" className="error"></span>

        <input
          name="cardLink"
          type="url"
          className="popup__input popup__input_card"
          placeholder="Ссылка на картинку"
          required
          id="url-card"
          autoComplete="off"
          value={link}
          onChange={handleCardLink}
        />

        <span id="url-card-error" className="error"></span>
      </form>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
