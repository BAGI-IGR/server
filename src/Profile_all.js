import './Profile_all.css';
import {useEffect, useState} from "react";
import axios from "axios";
import {generatePath} from "react-router";


let user_id = localStorage.getItem('user_id')
let number_users = localStorage.getItem('number_users')
function Profile_all() {
    let Token = localStorage.getItem('Token')
    const [profiles, SetProfiles] = useState()
    axios
        .get('https://alabuga.pythonanywhere.com/profile/', {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Token ' + Token
            },
        })
        .then(res => {
            console.log(res.data)
            for (let i in res.data) {
                localStorage.setItem('users_' + i, res.data[i].fio)
                localStorage.setItem('number_users', i)
            }
            SetProfiles(res.data)
            localStorage.setItem('profile_all', JSON.stringify(res.data))
        })
        .catch(err => {
            console.log(err)
        })
    let profile_all = localStorage.getItem('profile_all')
    console.log(profile_all["user"])
    // for (let val of profile_all) {
    //     console.log(val)
    // }
    return (
        <div className="all-tasks-status" id="all-tasks-status">
            {profile_all.forEach((user, fio, val) => (
                <div className="task-status">
                    <div className="task-name">
                        <span key={user}>{fio}</span>
                    </div>
                    {/*<div className="title-task">*/}
                    {/*    <span className="title-task-content" key={profile.id}>{profile.status}</span>*/}
                    {/*</div>*/}
                    {/*<div className="task-content">*/}
                    {/*    {profile.author != user_id && <span className="employee" key={profile.id}>от {localStorage.getItem('users' + (profile.author - 1))}</span>}*/}
                    {/*    <span className="linedead" key={profile.id}>{task.deadline}</span>*/}
                    {/*</div>*/}
                    {/*<div className="edit-edit">*/}
                    {/*    <span className="edit-task" key={profile.id}>*/}
                    {/*        <a className="edit-content" href={generatePath("/task/:id/", {id: profile.id,})}>Подробнее</a>*/}
                    {/*    </span>*/}
                    {/*</div>*/}
                </div>
            ))}
        </div>
    );
}

export default Profile_all;
