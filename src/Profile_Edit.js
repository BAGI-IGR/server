import React from "react";
import axios from "axios";


class Profile_Edit extends React.Component {
    constructor() {
        let position = localStorage.getItem('position')
        let fio = localStorage.getItem('fio')
        let email = localStorage.getItem('email')
        let user_id = localStorage.getItem('user_id')
        let number = localStorage.getItem('number')
        super();
        this.state = {
            user: user_id,
            fio: fio,
            work_phone_num: number,
            email: email,
            position: position,
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }
    changeHandler(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    submitForm(event) {
        let user_id = localStorage.getItem('user_id')
        let Token = localStorage.getItem('Token')
        event.preventDefault();
        console.log(this.state)
        fetch('https://robot0005.pythonanywhere.com/profile/update/' + user_id, {
            headers: {'Content-type': 'application/json'}, method: "PUT",
            body: JSON.stringify(this.state),
            'Authorization': 'Token ' + Token
        })
            .then(response => {
                this.Save(response.data)
            })
            .catch(err => {
                console.error(err)
            })
    }
    ClearToken() {
        localStorage.removeItem("Token")
        window.location.replace("https://server-njsy.vercel.app/");
    }
    Save(data) {
        window.location.replace("https://server-njsy.vercel.app/profile");
        localStorage.removeItem("fio")
        localStorage.removeItem("email")
        localStorage.removeItem("number")
        localStorage.removeItem("position")
        localStorage.setItem("fio", data.fio)
        localStorage.setItem("email", data.email)
        localStorage.setItem("number", data.work_phone_num)
        localStorage.setItem("position", data.position)
    }
    render() {
        return (
            <div>
                {/*{profiles?.map(profile =>(*/}
                <div className="main">
                    <div className="container">
                        <div className="container-ava">
                            <img className="image"
                                 src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAbpJREFUaEPtWdFNxTAMvDcBbPBgAxiBCR5MACswCWwAI8AE720AI8AEsAHopEZqo7RxHDdtJeeramP7zndN03aHjY/dxvHDCSytoCuwVgUuADwBuALA4xbjC8AngEcAPBaNlIUI+APAuSiD/aRfANdSEikCbwAO9riKMr4DuJVEpAj8LNj9gJkWutQS+IsCW61UqropcKpEkm5l5qjqOgGDzocUrkBVJwyUcAVcgYSNHgBwa8Cne26szkLcCB471HyqksjUWBUBbgQJniQ4qMDdlgi8AriPAJPAlJUWUYAe58br1APLcy+JbtNCU1ZqTiB4nC8hNx3gcG7sXWLKSk0JxB4nARLp+37M8jkr5VarwXXtZi72OC30nfB9CkzOSrMTGPN4SWHJqiTKV6pAzuOiot0kEyuVEIh9XwJWYqXZb+LU2l5Lom+l2QnUgs3FO4HQIVUncu0VXFfVLbmJBRiqppgR4IPmrArKMDhuUgy0tNQgX4tPi80J8OMu9zVWKjQnQElJ4rl7IdmXahzNX4RAJWZVuNlNrKpuEOQEDJpYlcIVqGqfQfDmFVD1oNXvIxU4SZATkHRpzjn/0QpoMWWt6TQAAAAASUVORK5CYII="/>
                        </div>
                        <div className="container__body-info">
                            <div className="container-info">
                                <div className="container-name">
                                    <input className="input-fio" id='input1'
                                           type="full-name" name="fio" value={localStorage.getItem('fio')}
                                           placeholder="ФИО"/>
                                </div>
                                <div className="phone_number">
                                    <input className="input-number" type="phone_number"
                                           name="work_phone_num" onChange={this.changeHandler}
                                           placeholder="Номер телефона" value={this.state.work_phone_num}/>
                                </div>
                                <div className="container-email">
                                    <input className="input-email" onChange={this.changeHandler} id='input3'
                                           type="email" name="email" value={this.state.email}
                                           placeholder="Электронная почта"/>
                                </div>
                                <div className="container-status">
                                    <input className="input-status" id='input4'
                                           type="status" name="position" value={localStorage.getItem('position')}
                                           placeholder="Должность"/>
                                </div>
                            </div>
                            <div className="edit_save-button" id="edit_save-button">
                                <a className="edit-button" href="https://server-njsy.vercel.app/profile/">Отмена</a>
                                <button className="button-save" id='edit_save' onClick={this.submitForm}>Сохранить</button>
                            </div>

                        </div>
                    </div>
                </div>
                {/*))}*/}
                <footer className="container_loggout">
                    <div className="loggout">
                        <button className="loggout-button" onClick={this.ClearToken}>Выйти из аккаунта</button>
                    </div>
                </footer>
            </div>
        )
    }
}

export default Profile_Edit;

