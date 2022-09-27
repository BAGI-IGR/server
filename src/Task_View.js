import React from "react";
import axios from 'axios'
import './Task_View.css';
import {generatePath} from "react-router";
import {logDOM} from "@testing-library/react";

export default function View() {
    let loc = window.location.href.split('/')[4]
    console.log(loc)
    let Token = localStorage.getItem('Token')
    axios.get('https://djandoreact.herokuapp.com/task/retrieve/' + loc, {
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            // eslint-disable-next-line no-useless-concat
            'Authorization': 'Token' + ' ' + Token
        },
    })
        .then(res => {
            console.log(res)
            localStorage.setItem('author', res.data.author)
            localStorage.setItem('author', res.data.author)
            localStorage.setItem('id', res.data.id)
            localStorage.setItem('created_at', res.data.created_at)
            localStorage.setItem('deadline', res.data.deadline)
            localStorage.setItem('description', res.data.description)
            localStorage.setItem('priority', res.data.priority)
            localStorage.setItem('status', res.data.status)
            localStorage.setItem('title', res.data.title)
            localStorage.setItem('comments', JSON.stringify(res.data.comments))
            localStorage.setItem('assignee', res.data.assignee)

        })
        .catch(err => {
            console.log(err)
        })
    let author = localStorage.getItem('author')
    let deadline = localStorage.getItem('deadline')
    let created_at = localStorage.getItem('created_at')
    let description = localStorage.getItem('description')
    let id = localStorage.getItem('id')
    let priority = localStorage.getItem('priority')
    let status = localStorage.getItem('status')
    let title = localStorage.getItem('title')
    let assignee = localStorage.getItem('assignee')
    function Comment(event){

        let state = {
            task: id,
            author: author,
            text: event.target.text.value,
        }
        console.log(state.text)
        fetch('https://djandoreact.herokuapp.com/comment/create', {
            method: "POST",
            body: JSON.stringify(state),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Token' + ' ' + Token
            },
        }).then(res=>console.log(res))
            .catch(err => console.log(err))
    }
    let comments = JSON.parse(localStorage.getItem('comments'))
    return (
        <div className="all">
            <div className="one">
                <div className="task-name">
                    <span className="task-name__style">{title}</span>
                </div>
                <div className="task-description">
                    <span className="task-name__style">{description}</span>
                </div>
                <div className="edit">
                    {status != 'Закрыта' && <a href={generatePath("/task-update/:id/", {id: localStorage.getItem('id')})}><span className="task-name__style">Редактировать</span></a>}
                </div>
                <div className="comment">
                    <div>
                        <form id={'submit_comment'} onSubmit={Comment}>
                            <input type="text" className="task_1" name={'text'}  placeholder="Введите комментарий"/>
                            <button id={'fake_knopka'} className={'fake_knopka'}/>
                        </form>
                    </div>
                    <div className={'chat'}>
                        {comments.map(comment => (
                        <div className="task_1">
                            {comment.text}
                        </div>
                        ))}
                    </div>
                </div>
            </div>
            <div сlassName="all_2">
                <div className="three">
                    <div className="Intelligence">
                        <span className="task-name__style">Сведения</span>
                    </div>
                    <div className="Executor">
                        <span className="task-name__style">Исполнитель: {localStorage.getItem('users' + (assignee[0] - 1))}</span>
                    </div>
                    <div className="Author">
                        <span className="task-name__style">Автор: {localStorage.getItem('users' + (author - 1))}</span>
                        </div>
                    <div className="Priority">
                        <span className="task-name__style">Приоритет:   {priority}</span>
                    </div>
                    <div className="Created">
                        <span className="task-name__style">Создано:</span><input className="date" value={created_at} type="date"/>
                    </div>
                    <div className="dedline">
                        <span className="task-name__style">Дедлайн:</span><input className="date" value={deadline} type="date"/>
                    </div>
                </div>
            </div>
        </div>
    )
}
