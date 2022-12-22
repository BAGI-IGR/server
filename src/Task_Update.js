import './Task_Update.css';
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";

class Update extends React.Component {
    constructor() {
        let user_id = localStorage.getItem('user_id')
        let title = localStorage.getItem('title')
        let description = localStorage.getItem('description')
        let deadline = localStorage.getItem('deadline')
        let priority = localStorage.getItem('priority')
        let status = localStorage.getItem('status')
        let assignee = localStorage.getItem('assignee')
        super();
        this.state = {
            title: title,
            author: user_id,
            description: description,
            deadline: deadline,
            priority: priority,
            status: status,
            assignee: [assignee],
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.changeSelectedMultiple = this.changeSelectedMultiple.bind(this);
        this.submitForm = this.submitForm.bind(this);
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
    submitForm() {
        let loc = window.location.href.split('/')[4]
        console.log(this.state);
        let Token = localStorage.getItem('Token')
        console.log(Token)
        fetch('http://robot0005.pythonanywhere.com/task/update/' + loc, {
            method: "PUT",
            body: JSON.stringify(this.state),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Token' + ' ' + Token
            },
        })
            .then(response => {response.json()
                console.log(response.status)
                if(response.status === 200) {
                    document.getElementById('send').style.background = 'green';
                    setTimeout(() => {
                        window.location.replace('https://server-njsy.vercel.app/task-view/'+loc)
                    })
                } else{
                    document.getElementById('send').style.background = 'red';
                }
            })
            .then((data) => console.log(data))
            .catch(err => {
                console.log(err)
                console.log('oshibka')
            });
        let user_id = localStorage.getItem('user_id')
        this.setState = ({
            title: '',
            author: user_id,
            description: '',
            file: '',
            deadline: '',
            priority: '',
            status: '',
            assignee: [],
        });
    }
    render() {
        let created_at = localStorage.getItem('created_at')
        let author = localStorage.getItem('author')
        let comments = JSON.parse(localStorage.getItem('comments'))
        return (
            <div className="all">
                <div className="one">
                    <div className="task-name">
                        <span className="task-name__style"><input type="text" className="update_title" placeholder="Наименование задачи" name={'title'} value={this.state.title} onChange={this.changeHandler} /></span>
                    </div>
                    <div className="task-description">
                        <span className="task-name__style"><textarea type="text" className="update_description" placeholder={'Описание'} name={'description'} value={this.state.description} onChange={this.changeHandler} /></span>
                    </div>
                    <div className="edit">
                        <span className="save" id={'send'} onClick={() => this.submitForm()}>Сохранить</span>
                        <span className="back" onClick={() => window.location.replace('https://server-njsy.vercel.app/task-view/' + window.location.href.split('/')[4])}>.......Назад......</span>
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
                            <span className="task-name__style">Исполнитель:</span>
                            <select className="date" name={'assignee'} onChange={this.changeSelectedMultiple}>
                                <option selected disabled value={this.state.assignee}>{localStorage.getItem('users' + (this.state.assignee[0] - 1))}</option>
                                <option value={1}>{localStorage.getItem('users' + 0)}</option>
                                <option value={2}>{localStorage.getItem('users' + 1)}</option>
                                <option value={3}>{localStorage.getItem('users' + 2)}</option>
                                <option value={4}>{localStorage.getItem('users' + 3)}</option>
                            </select>
                        </div>
                        <div className="Author">
                            <span className="task-name__style">Автор:</span>
                            <select className="date" >
                                <option selected value={this.state.author} name={'author'}>{localStorage.getItem('users' + (author - 1))}</option>
                            </select></div>
                        <div className="Priority">
                            <span className="task-name__style">Приоритет:</span>
                            <select className="date" id="test_select" name={'priority'} onChange={this.changeHandler}>
                                <option selected disabled value={this.state.priority}>{this.state.priority}</option>
                                <option value={"Низкий"}>Низкий</option>
                                <option value={"Средний"}>Средний</option>
                                <option value={"Высокий"}>Высокий</option>
                            </select>

                        </div>
                        <div className="Priority">
                            <span className="task-name__style">Статус:</span>
                            <select className="date" id="test_select" name={'status'} onChange={this.changeHandler}>
                                <option selected disabled value={this.state.status}>{this.state.status}</option>
                                <option value={"Открыта"}>Открыта</option>
                                <option value={"В работе"}>В работе</option>
                                <option value={"Закрыта"}>Выполнена</option>
                            </select>

                        </div>
                        <div className="Created">
                            <span className="task-name__style">Создано:</span><input value={created_at} className="date" type="date" disabled />
                        </div>
                        <div className="dedline">
                            <span className="task-name__style">Дедлайн:</span><input name={'deadline'} className="date" type="date" value={this.state.deadline} onChange={this.changeHandler} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Update;
