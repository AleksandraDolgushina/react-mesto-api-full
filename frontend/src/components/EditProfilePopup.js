import React from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from "./PopupWithForm"

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState(currentUser.name);
    const [description, setDescription] = React.useState(currentUser.about);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
      }
    
    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name,
            about: description
        });
    }

    return (
        <PopupWithForm 
            title='Редактировать профиль'
            name='edit' 
            buttonText={props.isLoading ? 'Сохранение...' : 'Сохранить'} 
            isOpen={props.isOpen} 
            onClose={props.onClose} 
            onSubmit={handleSubmit}
        >
            <label className="popup__field">
                <input 
                    type="text" 
                    className="popup__item popup__item_type_name" 
                    id="name-input" 
                    name="name" 
                    minLength="2" 
                    maxLength="40" 
                    required 
                    value={name || ''}
                    onChange={handleChangeName}
                />
                <span className="popup__input-error name-input-error"></span>
            </label>
            <label className="popup__field">
                <input type="text" 
                    className="popup__item popup__item_type_description" 
                    id="description-input" 
                    name="about" 
                    minLength="2" 
                    maxLength="200" 
                    required 
                    value={description || ''}
                    onChange={handleChangeDescription}
                />
                <span className="popup__input-error description-input-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default EditProfilePopup