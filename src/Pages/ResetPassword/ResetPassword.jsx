import React from 'react'
import './ResetPassword.css'
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core'
import service from '../../services/userService';
import { BrowserRouter as Router, Link, useParams } from 'react-router-dom';

export default function ResetPassword(props) {

    const [oldpassword, setoldpassword] = React.useState("");
    const [newpassword, setnewpassword] = React.useState("");
    const [showpassword,setShowpassword] = React.useState(false);

    const handleClick = () => {
        setShowpassword( true );

    }

    function submit() {
        console.log(window.location.href.split("//"))
        let data = {
            "newPassword": newpassword,
            "confirmNewPassword": newpassword,
        }
        service.resetpassword(data).then((result) => {
            console.log(result);
            console.log("successfully change password")
        }).catch((error) => {
            console.log(error);

        })
    }

    const updatePassword = e => {
        setoldpassword(e.target.value);
        console.log(e.target.value);
    }
    const updateNewPassword = e => setnewpassword(e.target.value);

    //let { token } = useParams();
    let token = props.history.location.pathname;
    let slice = token.slice(15,79);
    localStorage.setItem('token', slice);
    console.log(props.history.location.pathname);
    console.log(slice);


    return (
        <>

            <div className="login-frame">
                <div className="login-form">
                    <div className="login-content">
                        <div className="login-fundoo">
                            <span className="f">F</span>
                            <span className="u">u</span>
                            <span className="n">n</span>
                            <span className="d">d</span>
                            <span className="o">o</span>
                            <span className="u">o</span>
                        </div>
                        <p className="login-fundoo-account"> Reset Password </p>
                        <div className="textfield-reset">
                        <TextField id="outlined-basic" 
                            type={showpassword ? "type" : "password"}
                            className="update-field" 
                            variant="outlined" 
                            name="password"
                            label="password" 
                            fullWidth 
                            onChange={updatePassword} />

                            <TextField 
                            id="outlined-basic" 
                            type={showpassword ? "type" : "password"}
                            className="update-field" 
                            variant="outlined"
                            name="confirmpassword"
                            label="confirm password"
                            fullWidth 
                            onChange={updateNewPassword} />
                        </div>
                    </div>
                    <div className="show-checkbox-Login">
                        <input type="checkbox" id="radio" onClick={()=>handleClick()} value="Show password" />
                        <span>Show password</span>
                    </div>
                    <div className="inline__button">
                        <Link to="/" className=" Text-Cont">Back</Link>
                        < Button variant="outlined" size="small" onClick={submit}>submit</Button>

                    </div>
                </div>
            </div>
        </>)
}