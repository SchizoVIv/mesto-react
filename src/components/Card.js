import React from "react";

export default function Card(props) {

  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <li
      className="element"
      key={props.card._id}
      data-card-id={props.card._id}
      >
      <div name="elementCard" action="">
        <img
          className="element__image"
          src={props.card.link}
          alt={props.card.name}
          onClick={handleClick}
          />
        <button
          className="element__delete-button button-hover"
          type="button"
          aria-label="Удалить карточку"
        />
        <div className="element__text">
          <h2 className="element__title" />
          <div className="element__like-container">
            <button
              className="element__like-button"
              type="button"
              aria-label="Лайк"
            />
            <span className="element__like-count" />{props.card.likes.length}<span/>
          </div>
        </div>
      </div>
    </li>
  )
}
