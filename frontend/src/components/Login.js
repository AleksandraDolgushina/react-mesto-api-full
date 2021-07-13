import React from 'react'

const Login = ({handleLogin}) => {
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
    handleLogin(data)
  }
  
  return (
    <section className="regist">
      <form className="regist__form" name="login" onSubmit={handleSubmit} noValidate>
          <h2 className="regist__title">Вход</h2>
            <input className="regist__item" type="email" name="email" placeholder="Email" value={data.email} onChange={handleChange}></input>  
            <input className="regist__item" type="password" name="password" placeholder="Пароль" value={data.password} onChange={handleChange}></input>
          <button className="regist__save-button" type="submit">Войти</button>
      </form>
    </section>
  )
}

export default Login;