import './Main.css';
import {useEffect, useState} from "react";
import axios from "axios";
import {generatePath} from "react-router";


let user_id = localStorage.getItem('user_id')
function Archive_anmy() {
    let [archiveanmy, SetArchiveanmy] = useState()
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
                SetArchiveanmy(res.data)
            })
            .catch(err => {
            })
    }, [])
    function sorty(archivanmy){
        let sorty_tasks = []
        for(let i in archivanmy){
            let assignee = archivanmy[i].assignee
            if(assignee == user_id) {
                sorty_tasks.push(archivanmy[i])
            }
        }
        return sorty_tasks
    }
    sorty(archiveanmy);
    return (
        <div className="all-tasks-status" id="all-tasks-status">
            {sorty(archiveanmy)?.filter(object => object.is_active === false).map((task) => (
                <div className="task-status">
                    <div className="task-name">
                        <span key={task.id}>{task.title}</span>
                    </div>
                    <div className="title-task">
                        <span className="title-task-content" key={task.id}>{task.status}</span>
                    </div>
                    <div className="task-content">
                        <span className="employee" key={task.id}>для {localStorage.getItem('users' + (task.assignee - 1))}</span>
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

export default Archive_anmy;