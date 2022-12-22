import axios from "axios";


export function Delete(id) {
    //потом убрать
    window.location = window.location.href
    let Token = localStorage.getItem('Token')
    axios
        .delete('https://robot0005.pythonanywhere.com/task/delete/' + id, {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Token' + ' ' + Token
            },
        })
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            console.log(err)
        })
}
