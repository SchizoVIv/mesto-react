import { useState, useEffect } from 'react';
import api from "../utils/api.js";
import Card from './Card';
import pen from '../image/pen.svg'

function Main(props) {

  const[userName, setUserName ]=useState("")
  const[userDescription, setUserDescription]=useState("")
  const[userAvatar, setUserAvatar]=useState("")
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getProfileFromServer()
      .then( res => {
        setUserName(res.name)
        setUserDescription(res.about)
        setUserAvatar(res.avatar)
      })
    api
      .getCardsFromServer()
      .then(cardsData => {
        setCards(cardsData);
      })
      .catch(err => {
        console.error(`Error:${err} - ${err.statusText}`)})
    }, []);

    return (
        <main className="main">
            <section className="profile">
            <div className="profile__info">
                <div className="profile__photo-conteiner">
                <img className="profile__photo" src={userAvatar.toString()} alt="Мое фото" />
                <button className="profile__button-avatar" type="button" onClick={props.onEditAvatar}>
                    <img className="profile__edit-pen" src={pen} alt="изображение письменной ручки" />
                </button>
                </div>
                <div className="profile__texts">
                <div className="profile__text">
                    <h1 className="profile__name">{userName}</h1>
                    <button className="profile__edit-button button-hover" type="button" aria-label="Редактировать" onClick={props.onEditProfile}/>
                </div>
                <p className="profile__about">{userDescription}</p>
                </div>
            </div>
            <button className="profile__add-button button-hover" type="button" aria-label="Добавить пост" onClick={props.onAddPlace} />
            </section>
            <section>
            <ul className="elements">
                <template id="cardTemplate"/>
                  {cards.map(card => (
                    <Card key={card._id} card={card} onCardClick={props.onCardClick} />
                   ))}

            </ul>
            </section>
        </main>
    );
}
export default Main;
