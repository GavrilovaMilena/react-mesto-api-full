import React from "react";

function ImagePopup(props) {
  return (
    <div className={`popup popup_full ${props.card ? "popup_visible" : ""}`}>
      <div className="popup__full-group">
        <img
          className="popup__full-image"
          src={props.card.link}
          alt={props.card.name}
        />
        <button
          type="button"
          className="popup__close-button popup__close-button_full"
          onClick={props.onClose}
        ></button>
        <p className="popup__full-text">{props.card.name}</p>
      </div>
    </div>
  );
}
export default ImagePopup;
