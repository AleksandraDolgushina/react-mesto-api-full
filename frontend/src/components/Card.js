import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {

    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = props.card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        `element__delete ${isOwn && 'element__delete_active'}`
    );

    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `element__like ${isLiked && 'element__like_active'}`
    );

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card)
    }

    function handleCardDelete() {
        props.onCardDelete(props.card)
    }

    return( 
        <div className="element">
            <div className="element__image" style={{ backgroundImage: `url(${props.card.link})`}} onClick={handleClick}/>
            <button className={cardDeleteButtonClassName} onClick={handleCardDelete}></button>
            <div className="element__title">
                <h2 className="element__place">{props.card.name}</h2>
                <div className="element__likes-container">
                    <button className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <p className="element__likes">{props.card.likes.length}</p>
                </div>
            </div>
        </div>
    )
}
export default Card;