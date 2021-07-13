import PopupWithForm from "./PopupWithForm";
import React from 'react'

function DeleteImgPopup(props) {
    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateDeleteCard()

    }

    return (
        <PopupWithForm 
            title='Вы уверены?' 
            name='delete' 
            buttonText={props.isLoading ? 'Удаление...' : 'Да'} 
            isOpen={props.isOpen} 
            onClose={props.onClose} 
            onSubmit={handleSubmit}
        />
    )
}

export default DeleteImgPopup;