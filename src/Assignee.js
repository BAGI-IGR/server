import './Main.css';
import {useEffect, useState} from "react";
import axios from "axios";
import {generatePath} from "react-router";


let user_id = localStorage.getItem('user_id')
function Assignee() {
    const [assignees, SetAssignees] = useState()
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
                SetAssignees(res.data)
            })
            .catch(err => {
            })
    }, [])
    function assignee(task){
        let assignee_tasks = []
        for(let i in task){
            let assignee = task[i].assignee
            if(assignee == user_id){
                assignee_tasks.push(task[i])
            }
        }
        return assignee_tasks
    }
    assignee(assignees);
    return (
        <div className="all-tasks-status" id="all-tasks-status">
            <div className="create-new-task">
                <p className="createtask">Создать задачу</p>
                <a className="plusik" href="http://localhost:3000/task/create">
                    <span className="task-new">
                        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='#91A14D' width='24' height='24'>
                            <path d="M15 2.013H9V9H2v6h7v6.987h6V15h7V9h-7z"/>
                        </svg>
                    </span>
                </a>
            </div>
            {assignee(assignees).filter(object => object.is_active != false)?.map((task) => (
                <div className="task-status">
                    <div className="task-name">
                        <span key={task.id}>{task.title}</span>
                    </div>
                    <div className="title-task">
                        <span className="title-task-content" key={task.id}>{task.status}</span>
                    </div>
                    <div className="task-content">
                        <span className="employee" key={task.id}>от {localStorage.getItem('users_' + (task.author - 1))}</span>
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
    );
}

export default Assignee;
