import './Main.css';
import {useEffect, useState} from "react";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import {Link, Route} from "react-router-dom";
import {generatePath} from "react-router";
import {Delete} from "./functions";
// eslint-disable-next-line no-unused-vars
import Add from "./Add";

function Archive() {
    let [closes, SetClose] = useState()
    let Token = localStorage.getItem('Token')
    useEffect(() => {
        axios
            .get('https://djandoreact.herokuapp.com/tasks/?format=json', {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    // eslint-disable-next-line no-useless-concat
                    'Authorization': 'Token' + ' ' + Token
                },
            })
            .then(res => {
                SetClose(res.data)
                let user = localStorage.getItem('user_id')
                if (user !== '2') {
                    document.getElementById('delete').style.display = "none";
                }
            })
            .catch(err => {
            })
    }, [])

    return (
        <div className={"all-tasks-status"} id={"all-tasks-status"}>
            {closes?.filter(object => object.status === "Закрыта").map((task) => (
                <div className="task-status">
                    <div className="task-name">
                        <span key={task.id}>{task.title}</span>
                    </div>
                    <div className="title-task">
                        <span className={"title-task-content"} key={task.id}>{task.status}</span>
                    </div>
                    <div className="task-content">
                        <p className="content-task">
                            <span className="employee" key={task.id}>{localStorage.getItem('users' + (task.assignee - 1))}</span>
                            <span className="priority">
                                {task.priority === 'Низкий' && <svg className={'flag1'} viewBox="0 0 16 14" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1410_689)"><path d="M1.98333 13.5625C1.98333 13.8031 1.75866 14 1.4875 14H0.495833C0.224674 14 0 13.8031 0 13.5625V0.875C0 0.389648 0.441602 0 0.991667 0C1.54173 0 1.98333 0.389648 1.98333 0.875V13.5625ZM14.7603 0C14.5631 0 14.3572 0.0369141 14.161 0.115746C12.7451 0.686137 11.6955 0.87973 10.8203 0.87973C8.96219 0.87973 7.8822 0.00855859 5.74113 0.00828516C4.98622 0.00835352 4.07823 0.133082 2.975 0.430664V10.0146C3.96667 9.74165 4.83035 9.6291 5.60447 9.6291C7.88623 9.6291 9.47507 10.4981 11.759 10.4981C12.7479 10.4981 13.8669 10.3348 15.2019 9.86672C15.6218 9.73164 15.8667 9.41719 15.8667 9.08086V0.840273C15.8667 0.303516 15.3491 0 14.7603 0Z"/></g></svg>}
                                {task.priority === 'Средний' && <svg className={'flag2'} viewBox="0 0 16 14" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1410_689)"><path d="M1.98333 13.5625C1.98333 13.8031 1.75866 14 1.4875 14H0.495833C0.224674 14 0 13.8031 0 13.5625V0.875C0 0.389648 0.441602 0 0.991667 0C1.54173 0 1.98333 0.389648 1.98333 0.875V13.5625ZM14.7603 0C14.5631 0 14.3572 0.0369141 14.161 0.115746C12.7451 0.686137 11.6955 0.87973 10.8203 0.87973C8.96219 0.87973 7.8822 0.00855859 5.74113 0.00828516C4.98622 0.00835352 4.07823 0.133082 2.975 0.430664V10.0146C3.96667 9.74165 4.83035 9.6291 5.60447 9.6291C7.88623 9.6291 9.47507 10.4981 11.759 10.4981C12.7479 10.4981 13.8669 10.3348 15.2019 9.86672C15.6218 9.73164 15.8667 9.41719 15.8667 9.08086V0.840273C15.8667 0.303516 15.3491 0 14.7603 0Z"/></g></svg>}
                                {task.priority === 'Высокий' && <svg className={'flag3'} viewBox="0 0 16 14" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1410_689)"><path d="M1.98333 13.5625C1.98333 13.8031 1.75866 14 1.4875 14H0.495833C0.224674 14 0 13.8031 0 13.5625V0.875C0 0.389648 0.441602 0 0.991667 0C1.54173 0 1.98333 0.389648 1.98333 0.875V13.5625ZM14.7603 0C14.5631 0 14.3572 0.0369141 14.161 0.115746C12.7451 0.686137 11.6955 0.87973 10.8203 0.87973C8.96219 0.87973 7.8822 0.00855859 5.74113 0.00828516C4.98622 0.00835352 4.07823 0.133082 2.975 0.430664V10.0146C3.96667 9.74165 4.83035 9.6291 5.60447 9.6291C7.88623 9.6291 9.47507 10.4981 11.759 10.4981C12.7479 10.4981 13.8669 10.3348 15.2019 9.86672C15.6218 9.73164 15.8667 9.41719 15.8667 9.08086V0.840273C15.8667 0.303516 15.3491 0 14.7603 0Z"/></g></svg>}
                            </span>
                            <span className="linedead" key={task.id}>{task.deadline}</span>
                        </p>
                    </div>
                    <div className={"edit-edit"}>
                        <span className="edit-task" key={task.id}>
                            <a className={"edit-content"} href={generatePath("/task-view/:id/", {id: task.id,})}>Подробнее</a>
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Archive;
