import PopupWithForm from "./PopupWithForm"
import React from 'react'

function EditAvatarPopup(props) {
    const avatarRef = React.useRef();

    React.useEffect(() => {
        avatarRef.current.value = ''
    }, [props.isOpen])

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
          avatar: avatarRef.current.value,
        });
    }
      
    return (
        <PopupWithForm 
            title='Обновить аватар' 
            name='avatar' 
            buttonText={props.isLoading ? 'Обновление...' : 'Обновить'} 
            isOpen={props.isOpen} 
            onClose={props.onClose} 
            onSubmit={handleSubmit}
        >
            <label className="popup__field">
                <input 
                    type="url" 
                    className="popup__item popup__item_type_avatar" 
                    id="avatar-input" 
                    name="avatar" 
                    required  
                    placeholder="Ссылка на картинку"
                    ref={avatarRef}
                />
                <span className="popup__input-error avatar-input-error"></span>
            </label>         
        </PopupWithForm>
    )
}

export default EditAvatarPopup