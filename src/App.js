import './App.css';
import logo from './logo.png'
import Add from './Add'
import Profile from './Profile';
import Authorization from "./Authorization";
import Main from "./Main";
import {Routes, Route, Link, Navigate} from "react-router-dom";
import Update from "./Task_Update";
import Profile_Edit from "./Profile_Edit";
import View from "./Task_View";
import axios from "axios";
import Archive from "./archive";
import Task_Calendar, {Calendar} from "./Calendar";
import {useEffect} from "react";


let path_create
let create_page
let user_id = localStorage.getItem('user_id')
if (user_id !== '2') {
    path_create = <Route path={'/task-create'} element={<Add/>}/>
    // create_page = <div className={'knopka'}>
    //     <li className={'nav-link'}  onClick={() => window.location.replace('/task-create')}>
    //         <a >
    //             <i className={'bx bx-add-to-queue icon'}/>
    //             <span className={'text nav-text'}>Создать задачу</span>
    //         </a>
    //     </li>
    // </div>
} else {
    console.log('you are not    manager')
}
let Token = localStorage.getItem('Token')
let main
if (Token != null) {
    main = <Route path={'/'} element={<Main/>}/>
} else {
    main = <Route path={'/'} element={<Authorization/>}/>
}
function App() {
    window.addEventListener('load', async function (event) {
        let Token = localStorage.getItem('Token')
        console.log(Token);
        if (Token != null) {
            if (document.getElementById('sidebar close') != null) {
               document.getElementById('sidebar close').style.display = "block";
            }
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
                        window.location.replace("https://server-njsy.vercel.app/");
                    }
                })
                .catch(err => {
                    console.log(err)
                    console.log('oshibka')
                })
        } else {
            document.getElementById('sidebar close').style.display = "none";
        }
    })
    return (
        <div>
            <div className={"slider-main"}>
                {/*<nav id={'sidebar close'} className={'sidebar close'}>*/}
                {/*    <header>*/}
                {/*        <div className={'image-text'}>*/}
                {/*    <span className={'image'}>*/}
                {/*       <a href={"/"}><img src={logo} alt={'logo'}></img></a>*/}
                {/*    </span>*/}
                {/*        </div>*/}
                {/*    </header>*/}
                {/*    <div className={'menu-bar'}>*/}
                {/*        <div className={'menu'}>*/}
                {/*            <ul className={'menu-links'}>*/}
                {/*                <li className={'nav-link MAIN'}  onClick={() => window.location.replace('/')}>*/}
                {/*                    <a>*/}
                {/*                        <i className={'bx bx-receipt icon'}/>*/}
                {/*                        <span className={'text nav-text'}>Задачи</span>*/}
                {/*                    </a>*/}
                {/*                    <i className={'bx bxs-chevron-down arrow'}/>*/}
                {/*                </li>*/}
                {/*                {create_page}*/}
                {/*                <li className={'nav-link MAIN'} onClick={() => window.location.replace('/calendar')}>*/}
                {/*                    <a>*/}
                {/*                        <i className='bx bx-calendar icon'></i>*/}
                {/*                        <span className={'text nav-text'}>Календарь</span>*/}
                {/*                    </a>*/}
                {/*                    <i className={'bx bxs-chevron-down arrow'}/>*/}
                {/*                </li>*/}
                {/*            </ul>*/}
                {/*        </div>*/}
                {/*        <div className={'bottom-content'}>*/}
                {/*            <ul className={'menu-links'}>*/}
                {/*                <div className={'arhive-button'}>*/}
                {/*                    <li className={''} onClick={() => window.location.replace('/archive')}>*/}
                {/*                        /!* eslint-disable-next-line jsx-a11y/anchor-is-valid *!/*/}
                {/*                        <a >*/}
                {/*                            <i className={'bx icon'}>*/}
                {/*                                <svg width="42" height="42" viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg">*/}
                {/*                                    <path d="M37.9855 9.261L32.7373 4.01275C32.575 3.84993 32.3822 3.7208 32.1698 3.6328C31.9575 3.5448 31.7299 3.49967 31.5 3.5H10.5C10.2702 3.49967 10.0425 3.5448 9.83017 3.6328C9.61783 3.7208 9.42499 3.84993 9.26276 4.01275L4.0145 9.261C3.851 9.42318 3.72132 9.61622 3.633 9.82891C3.54468 10.0416 3.49948 10.2697 3.5 10.5V33.25C3.5 35.1803 5.06975 36.75 7 36.75H35C36.9303 36.75 38.5 35.1803 38.5 33.25V10.5C38.5005 10.2697 38.4553 10.0416 38.367 9.82891C38.2787 9.61622 38.149 9.42318 37.9855 9.261ZM11.2245 7H30.7755L32.5255 8.75H9.4745L11.2245 7ZM7 33.25V12.25H35L35.0035 33.25H7Z" fill="black"/>*/}
                {/*                                    <path d="M24.5 15.75H17.5V21H12.25L21 29.75L29.75 21H24.5V15.75Z" fill="black"/>*/}
                {/*                                </svg>*/}
                {/*                            </i>*/}
                {/*                        </a>*/}
                {/*                    </li>*/}
                {/*                </div>*/}
                {/*                <div className={'profile-button'}>*/}
                {/*                    <li className={''} onClick={() => window.location.replace('/profile')}>*/}
                {/*                        <a >*/}
                {/*                            <i className={'bx bx-user icon'}></i>*/}
                {/*                            <span className={'text nav-text'}>Профиль</span>*/}
                {/*                        </a>*/}
                {/*                    </li>*/}
                {/*                </div>*/}
                {/*                <li className={'mode'}>*/}
                {/*                    <div className={'sun-moon'}>*/}
                {/*                        <i className={'bx bx-moon icon moon'}/>*/}
                {/*                        <i className={'bx bx-sun icon sun'}/>*/}
                {/*                    </div>*/}
                {/*                    <span className={'mode-text text'}>Темная тема</span>*/}
                {/*                    <div className={'toggle-switch'}>*/}
                {/*                        <span className={'switch'}/>*/}
                {/*                    </div>*/}
                {/*                </li>*/}
                {/*            </ul>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div className={'vl'}/>*/}
                {/*</nav>*/}
                <Routes>
                    {main}
                    {path_create}
                    {user_id !== 0 &&<Route path={"/task-update/:id"} element={<Update/>}/>}
                    <Route path={"/a"} element={<Authorization/>}/>
                    <Route path={"/task-view/:id"} element={<View/>}/>
                    <Route path={'/profile'} element={<Profile/>}/>
                    <Route path={'/profile-edit'} element={<Profile_Edit/>}/>
                    <Route path={'/archive'} element={<Archive/>}/>
                    <Route path={'/calendar'} element={<Task_Calendar/>}/>
                </Routes>
            </div>
            <script src={'./index.js'}/>
        </div>
    );
};

export default App;
