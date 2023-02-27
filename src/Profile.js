import './Profile.css'
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Save} from "./index";


function Profile() {
    window.addEventListener('load', async function (event) {
        let Token = localStorage.getItem('Token')
        console.log(Token);
        if (Token != null) {
            axios.get('https://robot0005.pythonanywhere.com/auth/me/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token' + ' ' + Token,
                }
            })
                .then(res => {
                    localStorage.setItem('user_id', res.data.user)
                    let user_id = localStorage.getItem('user_id')
                    console.log(user_id)
                    if (res.status === 401) {
                        window.location.replace("http://localhost:3000/authorization");
                    }
                })
                .catch(err => {
                    console.log(err)
                    console.log('oshibka')
                })
        } else {
            document.getElementById('sidebar close').style.display = "none";
            setTimeout(() => {
                window.location.replace("http://localhost:3000/authorization")
            }, 10000);
        }
    });
    let user_id = localStorage.getItem('user_id')
    const [profiles, SetProfile] = useState()
    let Token = localStorage.getItem('Token')
    useEffect(() => {
        axios.get('https://robot0005.pythonanywhere.com/profile/retrieve/' + user_id, {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Token' + ' ' + Token
            },
        })
            .then(res => {
                console.log(res)
                if (res.data != null) {
                    localStorage.setItem('fio', res.data.fio)
                    localStorage.setItem('avatar', res.data.avatar)
                    localStorage.setItem('email', res.data.email)
                    localStorage.setItem('number', res.data.work_phone_num)
                    localStorage.setItem('position', res.data.position)
                    SetProfile(res.data)
                }
            })
            .catch(err => {
                console.log("ne robotaet")
            })
    }, [])
    function ClearToken() {
        localStorage.clear()
        document.getElementById('sidebar close').style.display = "none";
        window.location.replace("http://localhost:3000/");

    }
    let fio = localStorage.getItem('fio')
    let avatar = localStorage.getItem('avatar')
    let email = localStorage.getItem('email')
    let number = localStorage.getItem('number')
    let position = localStorage.getItem('position')
    function Edit() {
        window.location.replace("http://localhost:3000/profile-edit");
    }
    function To_Main() {
        window.location.replace("http://localhost:3000/");
    }
    return (
        <div>
            {/*{profiles?.map(profile =>(*/}
            <div className="main">
                <div className="container">
                    <div className="container-ava">
                        {/*<img className="container-ava" src={require("./files/" + avatar.split('/')[6])}/>*/}
                        <img className="container-ava"/>
                    </div>
                    <div className="container__body-info">
                        <div className="container-info">
                            <div className="container-name">
                                <input className="input-fio" id={'input1'} type="full-name" name="full-name"
                                       placeholder="ФИО" value={fio}/>
                            </div>
                            <div className="phone_number">
                                <input className="input-number" id={'input2'} type="phone_number" name="phone_number"
                                       placeholder="Номер телефона" value={number}/>
                            </div>
                            <div className="container-email">
                                <input className="input-email" id={'input3'} type="email" name="_email"
                                       placeholder="Электронная почта" value={email}/>
                            </div>
                            <div className="container-status">
                                <input className="input-status" id={'input4'} type="status" name="_status"
                                       placeholder="Должность" value={position}/>
                            </div>
                        </div>
                        <div className="edit_save-button" id={"edit_save-button"}>
                            <button className="edit-button" onClick={To_Main}>На главную</button>
                            <button className="save-button" id={'edit_button'} onClick={Edit}>Редактировать</button>
                        </div>

                    </div>
                </div>
            </div>
            {/*))}*/}
            <footer className={"container_loggout"}>
                <div className="loggout">
                    <button className="loggout-button" onClick={ClearToken}>Выйти из аккаунта</button>
                </div>
            </footer>
        </div>
    )
}

export default Profile;
