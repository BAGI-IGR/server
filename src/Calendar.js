import "./Calendar.css"
import {Calendar, dateFnsLocalizer} from "react-big-calendar";
import {format} from "date-fns/";
import {parse} from "date-fns/";
import {startOfWeek} from 'date-fns/';
import {getDay} from "date-fns/";
import 'react-big-calendar/lib/css/react-big-calendar.css'
import React, {useState} from "react";
import {useEffect} from "react";
import axios from "axios";
import ru from "date-fns/locale/ru";
import 'moment/locale/ru';


const locales = {'ru':ru}
const messages = {
    allDay: 'Весь день',
    previous: '<',
    next: '>',
    today: 'Сегодня',
    month: 'Месяц',
    week: 'Неделя',
    day: 'День',
    agenda: 'Повестка дня',
    date: 'Дата',
    time: 'Время',
    event: 'Событие',
    showMore: total => `+ Показать больше (${total})`
};
const localaizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
})
export default function Task_Calendar(){
    const [tasks, SetTasks] = useState()
    useEffect(() => {
    let Token = localStorage.getItem('Token')
    axios.get('https://robot0005.pythonanywhere.com/tasks/?format=json', {
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Token' + ' ' + Token
        },
    })
        .then(res => {
            console.log(res.data)
            let mas = []
            for(let i in res.data){
                mas.push({title: res.data[i].title, allDay:true , start: res.data[i].created_at, end: res.data[i].deadline})
            }
            SetTasks(mas)
        })
        .catch(err => {
        })
    }, [])
    return(
        <div>
            <div id="calendar">
                <Calendar localizer={localaizer}
                          events={tasks}
                          messages={messages}
                          startAccessor={'start'}
                          endAccessor={'end'}
                          culture={'ru'}
                          style={{height: 700, margin:"50px"}}/>
            </div>
        </div>
    )
}
