import React from 'react'
import { Link } from 'react-router-dom';

const Register = ({handleRegister}) => {
    const [data, setData] = React.useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setData({
          ...data,
          [name]: value 
        })
      }
      const handleSubmit = (e) => {
        e.preventDefault();
        if (!data.email || !data.password){
          return;
        }
        const {password, email} = data
        handleRegister({password, email})
      }

    return(
      <section className="regist">
        <form className="regist__form" name="register" onSubmit={handleSubmit} noValidate>
            <h2 className="regist__title">Регистрация</h2>
            <input className="regist__item" type="email" name="email" placeholder="Email" value={data.email} onChange={handleChange}></input>  
            <input className="regist__item" type="password" name="password" placeholder="Пароль" value={data.password} onChange={handleChange}></input>
            <button className="regist__save-button"  type="submit">Зарегистрироваться</button>
        </form>
        <p className="regist__text">Уже зарегистрированы? <Link to="/sing-in" className="regist__link">Войти</Link></p>
      </section>
    )
}

export default Register;