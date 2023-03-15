import './Main.css';
import React, {useEffect, useState} from "react";
import axios from "axios";
import {generatePath} from "react-router";
import {Delete} from "../functions";


let user_id = localStorage.getItem('user_id')
function Author() {
    const [authors, SetAuthors] = useState()
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
                SetAuthors(res.data)
            })
            .catch(err => {
            })
    }, [])
    function author(task){
        let author_tasks = []
        for(let i in task){
            let author = task[i].author
            if(author == user_id) {
                author_tasks.push(task[i])
            }
        }
        return author_tasks
    }
    author(authors);
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
                    <option value="https://server-njsy.vercel.app/closed">Выполнена</option>
                </select>
                <select className="filter" onChange={handleChange}>
                    <option selected disabled value="Автор/исполнитель">Автор/исполнитель</option>
                    <option value="https://server-njsy.vercel.app/author" disabled>Автор</option>
                    <option value="https://server-njsy.vercel.app/assignee">Исполнитель</option>
                </select>
                <a className="filter" href="https://server-njsy.vercel.app/">Сбросить фильтр</a>
                <a className="profile" href="https://server-njsy.vercel.app/profile">
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M7.5 7.10526C7.5 11.0226 10.865 14.2105 15 14.2105C19.135 14.2105 22.5 11.0226 22.5 7.10526C22.5 3.1879 19.135 0 15 0C10.865 0 7.5 3.1879 7.5 7.10526ZM28.3333 30H30V28.4211C30 22.3279 24.765 17.3684 18.3333 17.3684H11.6667C5.23333 17.3684 0 22.3279 0 28.4211V30H28.3333Z"
                            fill="#3D7186"/>
                    </svg>
                    Профиль
                </a>
            </div>
            <div className="location">Задачи автора</div>
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
                {author(authors).filter(object => object.is_active != false)?.map((task) => (
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
                            <a className="delete-task" id='delete' key="task.id" href="https://server-njsy.vercel.app/archive/my" onClick={() => Delete(task.id)}>
                                <svg id={'flag'} width="21" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.3375 0.829219C6.59062 0.321 7.11094 0 7.67813 0H13.3219C13.8891 0 14.4094 0.321 14.6625 0.829219L15 1.5H19.5C20.3297 1.5 21 2.17172 21 3C21 3.82828 20.3297 4.5 19.5 4.5H1.5C0.671719 4.5 0 3.82828 0 3C0 2.17172 0.671719 1.5 1.5 1.5H6L6.3375 0.829219ZM1.45781 6H19.5V21C19.5 22.6547 18.1547 24 16.5 24H4.45781C2.84297 24 1.45781 22.6547 1.45781 21V6ZM5.20781 9.75V20.25C5.20781 20.6625 5.5875 21 5.95781 21C6.4125 21 6.70781 20.6625 6.70781 20.25V9.75C6.70781 9.3375 6.4125 9 5.95781 9C5.5875 9 5.20781 9.3375 5.20781 9.75ZM9.70781 9.75V20.25C9.70781 20.6625 10.0875 21 10.4578 21C10.9125 21 11.25 20.6625 11.25 20.25V9.75C11.25 9.3375 10.9125 9 10.4578 9C10.0875 9 9.70781 9.3375 9.70781 9.75ZM14.25 9.75V20.25C14.25 20.6625 14.5875 21 15 21C15.4125 21 15.75 20.6625 15.75 20.25V9.75C15.75 9.3375 15.4125 9 15 9C14.5875 9 14.25 9.3375 14.25 9.75Z" fill="white"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Author;
