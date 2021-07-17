import React from 'react'
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete}) {
    const currentUser = React.useContext(CurrentUserContext)

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__header">
                    <div className="profile__avatar-container">
                        <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})`}} />
                        <button className="profile__avatar-edit" onClick={onEditAvatar}></button>
                    </div>
                    <div className="profile__info">
                        <div className="profile__text">
                            <h1 className="profile__name">{currentUser.name}</h1>
                            <p className="profile__description">{currentUser.about}</p>
                        </div>
                        <button className="profile__edit-button" onClick={onEditProfile}></button>
                    </div>
                </div>
                <button className="profile__add-button" onClick={onAddPlace}></button>
            </section>
            <section className="elements">
                {cards.map((item) => (
                    <Card key={item._id} card={item} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}/>
                ))}
            </section>
        </main>
    )
}
export default Main