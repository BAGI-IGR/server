import './App.css';
import {Routes, Route} from "react-router-dom";
import axios from "axios";
import React from "react";
import Authorization from "./Authorization";
import Main from "./task/Main";
import Unlock from "./task/Unlock";
import Work from "./task/Work";
import Closed from "./task/Closed";
import Author from "./task/Author";
import Assignee from "./task/Assignee";
import Add from './task/Add'
import View from "./task/Task_View";
import Update from "./task/Task_Update";
import Archive from "./archive/archive";
import Archive_unlock from "./archive/archive_unlock";
import Archive_work from "./archive/archive_work";
import Archive_closed from "./archive/archive_closed";
import Archive_author from "./archive/archive_author";
import Archive_assignee from "./archive/archive_assignee";
import Profile from './Profile';
import Profile_Edit from "./Profile_Edit";
import Profile_all from "./Profile_all";
import Task_Calendar from "./Calendar";


let path_create
let update_page
let user_id = localStorage.getItem('user_id')
let Token = localStorage.getItem('Token')
let main
if (Token != null) {
    main = <Route path='/' element={<Main/>}/>
    path_create = <Route path='/task/create' element={<Add/>}/>
    update_page = <Route path="/task/update/:id" element={<Update/>}/>
} else {
    main = <Route path='/' element={<Authorization/>}/>
}
function App() {
    window.addEventListener('load', async function (event) {
        let Token = localStorage.getItem('Token')
        if (Token != null) {
            // if (document.getElementById('sidebar close') != null) {
            //    document.getElementById('sidebar close').style.display = "block";
            // }
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
            // document.getElementById('sidebar close').style.display = "none";
        }
    })
    return (
        <div>
            <div className="slider-main">
                <div className="up-footer">
                    <a className="home" href="http://localhost:3000/">
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.0404 0.458181C14.9092 0.313869 14.7493 0.198564 14.571 0.119661C14.3926 0.0407585 14.1998 0 14.0047 0C13.8097 0 13.6169 0.0407585 13.4385 0.119661C13.2602 0.198564 13.1003 0.313869 12.9691 0.458181L0.373406 14.453C0.187672 14.6533 0.0645933 14.9035 0.019342 15.1728C-0.0259092 15.4422 0.00864462 15.7189 0.118744 15.9688C0.228844 16.2188 0.409677 16.431 0.638954 16.5795C0.86823 16.7279 1.13593 16.806 1.40905 16.8041H4.2081V26.6005C4.2081 26.9717 4.35555 27.3276 4.61801 27.5901C4.88047 27.8526 5.23644 28 5.60762 28H22.4019C22.7731 28 23.129 27.8526 23.3915 27.5901C23.6539 27.3276 23.8014 26.9717 23.8014 26.6005V16.8041H26.6004C26.9716 16.8041 27.3276 16.6567 27.5901 16.3942C27.8525 16.1318 28 15.7758 28 15.4047C28.0026 15.053 27.8726 14.7132 27.6361 14.453L15.0404 0.458181Z" fill="#3D7186"/>
                        </svg>
                        <span className="text-list">Все задачи</span>
                    </a>
                    {/*<a className="list-of-employees">*/}
                    {/*    <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                    {/*        <path d="M26.6364 17.7505L26.4173 18.124L26.807 18.3129C31.9676 20.8137 33.5793 25.9431 33.7153 28.8499H31.2533C31.1987 28.1965 31.0076 26.8242 30.3413 25.3172C29.4251 23.2445 27.6058 20.9127 24.0308 19.8652L22.0486 19.2833L23.508 17.824C23.5081 17.8238 23.5083 17.8237 23.5084 17.8235C24.183 17.1532 24.6998 16.3409 25.0211 15.4458C25.3426 14.5505 25.4604 13.5949 25.3661 12.6483L25.3661 12.648C25.1727 10.7226 24.1116 8.9986 22.4008 7.75034L23.7555 5.70798C26.1143 7.391 27.5382 9.75611 27.8038 12.4029L27.8038 12.4032C27.992 14.2643 27.5832 16.1371 26.6364 17.7505Z" fill="#3D7186" stroke="black" stroke-width="0.8"/>*/}
                    {/*        <path d="M21.5375 13C21.5375 16.3638 18.8013 19.1 15.4375 19.1C12.0737 19.1 9.3375 16.3638 9.3375 13C9.3375 9.63616 12.0737 6.9 15.4375 6.9C18.8013 6.9 21.5375 9.63616 21.5375 13ZM19.0875 13C19.0875 10.9867 17.4508 9.35 15.4375 9.35C13.4242 9.35 11.7875 10.9867 11.7875 13C11.7875 15.0133 13.4242 16.65 15.4375 16.65C17.4508 16.65 19.0875 15.0133 19.0875 13ZM3.65 30.875C3.65 25.7188 7.84379 21.525 13 21.525H17.875C23.0312 21.525 27.225 25.7188 27.225 30.875V32.1H24.775V30.875C24.775 27.0693 21.6807 23.975 17.875 23.975H13C9.19434 23.975 6.1 27.0693 6.1 30.875V32.1H3.65V30.875Z" fill="#3D7186" stroke="black" stroke-width="0.8"/>*/}
                    {/*    </svg>*/}
                    {/*    <span className="text-list">Список сотрудников</span>*/}
                    {/*</a>*/}
                    <a className="archive" href="http://localhost:3000/archive">
                        <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M27.684 7.18922L27.6855 7.19065C27.7591 7.26374 27.8176 7.35074 27.8574 7.44658L28.3192 7.25483L27.8574 7.44659C27.8972 7.54243 27.9176 7.64523 27.9173 7.74902V7.75016V24.5418C27.9173 25.6904 26.9826 26.6252 25.834 26.6252H5.16732C4.01875 26.6252 3.08399 25.6904 3.08399 24.5418L3.08399 7.75016L3.08399 7.74944C3.08383 7.64553 3.10427 7.54263 3.14412 7.44667C3.18397 7.35071 3.24244 7.26359 3.31615 7.19036L3.31729 7.18922L7.191 3.31551L7.19149 3.31501C7.26477 3.24153 7.35185 3.18325 7.44771 3.14352C7.54358 3.10379 7.64636 3.08339 7.75014 3.0835H7.75065L23.2507 3.0835L23.2514 3.0835C23.3551 3.08335 23.4578 3.10371 23.5536 3.14342C23.6494 3.18313 23.7365 3.24139 23.8097 3.31487L23.8103 3.31551L27.684 7.18922ZM8.2854 4.66683H8.0783L7.93185 4.81328L6.64018 6.10494L5.78663 6.9585H6.99374H24.0076H25.2147L24.3611 6.10494L23.0695 4.81328L22.923 4.66683H22.7159H8.2854ZM15.1471 23.6037L15.5007 23.9573L15.8542 23.6037L22.3125 17.1454L23.1661 16.2918H21.959H18.584V12.9168V12.4168H18.084H12.9173H12.4173V12.9168V16.2918H9.04232H7.83521L8.68877 17.1454L15.1471 23.6037Z" fill="#3D7186" stroke="black"/>
                        </svg>
                        <span className="text-list">Архив</span>
                    </a>
                </div>

                <Routes>
                    <Route path="/authorization" element={<Authorization/>}/>
                    {main}
                    <Route path="/unlock" element={<Unlock/>}/>
                    <Route path="/work" element={<Work/>}/>
                    <Route path="/closed" element={<Closed/>}/>
                    <Route path="/author" element={<Author/>}/>
                    <Route path="/assignee" element={<Assignee/>}/>
                    {path_create}
                    <Route path="/task/:id" element={<View/>}/>
                    {update_page}
                    <Route path='/archive' element={<Archive/>}/>
                    <Route path='/archive/unlock' element={<Archive_unlock/>}/>
                    <Route path='/archive/work' element={<Archive_work/>}/>
                    <Route path='/archive/closed' element={<Archive_closed/>}/>
                    <Route path='/archive/author' element={<Archive_author/>}/>
                    <Route path='/archive/assignee' element={<Archive_assignee/>}/>
                    <Route path='/profile' element={<Profile/>}/>
                    <Route path='/profile/edit' element={<Profile_Edit/>}/>
                    <Route path='/profile/all' element={<Profile_all/>}/>
                    <Route path='/calendar' element={<Task_Calendar/>}/>
                </Routes>
            </div>
            <script src='./index.js'/>
        </div>
    );
};

export default App;
