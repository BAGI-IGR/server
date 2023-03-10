import './Main.css';
import {useEffect, useState} from "react";
import axios from "axios";
import {generatePath} from "react-router";


let user_id = localStorage.getItem('user_id')
function Archive() {
    let [archive, SetArchive] = useState()
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
                SetArchive(res.data)
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
    sort(archive);
    return (
        <div className="all-tasks-status" id="all-tasks-status">
            {sort(archive)?.filter(object => object.is_active === false).map((task) => (
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
    );
}

export default Archive;
