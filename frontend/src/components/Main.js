import React from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../../src/contexts/CurrentUserContext.js";
import Header from "./Header";

function Main(props) {
    //Подписка на контекст CurrentUserContext
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <Header
        loggedIn={props.loggedIn}
        login={props.userLoginData}
        link="/signin"
        onClick={props.logout}
        headerText={"Выйти"}
      />
      <main className="content">
        <section className="profile">
          <div className="profile__avatar-container">
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="Фото профиля"
            />
            <button
              className="profile__avatar-button"
              onClick={props.onEditAvatar}
            ></button>
          </div>
          <div className="info">
            <h1 className="info__title">{currentUser.name}</h1>
            <p className="info__subtitle">{currentUser.about}</p>
            <button
              className="info__button"
              type="button"
              onClick={props.onEditProfile}
            ></button>
          </div>
          <button
            className="profile__add-button"
            type="button"
            onClick={props.onAddPlace}
          ></button>
        </section>
        <section className="cards">
          {props.cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </section>
      </main>
    </>
  );
}
export default Main;
