import React from "react";
import axios from 'axios'
import './Authorization.css'
import logo from './logo.png'
class Authorization extends React.Component{


    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    changeHandler(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    submitForm(event) {
        event.preventDefault();
        console.log(this.state)
        axios
            .post('https://djandoreact.herokuapp.com/auth/token/login', {
                headers: {'Content-type': 'application/json'},
                'username': this.state.username,
                'password': this.state.password
            })
            .then(response => {
                this.setLogined(response.data.auth_token)
            })
            .catch(err => {
                console.error(err)
            })
    }

    setLogined(token) {
        localStorage.setItem('Token', token)
        const Token = localStorage.getItem('Token')
        console.log(Token);
        axios.get('https://djandoreact.herokuapp.com/auth/me/', {
            headers: {
                'Content-Type': 'application/json',
                // eslint-disable-next-line no-useless-concat
                'Authorization': 'Token' + ' ' + Token,
            }
        })
            .then(res => {
                console.log(res)
                console.log('ne oshibka')
                if (res.status === 200) {
                    console.log(res.status)
                    window.location.replace("https://server-njsy.vercel.app/");
                } else {
                    window.location.replace("https://server-njsy.vercel.app/");
                }
            })
            .catch(err => {
                console.log(err)
                console.log('oshibka')
            })
    }


    render() {

        return(
            <div className="main_">
                <div className="autorization-image"></div>
                <div className="login-form_main-container">
                    <div className="logo-image">
                        <img className="image" src={logo}/>
                    </div>
                    <div className="login--form__container">
                        <div className="login__form">
                            <span className="login__text">Авторизация</span>
                            <div className="login__password_sign-in--button">
                                <input className="login__input" name={'username'} id={'user_nexline_pass'} type="login" onChange={this.changeHandler} placeholder="Логин"/>
                                <input className="password__input" type="password" id={'password'} name={'password'} onChange={this.changeHandler} placeholder="Пароль"/>
                                <button className="sign-in--button" id={'submit_button_aut_user'} onClick={this.submitForm}>Войти</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Authorization;
