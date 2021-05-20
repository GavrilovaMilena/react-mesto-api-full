import React from "react";
import Failed from "../images/Failed.svg";
import success from "../images/success.svg";

function InfoTooltip(props) {
  return (
    <>
      <div className={`popup ${props.isOpen && "popup_visible"}`}>
        <div className={`popup__window popup__window_${props.name}`}>
          <button
            type="button"
            className={`popup__close-button popup__close-button_${props.name}`}
            onClick={props.onClose}
          ></button>
          <img
            className="popup__image"
            src={`${props.isRegSuccess ? success : Failed}`}
            alt="Изображение статуса регистрации"
          />
          <p className="popup__register-text">
            {`${props.isRegSuccess ? props.regSuccess : props.regFailed}`}
          </p>
        </div>
      </div>
    </>
  );
}

export default InfoTooltip;