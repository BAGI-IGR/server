import '../task/Main.css';
import React, {useEffect, useState} from "react";
import axios from "axios";
import {generatePath} from "react-router";


let user_id = localStorage.getItem('user_id')
function Archive_assignee() {
    let [archiveAssignee, SetArchiveAssignee] = useState()
    let Token = localStorage.getItem('Token')
    useEffect(() => {
        axios
            .get('https://robot0005.pythonanywhere.com/tasks/?format=json', {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Authorization': 'Token ' + Token
                },
            })
            .then(res => {
                SetArchiveAssignee(res.data)
            })
            .catch(err => {
            })
    }, [])
    function archive_assignee(task){
        let archive_assignee_tasks = []
        for(let i in task){
            let assignee = task[i].assignee
            if(assignee == user_id) {
                archive_assignee_tasks.push(task[i])
            }
        }
        return archive_assignee_tasks
    }
    archive_assignee(archiveAssignee);
    const handleChange = (e) => {
        window.location.replace(e.target.value)
    };
    return (
        <div>
            <div className="down-footer">
                <input className="search" type="text" placeholder="Поиск..."/>
                <select className="filter" name='status' onChange={handleChange}>
                    <option selected disabled>Статус</option>
                    <option value="https://server-njsy.vercel.app/archive/unlock">Открыта</option>
                    <option value="https://server-njsy.vercel.app/archive/work">В работе</option>
                    <option value="https://server-njsy.vercel.app/archive/closed">Выполнена</option>
                </select>
                <select className="filter" onChange={handleChange}>
                    <option selected disabled value="Автор/исполнитель">Автор/исполнитель</option>
                    <option value="https://server-njsy.vercel.app/archive/author">Автор</option>
                    <option value="https://server-njsy.vercel.app/archive/assignee" disabled>Исполнитель</option>
                </select>
                <a className="filter" href="https://server-njsy.vercel.app/archive/">Сбросить фильтр</a>
                <a className="profile" href="https://server-njsy.vercel.app/profile">
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.5 7.10526C7.5 11.0226 10.865 14.2105 15 14.2105C19.135 14.2105 22.5 11.0226 22.5 7.10526C22.5 3.1879 19.135 0 15 0C10.865 0 7.5 3.1879 7.5 7.10526ZM28.3333 30H30V28.4211C30 22.3279 24.765 17.3684 18.3333 17.3684H11.6667C5.23333 17.3684 0 22.3279 0 28.4211V30H28.3333Z" fill="#3D7186"/>
                    </svg>
                    Профиль
                </a>
            </div>
            <div className="location">Архивные задачи исполнителя</div>
            <div className="all-tasks-status" id="all-tasks-status">
                {archive_assignee(archiveAssignee)?.filter(object => object.is_active == false).map((task) => (
                    <div className="task-status">
                        <div className="task-name">
                            <span key={task.id}>{task.title}</span>
                        </div>
                        <div className="title-task">
                            <span className="title-task-content" key={task.id}>{task.status}</span>
                        </div>
                        <div className="task-content">
                            <span className="employee" key={task.id}>для {localStorage.getItem('users_' + (task.assignee - 1))}</span>
                            <span className="linedead" key={task.id}>{task.deadline}</span>
                        </div>
                        <div className="edit-edit">
                            <span className="edit-task" key={task.id}>
                                <a className="edit-content" href={generatePath("/task/:id/", {id: task.id,})}>Подробнее</a>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Archive_assignee;
