import React from "react";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../../src/contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Route, Switch, useHistory } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import api from "../utils/api";
import "../index.css";
import { register, login, getData } from "../utils/auth";

function App() {
  //Логаут пользователя из системы
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsAuth(false);
  };

  //Авторизация пользователя
  const handleLogin = (data) => {
    const { email, password } = data;
    setUserLoginData(email);
    login(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setLoggedIn(true);
          setIsAuth(true);
          history.push("/");
        }
      })
      .catch((err) => {
        setIsAuth(false);
        setIsTooltipOpened(true);
        openRegModal();
        console.log(`Произошла ошибка: ${err}`);
      });
  };

  //Регистрация нового пользователя
  const handleRegister = (data) => {
    const { email, password } = data;
    return register(email, password)
      .then((res) => {
        if (res) {
          setIsAuth(true);
          openRegModal();
        }
      })
      .catch((err) => {
        setIsTooltipOpened(true);
        setIsAuth(false);
        openRegModal();
        console.log(`Произошла ошибка: ${err}`);
      });
  };

  const history = useHistory();

  //Стейт для отображения InfoTooltip
  const [isTooltipOpened, setIsTooltipOpened] = React.useState(false);

  //Стейт для данных залогиненного пользователя
  const [userLoginData, setUserLoginData] = React.useState("");

  //Стейт для авторизации
  const [isAuth, setIsAuth] = React.useState(false);

  //Стейт для авторизации
  const [loggedIn, setLoggedIn] = React.useState(false);

  //Стейты для отображения поп-апов
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false
  );
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    false
  );

  //Стейт для выбранной карточки
  const [selectedCard, setSelectedCard] = React.useState(false);

  //Стейт для данных пользователя
  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    about: "",
    avatar: "",
  });

  //Стейт для карточек
  const [cards, setCards] = React.useState([]);

  //Обновление стейтов пользователя на основе токена
  React.useEffect(() => {
    if (localStorage.getItem("jwt")) {
      api.setToken(localStorage.getItem("jwt"));
      api.getUserInfo()
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setUserLoginData(res.email);
            setCurrentUser({
              name: res.name,
              about: res.about,
              avatar: res.avatar,
              _id: res._id,
            });

            api
            .getInitialCards()
            .then((data) => {
              data.reverse();
              setCards(data);
            })
          }
        })
        .catch((err) => {
          openRegModal();
          console.log(`Произошла ошибка: ${err}`);
        });
    }
  }, [history, loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  }, [history, loggedIn]);

  //Функция лайка карточки
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Функция удаления карточки
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Обработчик клика по изображению карточки
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  //Обработчик кнопки редактирования аватарки
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditTooltipClick() {
    setIsTooltipOpened(true);
  }
  //Обработчик кнопки редактирования информации профиля
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  //Обработчик кнопки добавления новой карточки
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  //Обработчик закрытия любых поп-апов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(false);
    setIsTooltipOpened(false);
  }

  //Обработчик для отправки данных пользователя на сервер
  function handleUpdateUser({ name, about }) {
    api
      .setUserInfo({ name, about })
      .then((data) => {
        setCurrentUser({
          name: data.name,
          about: data.about,
          avatar: data.avatar,
          _id: data._id,
        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Обработчик для обновления аватарки пользователя
  function handleUpdateAvatar({ avatar }) {
    api
      .updateAvatarImage({ avatar })
      .then((data) => {
        setCurrentUser({
          name: data.name,
          about: data.about,
          avatar: data.avatar,
          _id: data._id,
        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Функция добавления карточки
  function handleAddPlaceSubmit(name, link) {
    api
      .addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Показ/скрытие попапа об успешной/неудачной регистрации
  function openRegModal() {
    setIsTooltipOpened(true);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              loggedIn={loggedIn}
              component={Main}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              isTooltipOpened={handleEditTooltipClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              userLoginData={userLoginData}
              logout={handleLogout}
            />
            <Route path="/signin">
              <Login handleLogin={handleLogin} />
            </Route>
            <Route path="/signup">
              <Register handleRegister={handleRegister} />
            </Route>
          </Switch>
          <Footer />
        </div>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <PopupWithForm name="cardDelete" title="Вы уверены?" buttonName="Да" />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          isOpen={isTooltipOpened}
          onClose={closeAllPopups}
          name="reg"
          isRegSuccess={isAuth}
          regSuccess="Вы успешно зарегестрировались!"
          regFailed="Что-то пошло не так! Попробуйте ещё раз."
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;
