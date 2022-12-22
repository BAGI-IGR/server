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
    .get('http://robot0005.pythonanywhere.com/profile/', {
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
axios.get('http://robot0005.pythonanywhere.com/profile/retrieve/' + user_id, {
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
        }
    })
    .catch(err => {
        console.log("ne robotaet")
    })

const nexline = document.getElementById('user_nexline_pass');

nexline.addEventListener('keydown', function (e) {

    const subm = document.getElementById('password');

    if (e.keyCode === 13) {
        subm.focus();
    }
})


const password = document.getElementById('password');

password.addEventListener('keydown', function (e) {

    const subm = document.getElementById('submit_button_aut_user');

    if (e.keyCode === 13) {
        subm.click();
        console.log('succ');
    }
})
document.getElementById('submit_comment').addEventListener('keydown', function (e) {
    const subm = document.getElementById('fake_knopka');
    if (e.keyCode === 13) {
        subm.click();
        console.log('succ');
    }
})
const body = document.querySelector('body'),
    sidebar = body.querySelector('nav'),
    toggle = body.querySelector(".toggle"),
    searchBtn = body.querySelector(".search-box"),
    modeSwitch = body.querySelector(".toggle-switch"),
    modeText = body.querySelector(".mode-text");

let arrow = document.querySelectorAll(".arrow");
for (let i = 0; i < arrow.length; i++) {
    arrow[i].addEventListener("click", (e) => {
        let arrowParent = e.target.parentElement.parentElement;
        arrowParent.classList.toggle('showMenu')
    });
}

toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
})

searchBtn.addEventListener("click", () => {
    sidebar.classList.remove("close");
})

modeSwitch.addEventListener("click", () => {
    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
        modeText.innerText = "Светлая тема";
    } else {
        modeText.innerText = "Темная тема";
    }
});
window.addEventListener('load', async function (event) {
    let Token = localStorage.getItem('Token')
    console.log(Token);
    if (Token != null) {
        document.getElementById('sidebar close').style.display = "block";
        axios.get('http://robot0005.pythonanywhere.com/auth/me/', {
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
                    window.location.replace("https://server-njsy.vercel.app/");
                }
            })
            .catch(err => {
                console.log(err)
                console.log('oshibka')
            })
    } else {
        if (window.location.href !== window.location.href("https://server-njsy.vercel.app/")) {
            document.getElementById('sidebar close').style.display = "none";
            setTimeout(() => {
                window.location.replace("https://server-njsy.vercel.app/")
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
