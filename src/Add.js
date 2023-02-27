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
            belongs: '',
            weight: '',
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
        fetch('https://robot0005.pythonanywhere.com/task/create/', {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
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
            belongs: '',
            weight: '',
            deadline: '',
            priority: '',
            assignee: [],
        });
    }
    render() {
        return (
            <div>
                <div className="footer">
                    <h2 className="textbox">Название задачи</h2>
                </div>
                <div className="status">
                    <select className="task-status">
                        <option value="1">В работе</option>
                        <option value="2">Завершено</option>
                        <option value="3">Не начато</option>
                    </select>
                    <p><input type="button" value="Дедлайн" className="deadline"/></p>
                </div>
                <div className="create-task">
                    <input className="name_task" name="title" onChange={this.changeHandler} placeholder="Наименование задачи"/>
                    <input className="description" name="description" onChange={this.changeHandler} placeholder=""/>
                    <div>
                        <div className="executor">Исполнитель :</div>
                        <input type="text" className="fio" placeholder=""/>
                        <button type="submit" className="add_fio"/>
                    </div>
                    <button className="add_file" name="file" onChange={this.changeSelectedMultiple} type="file" ref={this.fileInput} id="input__file" multiple>+ Добавить файл</button>
                    <div className="attached_files">Вложенные файлы
                        <button type="submit" className="add_1"></button>
                        <button type="submit" className="add_2"></button>
                        <button type="submit" className="add_3"></button>
                    </div>
                    <button type="submit" className="save_task">Сохранить и закрыть</button>
                    <button type="submit" className="delete_task">Удалить задачу</button>
                </div>
                <div className="chat"/>
                <div className="message">
                    <input type="text" className="task_1" name="text" placeholder="Введите комментарий"/>
                    <span className="send">
                    <a className="send_message">Отправить</a>
                </span>
                </div>
            </div>
            // <div className={'modal-box'} id={'modal-box-id'}>
            //     <div className="author-wrapper">
            //         <input name={'title'} onChange={this.changeHandler} className={'task-title'} placeholder={"Наименование задачи"}/>
            //     </div>
            //     <div className="description-wrapper">
            //         <input name="description" onChange={this.changeHandler} className={"task-description"} placeholder={"Описание задачи"}/>
            //     </div>
            //     {/*<div className="file-wrapper">*/}
            //     {/*    <input name={"file"} onChange={this.changeSelectedMultiple} type={"file"} ref={this.fileInput} id={"input__file"} className={"file"} multiple/>*/}
            //     {/*    <label htmlFor={"input__file"} className={"input__file-button"}>*/}
            //     {/*        <span className={"input__file-button-text"}>+Файл</span>*/}
            //     {/*    </label>*/}
            //     {/*</div>*/}
            //     <div className="functional-wrapper">
            //         <select name={'assignee'} onChange={this.changeSelectedMultiple} className={"task-assignee"}>
            //             <option value={0} selected disabled>Принимающий</option>
            //             <option value={1}>{localStorage.getItem('users' + [0])}</option>
            //             <option value={2}>{localStorage.getItem('users' + [1])}</option>
            //             <option value={3}>{localStorage.getItem('users' + [2])}</option>
            //             <option value={4}>{localStorage.getItem('users' + [3])}</option>
            //         </select>
            //         <select name={'priority'} onChange={this.changeHandler} className={"task-priority"}>
            //             <option value={"p1"} selected disabled>Приоритет</option>
            //             <option value={"Низкий"}>Низкий</option>
            //             <option value={"Средний"}>Средний</option>
            //             <option value={"Высокий"}>Высокий</option>
            //         </select>
            //         <input name={'deadline'} onChange={this.changeHandler} type={"date"} className={"deadline"} placeholder={"дедлайн"}/>
            //         <button type={'submit'} id={'send'} onClick={this.submitForm} className={"send"} placeholder='Создать'>Создать</button>
            //     </div>
            //     {/*<div className="button-wrapper">*/}
            //     {/*    <button type={'submit'} id={'send'} onClick={this.submitForm} className={"send"} placeholder='Создать'>Создать</button>*/}
            //     {/*    <button type={'submit'} className={"cancel"} placeholder='Отменить' onClick={() => {window.location.replace('/')}}>Отменить</button>*/}
            //     {/*</div>*/}
            // </div>
        )
    }
}

export default Add;
