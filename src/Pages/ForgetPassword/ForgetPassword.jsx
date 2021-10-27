import React from 'react'
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core'
import user_services from '../../services/userService';
import { BrowserRouter as Router, Route, Link, Navlink, Switch } from 'react-router-dom';
import '../registration/Registration.css';
import './ForgetPassword.css';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default class ForgetPassword extends React.Component {
    constructor(probs) {
        super(probs);
        this.state = {
            username: "",
            open:false
        }
    }

    submit = () => {
        this.setState({open:true});
        let data = {
            email: this.state.username,
        }
        user_services.forgetpassword(data).then((result) => {

            console.log(result);
        }).catch((error) => {
            console.log(error);
        })
    }

    handleChange = (e) => {
        this.setState({ username: e.target.value })
    }
    handleClose = (event, reason) =>{
        if (reason === 'clickaway') {
            return;
          }
      
          this.setState({open :false});

    }

    render() {
        return (
            <><div className="login-frame">
                <div className="login-form">
                    <div className="login-cont">
                        <div className="login-fundoo">
                            <span className="f">F</span>
                            <span className="u">u</span>
                            <span className="n">n</span>
                            <span className="d">d</span>
                            <span className="o">o</span>
                            <span className="u">o</span>
                        </div>
                        <p className="login-fundoo-account"> Account Recovery </p>
                        <div className="text-frget">Enter the last password you remember using with this Google Account</div>
                        <div className="textfields">
                            <TextField 
                            id="outlined-basic" 
                            className="asdf" 
                            variant="outlined" 
                            name="username"
                            label="Email or phone" 
                            fullWidth
                            onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="div-but">
                        <Link to="/" className="Text Text-Cont">Try another way</Link>
                        <Button className="button" variant="contained" color="primary" href="#contained-buttons" onClick={this.submit}>
                            Submit
                        </Button>
                        <Snackbar
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            open={this.state.open}
                            autoHideDuration={6000}
                            onClose={this.handleClose}
                            message="EMAIL SUCCESSFULLY SENDED "
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
                </div>
            </div>
            </>
        )
    }
}