import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import axios from "axios";


ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
let Token = localStorage.getItem('Token')
axios
    .get('https://robot0005.pythonanywhere.com/profile/', {
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Token' + ' ' + Token
        },
    })
    .then(res => {
        console.log(res.data)
        for (let i in res.data) {
            localStorage.setItem('users' + i, res.data[i].fio)
            localStorage.setItem('number_users', i)
        }
    })
    .catch(err => {
        console.log(err)
    })
let user_id = localStorage.getItem('user_id')
console.log('мой ' + user_id)
axios.get('https://robot0005.pythonanywhere.com/profile/retrieve/' + user_id, {
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': 'Token ' + Token
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
        }
    })
    .catch(err => {
        console.log("ne robotaet")
    })

window.addEventListener('load', async function (event) {
    let Token = localStorage.getItem('Token')
    console.log(Token);
    if (Token != null) {
        axios.get('https://robot0005.pythonanywhere.com/auth/me/', {
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
                    window.location.replace("http://localhost:3000/");
                }
            })
            .catch(err => {
                console.log(err)
                console.log('oshibka')
            })
    } else {
        if (window.location.href !== window.location.href("http://localhost:3000/")) {
            document.getElementById('sidebar close').style.display = "none";
            setTimeout(() => {
                window.location.replace("http://localhost:3000/")
            }, 30000);
        } else {
            document.getElementById('sidebar close').style.display = "none";
        }
    }
});
// class giveaway_list_with_people {
//     constructor() {
//         for (let i = localStorage.getItem('number_users'); i !== '0'; i--) {
//             let x = 0
//             // eslint-disable-next-line no-unused-vars
//             x++
//             let y = -1
//             // eslint-disable-next-line no-unused-vars
//             y++
//             return '<option value={x}>{localStorage.getItem(\'users\' + [y])}</option>'
//         }
//     }
// }
reportWebVitals();
