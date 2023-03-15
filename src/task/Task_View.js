import React from "react";
import axios from 'axios'
import './Task_View.css';
import {generatePath} from "react-router";
import {logDOM} from "@testing-library/react";

export default function View() {
    let loc = window.location.href.split('/')[4]
    let Token = localStorage.getItem('Token')
    axios.get('https://robot0005.pythonanywhere.com/task/retrieve/' + loc, {
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Token ' + Token
        },
    })
        .then(res => {
            localStorage.setItem('author', res.data.author)
            localStorage.setItem('assignee', res.data.assignee)
            localStorage.setItem('title', res.data.title)
            localStorage.setItem('description', res.data.description)
            localStorage.setItem('deadline', res.data.deadline)
            localStorage.setItem('progress', res.data.progress)
            localStorage.setItem('weight', res.data.weight)
            localStorage.setItem('belongs', res.data.belongs)
            localStorage.setItem('status', res.data.status)
            localStorage.setItem('priority', res.data.priority)
            localStorage.setItem('id', res.data.id)
            localStorage.setItem('comments', JSON.stringify(res.data.comments))
        })
        .catch(err => {
            console.log(err)
        })
    let user_id = localStorage.getItem('user_id')
    let author = localStorage.getItem('author')
    let assignee = localStorage.getItem('assignee')
    let title = localStorage.getItem('title')
    let description = localStorage.getItem('description')
    let deadline = localStorage.getItem('deadline')
    let progress = localStorage.getItem('progress')
    let weight = localStorage.getItem('weight')
    let belongs = localStorage.getItem('belongs')
    let status = localStorage.getItem('status')
    let priority = localStorage.getItem('priority')
    let id = localStorage.getItem('id')
    function Comment(event){
        let state = {
            task: id,
            author: author,
            text: event.target.text.value,
        }
        console.log(state.text)
        fetch('https://robot0005.pythonanywhere.com/comment/create', {
            method: "POST",
            body: JSON.stringify(state),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Token ' + Token
            },
        }).then(res=>console.log(res))
            .catch(err => console.log(err))
        setTimeout(() => {
            window.location.replace('http://localhost:3000/task/'+loc)
        },1000)
    }
    let comments = JSON.parse(localStorage.getItem('comments'))
    window.onload = function() {
        if (!window.location.hash) {
            window.location = window.location + '#';
            setTimeout(() => {
                window.location.reload();
            },1000)
            setTimeout(() => {
                window.location.reload();
            },1000)
        }
    }
    return (
        <div className="modal-box" id="modal-box-id">
            <div className="top-panel">
                <span className="task-title">Просмотр задачи</span>
                <a className="cancel" href="http://localhost:3000">
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="30" height="30" rx="8" fill="#9E0000"/>
                        <path d="M20.4834 17.9887C20.9642 18.4695 20.9642 19.249 20.4834 19.7298C20.0026 20.2106 19.2231 20.2106 18.7423 19.7298L9.87681 10.8643C9.39602 10.3835 9.39602 9.60398 9.87681 9.12319C10.3576 8.6424 11.1371 8.6424 11.6179 9.12319L20.4834 17.9887ZM20.3086 9.30861C20.8516 9.85155 20.8516 10.7318 20.3086 11.2748L11.6682 19.9152C11.1252 20.4582 10.245 20.4582 9.70201 19.9152C9.15908 19.3723 9.15908 18.492 9.70201 17.9491L18.3425 9.30862C18.8854 8.76568 19.7657 8.76568 20.3086 9.30861Z" fill="white"/>
                    </svg>
                </a>
            </div>
            <div className="down-panel">
                <div className="left-panel">
                    <div className="status-work">
                        <div className="status">
                            <span className="status-name">{status}</span>
                        </div>
                        <div className="dedline">
                            <input className="view-deadline" name="deadline" type="date" value={deadline}/>
                        </div>
                    </div>
                    <div className="all-information">
                        <div className="block-title">
                            <div className="name-title-view">{title}</div>
                        </div>
                        <div className="block-description">
                            <div className="name_description-view">{description}</div>
                        </div>
                        <div className="block-author">
                            <span className="name-author">Автор:</span>
                            <span className="choice-author">{localStorage.getItem('users_' + (author - 1))}</span>
                        </div>
                        <div className="block-executor">
                            <span className="name-executor">Исполнитель:</span>
                            <span className="view-executor">
                                {localStorage.getItem('users_' + (assignee[0] - 1))}
                            </span>
                        </div>
                        <div className="block-file">
                            <span className="name-file">Вложенные файлы</span>
                            {/*<input className="file" name="file" onChange={this.changeSelectedMultiple} type="file"*/}
                            {/*       ref={this.fileInput} id="input__file"/>*/}
                        </div>
                        <div className="buttony">
                            {user_id == author &&
                                <a className="update" href={generatePath("/task/update/:id/", {id: localStorage.getItem('id')})}>
                                    <p className="update-text">Редактировать</p>
                                </a>
                            }
                        </div>
                    </div>
                </div>
                <div className="chat">
                    <div className="chat-area">
                        {comments.map(comment => (
                            <span className="chat-view">
                                <span className="chat-avatar"/>
                                <span className="chat-cloud">
                                    <p className="chat-name">{localStorage.getItem('users_' + ((comment.author) - 1))}</p>
                                    <p className="chat-text">{comment.text}</p>
                                </span>
                            </span>
                        ))}
                    </div>
                    <div className="chat-menu">
                        <form id="submit_comment" onSubmit={Comment}>
                            <input className="chat-message" type="text" name="text" placeholder="Введите ваше сообщение..."/>
                            {/*<button className="fake_knopka" type="text" name="text" id="fake_knopka" onClick={() => this.Comment()}>*/}
                            {/*    <p className="otpravit">Отправить</p>*/}
                            {/*</button>*/}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
