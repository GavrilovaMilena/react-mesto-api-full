import React from "react";

function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_${props.name} ${
        props.isOpen ? "popup_visible" : ""
      }`}
    >
      <div className={`popup__window popup__window_${props.name}`}>
        <h2 className={`popup__title`}>{props.title}</h2>
        {props.children}
        <button
          className={`popup__close-button popup__close-button_${props.name}`}
          onClick={props.onClose}
        ></button>
        <form
          className={`popup__form popup__form_${props.name}`}
          name={props.name}
          noValidate
          onSubmit={props.onSubmit}
        >
          <button
            className={`popup__button popup__button_${props.name}`}
            type="submit"
          >
            {props.buttonName}
          </button>
        </form>
      </div>
    </div>
  );
}
export default PopupWithForm;
