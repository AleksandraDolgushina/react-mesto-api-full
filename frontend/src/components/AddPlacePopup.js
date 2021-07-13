import PopupWithForm from "./PopupWithForm";
import React from 'react'

function AddPlacePopup(props) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    React.useEffect(() => {
            setName('')
            setLink('')
    }, [props.isOpen])

    function handleChangeName(e) {
        setName(e.target.value);
      }
    
    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateCard({
            name,
            link,
        });
    }

    return (
        <PopupWithForm 
            title='Новое место' 
            name='add' 
            buttonText={props.isLoading ? 'Создание...' : 'Создать'} 
            isOpen={props.isOpen} 
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <label className="popup__field">
                <input 
                    type="text" 
                    className="popup__item popup__item_type_title" 
                    id="title-input" 
                    name="name" 
                    minLength="2" 
                    maxLength="30" 
                    required  
                    placeholder="Название"
                    value={name}
                    onChange={handleChangeName}
                />
                <span className="popup__input-error title-input-error"></span>
            </label>
            <label className="popup__field">
                <input 
                    type="url" 
                    className="popup__item popup__item_type_link" 
                    id="link-input" 
                    name="link" 
                    required 
                    placeholder="Ссылка на картинку"
                    value={link}
                    onChange={handleChangeLink}
                />
                <span className="popup__input-error link-input-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default AddPlacePopup;