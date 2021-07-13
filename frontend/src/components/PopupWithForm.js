import React from 'react'

function PopupWithForm ({title, name, children, buttonText, isOpen, onClose, onSubmit}) {
    return (
        <section className={`popup popup_${name} ${isOpen && "popup_opened"}`}>
            <div className="popup__container">
                <button className="popup__close" type="button" onClick={onClose}></button>     
                <form className="popup__form" name={`form-${name}`} onSubmit={onSubmit}>
                    <fieldset className="popup__info">
                        <h2 className="popup__title">{title}</h2>{children}                
                        <button className="popup__save-button"  type="submit">{buttonText}</button>
                    </fieldset>
                </form>

            </div>
        </section>
    )
}

export default PopupWithForm;