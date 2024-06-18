import React from "react";
import axios from 'axios'
import './Authorization.css'


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
            .post('https://alabuga.pythonanywhere.com/auth/token/login', {
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
        axios.get('https://alabuga.pythonanywhere.com/auth/me/', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + Token,
            }
        })
            .then(res => {
                if (res.status === 200) {
                    console.log(res.status)
                    axios.get('https://alabuga.pythonanywhere.com/auth/me/', {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Token ' + Token,
                        }
                    })
                        .then(res => {
                            localStorage.setItem('user_id', res.data.user)
                            let user_id = localStorage.getItem('user_id')
                            console.log(user_id)
                            if (res.status === 401) {
                                window.location.replace("https://server-njsy.vercel.app/");
                            }
                        })
                        .catch(err => {
                            console.log(err)
                            console.log('oshibka')
                        })
                    window.location.replace("https://server-njsy.vercel.app/");
                }
            })
            .catch(err => {
                console.log(err)})
    }
    render() {
        return(
            <div className="main_">
                <div className="autorization-image"></div>
                <div className="login__form">
                    <h4 className="h3 login__text">Авторизация</h4>
                    <form>
                        <input className="login__input" name="username" id="user_nexline_pass" type="login" onChange={this.changeHandler} placeholder="Логин"/>
                        <input className="password__input" type="password" id="password" name="password" onChange={this.changeHandler} placeholder="Пароль"/>
                        <button className="sign-in--button" id="submit_button_aut_user" onClick={this.submitForm}>Войти</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Authorization;
