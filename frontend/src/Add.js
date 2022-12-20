import React from "react";
import axios from 'axios'
import './Add.css';
import {today} from "react-big-calendar/lib/utils/dates";

class Add extends React.Component {
    constructor() {
        let user_id = localStorage.getItem('user_id')
        super();
        this.state = {
            title: '',
            author: user_id,
            description: '',
            file: '',
            deadline: '',
            priority: '',
            assignee: [],
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
        fetch('http://127.0.0.1:8000/task/create/', {
        // fetch('https://djandoreact.herokuapp.com/task/create/', {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                // eslint-disable-next-line no-useless-concat
                'Authorization': 'Token' + ' ' + Token
            },
        })
            .then(response => {response.json()
                console.log(response.status)
                if(response.status === 201) {
                    document.getElementById('send').style.background = 'green';
                } else{
                    document.getElementById('send').style.background = 'red';
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
            title: '',
            author: user_id,
            description: '',
            file: '',
            deadline: '',
            priority: '',
            assignee: [],
        });
    }

    render() {
        return (
            <div className={'modal-box'} id={'modal-box-id'}>
                <div className="author-wrapper">
                    <input name={'title'} onChange={this.changeHandler} className={'task-title'} placeholder={"Наименование задачи"}/>
                </div>
                <div className="description-wrapper">
                    <input name="description" onChange={this.changeHandler} className={"task-description"} placeholder={"Описание задачи"}/>
                </div>
                {/*<div className="file-wrapper">*/}
                {/*    <input name={"file"} onChange={this.changeSelectedMultiple} type={"file"} ref={this.fileInput} id={"input__file"} className={"file"} multiple/>*/}
                {/*    <label htmlFor={"input__file"} className={"input__file-button"}>*/}
                {/*        <span className={"input__file-button-text"}>+Файл</span>*/}
                {/*    </label>*/}
                {/*</div>*/}
                <div className="functional-wrapper">
                    <select name={'assignee'} onChange={this.changeSelectedMultiple} className={"task-assignee"}>
                        <option value={0} selected disabled>Принимающий</option>
                        <option value={1}>{localStorage.getItem('users' + [0])}</option>
                        <option value={2}>{localStorage.getItem('users' + [1])}</option>
                        <option value={3}>{localStorage.getItem('users' + [2])}</option>
                        <option value={4}>{localStorage.getItem('users' + [3])}</option>
                    </select>
                    <select name={'priority'} onChange={this.changeHandler} className={"task-priority"}>
                        <option value={"p1"} selected disabled>Приоритет</option>
                        <option value={"Низкий"}>Низкий</option>
                        <option value={"Средний"}>Средний</option>
                        <option value={"Высокий"}>Высокий</option>
                    </select>
                    <input name={'deadline'} onChange={this.changeHandler} type={"date"} className={"deadline"} placeholder={"дедлайн"}/>
                    <button type={'submit'} id={'send'} onClick={this.submitForm} className={"send"} placeholder='Создать'>Создать</button>
                </div>
                {/*<div className="button-wrapper">*/}
                {/*    <button type={'submit'} id={'send'} onClick={this.submitForm} className={"send"} placeholder='Создать'>Создать</button>*/}
                {/*    <button type={'submit'} className={"cancel"} placeholder='Отменить' onClick={() => {window.location.replace('/')}}>Отменить</button>*/}
                {/*</div>*/}
            </div>
        )
    }
}

export default Add;
