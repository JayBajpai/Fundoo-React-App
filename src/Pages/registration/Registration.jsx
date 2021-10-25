import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import './Registration.scss';
import user_services from '../../services/userService';
import Button from '@material-ui/core/Button';
import {Redirect} from "react-router-dom"

let NameRegex = RegExp('^[A-Z]{1}[a-z]{2,}$');
let UserNameRegex = RegExp("^([a-zA-Z0-9]*[+._-]*[a-zA-Z0-9]+@[a-zA-Z]+.{3}[a-zA-z.]*[a-zA-z]{2})+$");
let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/;


export default class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fName: '',
            lName: '',
            uName: '',
            password: '',
            cPassword: '',
            fNameError: false,
            lNameError: false,
            uNameError: false,
            passwordError: false,
            cPasswordError: false,
            fNameErrormsg: '',
            lNameErrormsg: '',
            uNameErrormsg: '',
            passwordErrormsg: '',
            cPasswordError: '',
            showPassword: false,
            flag:0,
            matchPassword:false,
            redirect:'',
            showpassword: true,
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

    handleClick = (e) => {
        this.setState({ showpassword: !this.state.showpassword })

    }
    Next = () => {
        this.setState({
            fNameError : !this.validationTest(NameRegex, this.state.fName),
            lNameError : !this.validationTest(NameRegex, this.state.lName) ,            
            uNameError : !this.validationTest(UserNameRegex, this.state.uName),
            passwordError : !this.validationTest(passwordRegex, this.state.password) ,
            cPasswordError :!this.validationTest(passwordRegex, this.state.cPassword)
        });
    
        if (this.state.flag === 1 
            && !this.state.fNameError 
            && !this.state.lNameError 
            && !this.state.uNameError 
            && !this.state.passwordError 
            && !this.state.cPasswordError) {
            if(this.state.password === this.state.cPassword)
            {
                console.log("validation successfull");
                let userData = {
                    firstName: this.state.fName,
                    lastName: this.state.lName,
                    email: this.state.uName,
                    password: this.state.password,
                    service: 'advance',
                };

                user_services.register(userData).then((data) =>{
                    console.log('data after register',data);
                    this.signinPage();
                })
                .catch(error=>{
                    console.log('Error',error);
                });
            }
            else
            {
                this.setState({
                    matchPassword : true
                });
            }
        }
    }

    onFNameChange = e => {
        let validation = this.validationTest(NameRegex, e.target.value) === true ? false : true;
        this.setState({
            fName : e.target.value,
            // fNameError : validation,
            flag:1
        },console.log(this.state.fName));
    }

    onLNameChange = e => {
        let validation = this.validationTest(NameRegex, e.target.value) === true ? false : true;
        this.setState({
            lName : e.target.value,
            flag:1,
            // lNameError : validation
        },console.log(this.state.lName));
    }

    onUserChange = e => {
        let validation = this.validationTest(UserNameRegex, e.target.value) === true ? false : true;
        this.setState({
            uName : e.target.value,
            flag:1,
            // uNameError : validation
        },console.log(this.state.uName));
    }

    onPasswordChange = e => {
        let validation = this.validationTest(passwordRegex, e.target.value) === true ? false : true;
        this.setState({
            password : e.target.value,
            flag:1,
            // passwordError : validation
        },console.log(this.state.password));

    }

    onCPasswordChange = e => {
        let validation = this.validationTest(passwordRegex, e.target.value) === true ? false : true;
        this.setState({
            cPassword : e.target.value,
            flag:1,
            // cPasswordError : validation,
            matchPassword : false
        },console.log(this.state.cPassword));
    }

    signinPage = () =>{
        this.setState({redirect: "/"});
    }    

    render() {

        if(this.state.redirect){
            return <Redirect to ={this.state.redirect}/>
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
            <div className="reg-root">
                <div className="reg-frame">
                    <div className="reg-cont">
                        <div className="reg-fundoo">
                            <span className="f">F</span>
                            <span className="u">u</span>
                            <span className="n">n</span>
                            <span className="d">d</span>
                            <span className="o">o</span>
                            <span className="u">o</span>
                        </div>
                        <div className="reg-fundoo-account">
                            Create Your Fundoo Account
                    </div>
                        <div className="input-field">
                            <div className="reg-content-names">
                                <TextField
                                    error={this.state.fNameError}
                                    id="firstName"
                                    type="text"
                                    name="fName"
                                    label="First Name"
                                    variant="outlined"
                                    size="small"
                                    onChange={e => this.onFNameChange(e)}
                                    helperText={this.state.fNameError ? "Enter first name" : ''}
                                    FormHelperTextProps={{ style: styles.helperText }} />
                                <TextField
                                    error={this.state.lNameError}
                                    id="lastName"
                                    type="text"
                                    name="lName"
                                    label="LastName"
                                    variant="outlined"
                                    size="small"
                                    onChange={e => this.onLNameChange(e)}
                                    helperText={this.state.lNameError ? "Enter Last name" : ''}
                                    FormHelperTextProps={{ style: styles.helperText }} />
                            </div>
                            <div className="reg-content-username">
                                <TextField
                                    error={this.state.uNameError}
                                    id="username"
                                    type="text"
                                    name="uName"
                                    label="User Name"
                                    variant="outlined"
                                    size="small"
                                    onChange={e => this.onUserChange(e)}
                                    helperText={this.state.uNameError ? "Enter User name" : ''}
                                    FormHelperTextProps={{ style: styles.helperText }} />
                            </div>
                            <div className="message">You can use letters,numbers & periods</div>
                            <div className="reg-content-security">
                                <TextField
                                    error={this.state.passwordError}
                                    id="password"
                                    type={this.state.showpassword ? "password" : "type"}
                                    name="password"
                                    label="Password"
                                    variant="outlined"
                                    size="small"
                                    onChange={e => this.onPasswordChange(e)}
                                    helperText={this.state.passwordError ? "Enter Password" : ''}
                                    FormHelperTextProps={{ style: styles.helperText }} />
                                <TextField
                                    error={this.state.cPasswordError}
                                    id="Confirm"
                                    type={this.state.showpassword ? "password" : "type"}
                                    name="cPassword"
                                    label="Confirm Password"
                                    variant="outlined"
                                    size="small"
                                    onChange={e => this.onCPasswordChange(e)}
                                    helperText={this.state.cPasswordError ? "Enter Confirm Password" : ''}
                                    helperText={this.state.matchPassword ? "Password not matched" : ''}
                                    FormHelperTextProps={{ style: styles.helperText }} />
                            </div>
                            <div className="message">Use 8 or more characters with a mix of letters, number & symbols</div>
                            <div className="show-checkbox">
                                <input type="checkbox" id="radio" onClick={this.handleClick} value="Show password" />
                                <span>Show password</span>
                            </div>

                            <div className="div-but-content"><span className="Text Text-Redirect" onClick={this.signinPage}>Sign in Instead</span>
                                <Button className="button" variant="contained" color="primary" href="#contained-buttons" onClick={this.Next}>
                                    Next
                                     </Button>
                            </div>

                        </div>
                    </div>

                    <div>
                    </div>
                    <div className="logo-cont">
                        <img src="https://ssl.gstatic.com/accounts/signup/glif/account.svg" alt="" />
                        <span class="fig-caption">One account. All of Fundoo working for you.</span>
                    </div>
                </div>
            </div>
        );
    }
}

