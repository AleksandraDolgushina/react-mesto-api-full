import React from 'react';
import ok from '../images/ok.svg';
import error from '../images/error.svg';

function InfoTooltip(props) {
    return (
        <div className={`popup ${props.isOpen && "popup_opened"}`}>
            <div className="popup__container">
                <button type="button" className="popup__close" onClick={props.onClose}></button>
                <img className="popup__img" src={props.popupStatus ? ok : error} alt="Результат"></img>
                <h2 className="popup__title">
                    {props.popupStatus ? 
                        "Вы успешно зарегистрировались!"
                        : "Что-то пошло не так! Попробуйте ещё раз."}
                </h2>
            </div>
        </div>
    )
};

export default InfoTooltip;