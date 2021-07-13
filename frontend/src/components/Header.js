import React from 'react'
import logoImg from '../images/logo.svg'
import { Route, Link } from 'react-router-dom';

function Header({email, handleLogOut}) {
    return (
        <header className="header">
            <img className="header__logo" src={logoImg} alt='Логотип'/>
            <Route path="/sign-up">
                <Link className="header__auth-link" to="sign-in">Войти</Link>
            </Route>
            <Route path="/sign-in">
                <Link className="header__auth-link" to="sign-up">Регистрация</Link>
            </Route>
            <Route exact path="/">
                <div className="header__auth-info">
                    <p className="header__auth-email">{email}</p>
                    <button className="header__auth-button" onClick={handleLogOut}>Выйти</button> 
                </div>
            </Route>
        </header>
    )
}
export default Header;