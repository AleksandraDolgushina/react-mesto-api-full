import React from 'react'
import api from '../utils/api';
import Footer from './Footer';
import Header from './Header';
import ImagePopup from './ImagePopup';
import Main from './Main';
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteImgPopup from './DeleteImgPopup';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';
import InfoTooltip from './InfoTooltip';

const App = () => {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
    const [isDeleteImgPopupOpen, setIsDeleteImgPopupOpen] = React.useState(false)
    const [isInfoPopupOpen, setIsInfoPopupOpen] = React.useState(false)
    const [popupStatus, setPopupStatus] = React.useState(false)
    const [selectedCard, setSelectedCard] = React.useState(null)
    const [currentUser, setCurrentUser] = React.useState({})
    const [cards, setCards] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [idDeleteCard, setIdDeleteCard] = React.useState(null);
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [email, setEmail] = React.useState('')
    const history = useHistory()

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true)
    }

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true)
    }

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true)
    }

    const handleDeleteClick = (card) => {
        setIdDeleteCard(card._id)
        setIsDeleteImgPopupOpen(true)
    }

    const handleCardClick = (card) => {
        setSelectedCard(card)
    }

    const handleUpdateUser = (data) => {
        setIsLoading(true)
        api.editUser(data)
            .then((res) => {
                setCurrentUser(res)
                closeAllPopups()
            })
            .catch(error => console.log(error))
            .finally(() => setIsLoading(false))
    }

    const handleUpdateAvatar = (data) => {
        setIsLoading(true)
        api.setAvatar(data)
            .then((res) => {
                setCurrentUser(res)
                closeAllPopups()
            }) 
            .catch(error => console.log(error))
            .finally(() => setIsLoading(false))
    }

    const handleAddPlaceSubmit = (data) => {
        setIsLoading(true)
        api.addCard(data)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups()
            }) 
            .catch(error => console.log(error))
            .finally(() => setIsLoading(false))
    }

    const closeAllPopups = () => {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard(null);
        setIsDeleteImgPopupOpen(false);
        setIsInfoPopupOpen(false);
    }

    const  handleCardLike = (card) => {
        const isLiked = card.likes.some(i => i._id === currentUser._id);  
        api.changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch(error => console.log(error))
    }

    const handleCardDelete = () => {
        setIsLoading(true)
        api.deleteCard(idDeleteCard)
            .then((newCard) => {
                setCards((state) => state.filter((c) => c._id !== idDeleteCard && newCard));
                closeAllPopups()
            })
            .catch(error => console.log(error))
            .finally(() => setIsLoading(false))
    }
      
    const handleRegister = ({password, email}) => {
        auth.register(password, email)
            .then(() => {
                setIsInfoPopupOpen(true)
                setPopupStatus(true)
                history.push("/sign-in");
            })
            .catch(error => {
                console.log(error)
                setIsInfoPopupOpen(true)
                setPopupStatus(false)
            })
    }

    const handleLogin = ({password, email}) => {
        auth.authorize(password, email)
            .then((res) => {
                setLoggedIn(true);
                setEmail(email)
                localStorage.setItem('jwt', res.token);
                history.push("/");
            })
            .catch(error => {
                console.log(error)
                setIsInfoPopupOpen(true)
                setPopupStatus(false)
            })
    }

    const handleLogOut = () => {
        setEmail('')
        setLoggedIn(false)
        localStorage.removeItem('jwt')
    }

    React.useEffect(() => {
        Promise.all([api.getUser(), api.getCard()])
            .then(([ userData, cardsArray ]) => {
                setCurrentUser(userData)
                setCards(cardsArray)
            })
            .catch(error => console.log(error))
    }, []);

    React.useEffect(() => {
        if (loggedIn) {
            history.push('/')
        }
    }, [loggedIn])

    React.useEffect( () => {
        checkToken()
    }, [])

    const checkToken = () => {
        const jwt = localStorage.getItem('jwt')
        if (jwt) {
            auth.getContent(jwt)
            .then( res => {
                setEmail(res.data.email)
                setLoggedIn(true)
            })
            .catch(error => {
                console.error(error)})
        }
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Header handleLogOut={handleLogOut} email={email}/>
            <Switch>
                <ProtectedRoute 
                    exact path="/"
                    component={Main}
                    loggedIn={loggedIn}
                    onEditAvatar={handleEditAvatarClick} 
                    onEditProfile={handleEditProfileClick} 
                    onAddPlace={handleAddPlaceClick} 
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleDeleteClick} 
                />
                <Route path='/sign-in'>
                    <Login handleLogin={handleLogin} />
                </Route>
                <Route path='/sign-up'>
                    <Register handleRegister={handleRegister} />
                </Route>
                <Route>
                    {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
                </Route>
            </Switch>
            <Footer />
            <EditProfilePopup 
                isOpen={isEditProfilePopupOpen} 
                onClose={closeAllPopups} 
                onUpdateUser={handleUpdateUser}
                isLoading={isLoading}
            />
            <AddPlacePopup 
                isOpen={isAddPlacePopupOpen} 
                onClose={closeAllPopups} 
                onUpdateCard={handleAddPlaceSubmit}
                isLoading={isLoading}
            />
            <EditAvatarPopup 
                isOpen={isEditAvatarPopupOpen} 
                onClose={closeAllPopups} 
                onUpdateAvatar={handleUpdateAvatar}
                isLoading={isLoading}
            />
            <DeleteImgPopup
                isOpen={isDeleteImgPopupOpen}
                onClose={closeAllPopups}
                onUpdateDeleteCard={handleCardDelete}
                isLoading={isLoading}
            />
            <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
            <InfoTooltip isOpen={isInfoPopupOpen} onClose={closeAllPopups} popupStatus={popupStatus} />
        </CurrentUserContext.Provider>
  );
}

export default App;
