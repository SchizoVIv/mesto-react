import React, { useState, useEffect } from "react"
import '../index.css';
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/api"
import EditProfilePopup from "./EditProfilePopup.js"
import EditAvatarPopup from "./EditAvatarPopup.js"
import AddPlacePopup from "./AddPlacePopup.js"
import ConfirmationPopup from "./ConfirmationPopup.js"

function App() {

  const[isEditProfilePopupOpen, setEditProfilePopupOpen]=useState(false)
  const[isAddPlacePopupOpen, setAddPlacePopupOpen]=useState(false)
  const[isEditAvatarPopupOpen, setEditAvatarPopupOpen]=useState(false)
  const[isConfirmationPopupOpen, setConfirmationPopupOpen]=useState(false)
  const[isLoading, setLoading] = useState(false)

  const [isDeletedCard, setDeletedCard] = useState({})


  const[selectedCard, setSelectedCard]=useState({})
  const[cards, setCards] = useState([])
  const[currentUser, setCurrentUser]=useState({})



  useEffect(() => {
    api
      .getProfileFromServer()
      .then( res => {
        setCurrentUser(res)
      })
      .catch(err => {
        console.error(`Error:${err} - ${err.statusText}`)})

    api
      .getCardsFromServer()
      .then(cardsData => {
        setCards(cardsData);
      })
      .catch(err => {
        console.error(`Error:${err} - ${err.statusText}`)})
    }, []);


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

  function handleConfirmationClick(){
    setConfirmationPopupOpen(true)
    }



  function closeAllPopups (){
      setEditProfilePopupOpen(false);
      setAddPlacePopupOpen(false);
      setEditAvatarPopupOpen(false);
      setSelectedCard({});
      setConfirmationPopupOpen(false)

      setDeletedCard({})
    }

  function handleCardDelete(card) {
    setLoading(true)
    api
      .removeCard(card._id)
      .then(() => {
        setCards(cards => cards.filter(c => c._id !== card._id))
        closeAllPopups()
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
      .finally(() => {setLoading(false)})
  }

  function handleCardLike(card, isLiked) {
    (!isLiked ?
      api
        .addLike(card._id) :
      api
        .removeLike(card._id)
    )
      .then(newCard =>
        setCards(state => state.map(c => (c._id === card._id ? newCard : c))))
      .catch((error) => console.log(`Ошибка: ${error}`))
  }

  function handleUpdateUser(newUserInfo) {
    setLoading(true)
    api
      .editProfile(newUserInfo)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
      .finally(() => {setLoading(false)})

  }

  function handleUpdateAvatar(newUserInfo) {
    setLoading(true)
    api
      .updateUserAvatar(newUserInfo)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
      .finally(() => {setLoading(false)})

  }

  function handleAddPlaceSubmit(cardData) {
    setLoading(true)
    api
      .addCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
      .finally(() => {setLoading(false)})
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            // onCardDelete={handleCardDelete}
            onCardDelete={setDeletedCard}
            onConfirmation={setConfirmationPopupOpen}
            cards={cards}
          />
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            onLoading={isLoading} />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            onLoading={isLoading} />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateUserAvatar={handleUpdateAvatar}
            onLoading={isLoading} />
          <ConfirmationPopup
            isOpen={isConfirmationPopupOpen}
            onClose={closeAllPopups}
            onLoading={isLoading}
            onCardDelete={handleCardDelete}
            // cards={cards}
            card={isDeletedCard}
            />
          <ImagePopup
            onClose={closeAllPopups}
            card={selectedCard}></ImagePopup>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

