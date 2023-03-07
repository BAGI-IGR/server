import './App.css';
import Add from './Add'
import Profile from './Profile';
import Authorization from "./Authorization";
import Main from "./Main";
import {Routes, Route} from "react-router-dom";
import Update from "./Task_Update";
import Profile_Edit from "./Profile_Edit";
import View from "./Task_View";
import axios from "axios";
import Archive from "./archive";
import Task_Calendar from "./Calendar";
import Archive_my from "./archive_my";
import Archive_anmy from "./archive_anmy";


let path_create
let create_page
let user_id = localStorage.getItem('user_id')
let Token = localStorage.getItem('Token')
let main
if (Token != null) {
    main = <Route path='/' element={<Main/>}/>
    path_create = <Route path='/task-create' element={<Add/>}/>
    create_page = <Route path="/task/update/:id" element={<Update/>}/>
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
                        window.location.replace("https://server-njsy.vercel.app/");
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
                <Routes>
                    {main}
                    {path_create}
                    {create_page}
                    <Route path="/authorization" element={<Authorization/>}/>
                    <Route path="/task/:id" element={<View/>}/>
                    <Route path='/profile' element={<Profile/>}/>
                    <Route path='/profile/edit' element={<Profile_Edit/>}/>
                    <Route path='/archive' element={<Archive/>}/>
                    <Route path='/archive/my' element={<Archive_my/>}/>
                    <Route path='/archive/anmy' element={<Archive_anmy/>}/>
                    <Route path='/calendar' element={<Task_Calendar/>}/>
                </Routes>
            </div>
            <script src='./index.js'/>
        </div>
    );
};

export default App;
