import React from "react";
// import axios from 'axios'
import './Add.css';
// import {today} from "react-big-calendar/lib/utils/dates";


class Add extends React.Component {
    constructor() {
        let user_id = localStorage.getItem('user_id')
        super();
        this.state = {
            author: user_id,
            assignee: [],
            title: '',
            description: '',
            deadline: '',
            progress: '0',
            weight: '0',
            belongs: 'Задача',
            status: 'Открыта',
            priority: '',
            file: '',
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.changeSelectedMultiple = this.changeSelectedMultiple.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }
    changeSelectedMultiple(e) {
        const options = e.target.options;
        const selectedValues = [];
        for (let i = 0; i < options.length; i++) {
            console.log(selectedValues);
            if (options[i].selected) {
                selectedValues.push(options[i].value);
            }
        }
        console.log(selectedValues);
        this.setState({
            [e.target.name]: selectedValues
        });
    }
    changeHandler(event) {
        if (event.target.type === 'select-multiple') {
            this.changeSelectedMultiple(event);
            return;
        }
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    submitForm() {
        this.state.file = null
        console.log(this.state);
        let Token = localStorage.getItem('Token')
        console.log(Token)
        fetch('https://robot0005.pythonanywhere.com/task/create/', {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Token ' + Token
            },
        })
            .then(response => {response.json()
                console.log(response.status)
                if(response.status === 201) {
                    document.getElementById('send').style.background = 'green';
                    window.location.replace("https://server-njsy.vercel.app");
                } else{
                    document.getElementById('send').style.background = 'red';
                    window.location.reload();
                }
            })
            .then((data) => {
                console.log(data)
            })
            .catch(err => {
                console.log(err)
                console.log('oshibka')
            });
        let user_id = localStorage.getItem('user_id')
        this.setState = ({
            author: user_id,
            assignee: [],
            title: '',
            description: '',
            deadline: '',
            progress: '',
            weight: '',
            belongs: '',
            status: '',
            priority: '',
            file: '',
        });
    }
    render() {
        return (
            <div className="modal-box" id="modal-box-id">
                <div className="top-panel">
                    <span className="task-title">Создание задачи</span>
                    <a className="cancel" href="https://server-njsy.vercel.app">
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
                                <span className="status-name">Статус</span>
                            </div>
                            <div className="dedline">
                                <input className="deadline" name="deadline" type="date" value={this.state.deadline} onChange={this.changeHandler} placeholder="Дедлайн"/>
                            </div>
                        </div>
                        <div className="all-information">
                            <div className="block-title">
                                <input className="name-title" name="title" onChange={this.changeHandler} placeholder="Наименование задачи"/>
                            </div>
                            <div className="block-description">
                                <input class="name_description" placeholder="Описание задачи" name="description"
                                       value={this.state.description} onChange={this.changeHandler} />
                            </div>
                            <div className="block-executor">
                                <span className="name-executor">Исполнитель:</span>
                                <select className="choice-executor" name="assignee" onChange={this.changeSelectedMultiple}>
                                    <option value={0} selected disabled>Исполнитель</option>
                                    <option value={1}>{localStorage.getItem('users' + 0)}</option>
                                    <option value={2}>{localStorage.getItem('users' + 1)}</option>
                                    <option value={3}>{localStorage.getItem('users' + 2)}</option>
                                </select>
                                <span>
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="40" height="40" rx="6" fill="#91A14D"/>
                                        <path d="M29.1123 17.2217C30.1548 17.2217 31 18.0669 31 19.1094V19.1094C31 20.152 30.1548 20.9972 29.1123 20.9972H9.88774C8.84517 20.9972 8 20.152 8 19.1094V19.1094C8 18.0669 8.84517 17.2217 9.88774 17.2217H29.1123ZM19.5115 8C20.6889 8 21.6433 8.95442 21.6433 10.1318V28.8682C21.6433 30.0456 20.6889 31 19.5115 31V31C18.3342 31 17.3798 30.0456 17.3798 28.8682V10.1318C17.3798 8.95442 18.3342 8 19.5115 8V8Z" fill="white"/>
                                    </svg>
                                </span>
                            </div>
                            <div className="block-author">
                                <span className="name-author">Автор:</span>
                                <span className="choice-author">Вы</span>
                            </div>
                            <div className="block-file">
                                <span className="name-file">Вложенные файлы</span>
                                <input className="file" name="file" onChange={this.changeSelectedMultiple} type="file" ref={this.fileInput} id="input__file"/>
                            </div>
                            <div className="buttony">
                                <button className="send" type="submit" id="send" onClick={this.submitForm} placeholder="Создать">Создать</button>
                                <a className="cancel" href="https://server-njsy.vercel.app"><p className="cancel-text">Отменить</p></a>
                            </div>
                        </div>
                    </div>
                    <div className="chat">
                        <div className="chat-area"/>
                        <div className="chat-menu">
                            <form>
                                <input className="chat-message" placeholder="Создайте задачу, чтобы писать в чат..." disabled/>
                                <button className="fake_knopka" disabled>
                                    <p className="otpravit">Отправить</p>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Add;
