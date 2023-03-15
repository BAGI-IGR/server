import './Main.css';
import React, {useEffect, useState} from "react";
import axios from "axios";
import {generatePath} from "react-router";


let user_id = localStorage.getItem('user_id')
function Closed() {
    const [tasks, SetTasks] = useState()
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
                SetTasks(res.data)
            })
            .catch(err => {
            })
    }, [])
    function sort(task){
        let sort_tasks = []
        for(let i in task){
            let assignee = task[i].assignee
            let author = task[i].author
            if(author == user_id) {
                sort_tasks.push(task[i])
            }
            if(assignee == user_id){
                sort_tasks.push(task[i])
            }
        }
        console.log({'сортированный массив':sort_tasks})
        return sort_tasks
    }
    sort(tasks);
    const handleChange = (e) => {
        window.location.replace(e.target.value)
    };
    return (
        <div>
            <div className="down-footer">
                <input className="search" type="text" placeholder="Поиск..."/>
                <select className="filter" name='status' onChange={handleChange}>
                    <option selected disabled>Статус</option>
                    <option value="https://server-njsy.vercel.app/unlock">Открыта</option>
                    <option value="https://server-njsy.vercel.app/work">В работе</option>
                    <option value="https://server-njsy.vercel.app/closed" disabled>Выполнена</option>
                </select>
                <select className="filter" onChange={handleChange}>
                    <option selected disabled value="Автор/исполнитель">Автор/исполнитель</option>
                    <option value="https://server-njsy.vercel.app/author">Автор</option>
                    <option value="https://server-njsy.vercel.app/assignee">Исполнитель</option>
                </select>
                <a className="filter" href="https://server-njsy.vercel.app/">Сбросить фильтр</a>
                <a className="profile" href="https://server-njsy.vercel.app/profile">
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.5 7.10526C7.5 11.0226 10.865 14.2105 15 14.2105C19.135 14.2105 22.5 11.0226 22.5 7.10526C22.5 3.1879 19.135 0 15 0C10.865 0 7.5 3.1879 7.5 7.10526ZM28.3333 30H30V28.4211C30 22.3279 24.765 17.3684 18.3333 17.3684H11.6667C5.23333 17.3684 0 22.3279 0 28.4211V30H28.3333Z" fill="#3D7186"/>
                    </svg>
                    Профиль
                </a>
            </div>
            <div className="location">Выполненые задачи</div>
            <div className="all-tasks-status" id="all-tasks-status">
                <div className="create-new-task">
                    <p className="createtask">Создать задачу</p>
                    <a className="plusik" href="https://server-njsy.vercel.app/task/create">
                        <span className="task-new">
                            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='#91A14D' width='24' height='24'>
                                <path d="M15 2.013H9V9H2v6h7v6.987h6V15h7V9h-7z"/>
                            </svg>
                        </span>
                    </a>
                </div>
                {sort(tasks).filter(object => (object.is_active != false && object.status == "Закрыта"))?.map((task) => (
                    <div className="task-status">
                        <div className="task-name">
                            <span key={task.id}>{task.title}</span>
                        </div>
                        <div className="title-task">
                            <span className="title-task-content" key={task.id}>{task.status}</span>
                        </div>
                        <div className="task-content">
                            {task.author == user_id && <span className="employee" key={task.id}>для {localStorage.getItem('users_' + (task.assignee - 1))}</span>}
                            {task.author != user_id && <span className="employee" key={task.id}>от {localStorage.getItem('users_' + (task.author - 1))}</span>}
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

export default Closed;
