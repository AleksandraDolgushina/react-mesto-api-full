import React from 'react'

function ImagePopup({ card, onClose}) {
    return(
        <section className= {`popup popup_open-image ${card && "popup_opened"}`}>
            <div className="popup__container-image">
                <button className="popup__close" type="button" onClick={onClose}></button>
                <img className="popup__image"  src={card?.link} alt={card?.name}/>
                <h2 className="popup__place">{card?.name}</h2>
            </div>
        </section>
    )
}
export default ImagePopup;