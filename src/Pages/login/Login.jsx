import React, { Component } from 'react';
// import { ButtonComp } from '../registration/Registration';
import TextField from '@material-ui/core/TextField';
import './Login.css';
import user_services from '../../services/userService';
import Button from '@material-ui/core/Button';
import { Redirect } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


let UserNameRegex = /^([a-zA-Z0-9]*[+._-]*[a-zA-Z0-9]+@[a-zA-Z]+.{3}[a-zA-z.]*[a-zA-z]{2})+$/;
let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/;

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uName: '',
            password: '',
            uNameError: false,
            passwordError: false,
            showPassword: false,
            redirect: '',
            flag: 0,
            open:false
        }
    }


    validationTest = (test, val) => {

        if (test.test(val)) {
            console.log("Value", val);
            console.log("test result", test.test(val));

            return true
        }
        else {
            return false;
        }
    }



    onUserChange = e => {
        let validation = this.validationTest(UserNameRegex, e.target.value) === true ? false : true;
        this.setState({
            uName: e.target.value,
            flag: 1,
            // uNameError : validation
        }, console.log(this.state.uName));
    }


    onPasswordChange = e => {
        let validationPass = this.validationTest(passwordRegex, e.target.value) === true ? false : true;
        this.setState({
            password: e.target.value,
            flag: 1,
            // passwordError : validationPass
        }, console.log(this.state.passwordError, " ", this.state.password));
    }

    Next = () => {
        this.setState({open : true});
        this.setState({
            uNameError: this.validationTest(UserNameRegex, this.state.uName) === true ? false : true,
            passwordError: this.validationTest(passwordRegex, this.state.password) === true ? false : true
        });

        if (this.state.flag === 1
            && !this.state.uNameError
            && !this.state.passwordError) {

            let userData = {
                email: this.state.uName,
                password: this.state.password
            };

            user_services.login(userData).then((data) => {
                console.log('data after register', data);
                localStorage.setItem('token', data.data.id);
                localStorage.setItem('email', data.data.email);
                localStorage.setItem('first', data.data.firstName);
                localStorage.setItem('last', data.data.lastName);
                this.redirectToDashboard();
            })
                .catch(error => {
                    console.log('Error', error);
                });
        }
        else {
            this.setState({
                matchPassword: true
            });
        }
    }
    forgetPassword = () => {

        this.setState({ redirect: "/ForgetPassword" });
    }
    resetPassword = () => {
        this.setState({ redirect: "/resetpassword" });
    }

    regPage = () => {
        this.setState({ redirect: "/Registration" });
    }

    redirectToDashboard() {
        this.setState({ redirect: "/Dashboard" });
    }
    handleClick = (e) => {
        this.setState({ showpassword: !this.state.showpassword })

    }
    handleClose = (event, reason) =>{
        if (reason === 'clickaway') {
            return;
          }
      
          this.setState({open :false});

    }
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        let styles = {
            helperText: {

                color: 'red',
                fontWeight: 'bold',
                fontSize: '.8em',
                marginLeft: '1px',
            }
        }

        return (
            <>
                <div className="login-frame">
                    <form className="login-form">
                        <div className="login-cont">
                            <div className="login-fundoo">
                                <span className="f">F</span>
                                <span className="u">u</span>
                                <span className="n">n</span>
                                <span className="d">d</span>
                                <span className="o">o</span>
                                <span className="u">o</span>
                            </div>
                            <div className="login-fundoo-account">
                                Sign in
                            </div>
                            <div> Use your Fundoo Account</div>
                        </div>
                        <div className="login-input">
                            <TextField
                                error={this.state.uNameError}
                                id="userName"
                                type="text"
                                name="uName"
                                label="User Name"
                                variant="outlined"
                                onChange={e => this.onUserChange(e)}
                                helperText={this.state.uNameError ? "Enter first name" : ''}
                                FormHelperTextProps={{ style: styles.helperText }}
                            />
                            <span className="forget">Forget email?</span>
                            <TextField
                                error={this.state.passwordError}
                                id="password"
                                type={this.state.showpassword ? "type" : "password"}
                                name="password"
                                label="Password"
                                variant="outlined"
                                onChange={e => this.onPasswordChange(e)}
                                helperText={this.state.passwordError ? "Enter Password" : ''}
                                FormHelperTextProps={{ style: styles.helperText }}
                            />
                            <div className="show-checkbox-Login">
                                <input type="checkbox" id="radio" onClick={this.handleClick} value="Show password" />
                                <span>Show password</span>
                            </div>
                            <div className="pwdchange">
                                <span className="forget" onClick={this.forgetPassword}>Forget Password?</span>
                            </div>

                        </div>
                        <div className="div-but-content">
                            <span className="Text Text-Cont" onClick={this.regPage}>Create Account</span>
                            <Button className="button" variant="contained" color="primary" href="#contained-buttons" onClick={this.Next}>
                                Next
                            </Button>
                            <Snackbar
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                open={this.state.open}
                                autoHideDuration={6000}
                                onClose={this.handleClose}
                                message=" LOGIN SUCESSFUL "
                                action={
                                    <React.Fragment>
                                        <Button color="secondary" size="small" onClick={this.handleClose}>
                                            UNDO
                                        </Button>
                                        <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleClose}>
                                            <CloseIcon fontSize="small" />
                                        </IconButton>
                                    </React.Fragment>
                                }
                            />
                        </div>

                    </form>
                </div>

            </>

        );
    }
}