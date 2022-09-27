import axios from "axios";

export function Delete(id) {
    //потом убрать
    window.location = window.location.href
    let Token = localStorage.getItem('Token')
    axios
        .delete('https://djandoreact.herokuapp.com/task/delete/' + id, {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                // eslint-disable-next-line no-useless-concat
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
