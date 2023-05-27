import React from "react";
import { useState } from 'react';
import '../index.css';
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";

function App() {

  const[isEditProfilePopupOpen, setEditProfilePopupOpen]=useState(false)
  const[isAddPlacePopupOpen, setAddPlacePopupOpen]=useState(false)
  const[isEditAvatarPopupOpen, setEditAvatarPopupOpen]=useState(false)
  const[selectedCard, setSelectedCard]=useState({})

  function handleEditAvatarClick (){
    setEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick (){
    setEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick (){
    setAddPlacePopupOpen(true)
  }

  function handleCardClick(card){
    setSelectedCard(card)
  }

  function closeAllPopups (){
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard({});
  }

  return (
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />
        <Footer />
        <PopupWithForm
          name="profile"
          title="Редактировать профиль"
          id="popapContentProfile"
          btnName="Сохранить"
          close={closeAllPopups}
          isOpen={isEditProfilePopupOpen}
          >
            <input
              className="popup__field popup__field_name "
              type="text"
              name="name"
              id="inputName"
              placeholder="Имя"
              minLength={2}
              maxLength={40}
              required />
            <span className="popup__input-error popup__input-error_type_inputName"></span>
            <input
              className="popup__field popup__field_about"
              type="text"
              name="about"
              id="inputAbout"
              placeholder="Род деятельности"
              minLength={2}
              maxLength={200}
              required />
            <span className="popup__input-error popup__input-error_type_inputAbout" />
        </PopupWithForm>
        <PopupWithForm
          name="cards"
          title="Новое место"
          id="popapContentCards"
          btnName="Создать"
          close={closeAllPopups}
          isOpen={isAddPlacePopupOpen}

          >
            <input
              className="popup__field popup__field_name-card"
              type="text"
              name="title"
              id="inputNameСard"
              placeholder="Название"
              minLength={2}
              maxLength={30}
              required />
            <span className="popup__input-error popup__input-error_type_inputNameСard" />
            <input
              className="popup__field popup__field_link-card"
              type="url"
              pattern="https://.*"
              name="link"
              id="inputAboutСard"
              placeholder="Ссылка на картинку"
              required />
            <span className="popup__input-error popup__input-error_type_inputAboutСard" />
        </PopupWithForm>
        <PopupWithForm
          name="edit-avatar"
          title="Обновить аватар"
          id="popapAvatar"
          btnName="Сохранить"
          close={closeAllPopups}
          isOpen={isEditAvatarPopupOpen}

          >
            <input
              className="popup__field popup__field_link-avatar"
              id="ignputAvatar"
              name="avatar"
              type="url"
              pattern="https://.*"
              placeholder="Введите ссылку URL"
              required />
            <span className="popup__input-error popup__input-error_type_ignputAvatar" />
        </PopupWithForm>
        <PopupWithForm
          name="question"
          title="Вы уверены?"
          id="popapQuestion"
          btnName="Да"
          close={closeAllPopups}
          isOpen={isEditAvatarPopupOpen}
          ></PopupWithForm>
        <ImagePopup
          onClose={closeAllPopups}
          card={selectedCard}></ImagePopup>
      </div>
  );
}

export default App;
