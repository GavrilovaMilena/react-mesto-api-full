import React from "react";
import { CurrentUserContext } from "../../src/contexts/CurrentUserContext";

function Card(props) {
  //Подписка на контекст CurrentUserContext
  const currentUser = React.useContext(CurrentUserContext);

  //Определяем, являемся ли мы владельцем карточки
  const isOwn = props.card.owner === currentUser._id;

  //Если карточка наша - видим иконку удаления
  const cardDeleteButtonClassName = `card__delete ${
    isOwn ? "card__delete_visible" : "card__delete_hidden"
  }`;

  //Определяем, поставлен ли у карточки лайк
  const isLiked = props.card.likes.some((i) => i === currentUser._id);

  //Закрашивание, если карточка лайкнута
  const cardLikeButtonClassName = `card__like ${
    isLiked ? "card__like_active" : ""
  }`;

  //Обработчик клика по карточке
  function handleClick() {
    props.onCardClick(props.card);
  }

  //Обработчик удаления карточки
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  //Обработчик клика по лайку
  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  return (
    <div className="card">
      <img
        className="card__image"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
      />
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
        type="button"
      ></button>
      <div className="card__group">
        <h3 className="card__text">{props.card.name}</h3>
        <div className="card__like-container">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            type="button"
          ></button>
          <span className="card__like-counter">{props.card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}
export default Card;
