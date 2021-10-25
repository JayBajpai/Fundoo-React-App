import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import './Collaborators.css';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import user_services from '../../services/userService';
import MenuItem from '@material-ui/core/MenuItem';
import { MenuList } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import CollabPoper from './collabPoper';

const styles = {
    underline: {
        marginLeft: '20px',
        marginTop: '10px',
        width: '300px',
        "& .MuiInput-underline:before": {
            position: 'fixed'
        },
        "& .MuiInput-underline:after": {
            position: 'fixed'
        }
    }
};

class Collaborators extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collaborators: '',
            collabData: [],
            cancel: false,
            openPopper: false,
             title: '',
            description: '',
            file: '',
            noteId: '',
            color: '',
            isArchived: '',
            anchorEl: null,
            id: ''
        }

    }


    handleInput = (e) => {

        let Data = {
            searchWord: e.target.value
        }
        this.setState({
            collaborators: e.target.value,
            cancel: true,
            openPopper: true
        });
        if (e.target.value !== "") {
            user_services.searchCollab(Data).then((data) => {
                this.setState({ anchorEl: e.currentTarget })
                this.setState({
                    collabData: data.data.data.details
                });
                console.log('searchCollab', data);
            }).catch(error => {
                console.log('searchCollab', error);
            });
        }
    }
    handleClose = () => {
        this.setState({ anchorEl: null })
    };

    addColaboratorCreateNote = (val) => {


        // debugger;
        let colabDetails = [];
        let arr = [{
            "firstName": val.firstName,
            "lastName": val.lastName,
            "email": val.email,
            "userId": val.userId
        }]

        const formData = new FormData();

        // formData.append('file', e.target.files[0].name)
        formData.append("title",  this.props.note.title);
        formData.append("description", this.props.note.note);
        formData.append("color", this.props.note.color);
        formData.append("isArchived", false);
        formData.append('collaberators', JSON.stringify(arr));

        console.log("formData ===== " + formData);

        user_services.addNotes(formData).then((data) => {
            console.log('data after added note', data);
           
            this.props.getCloseStatus(false);
            this.props.getDetails();
            this.props.getNotes(); 
        })
            .catch(error => {

                console.log('Error', error);
            });


    }


    addColaborator(val) {
        let collaborators = val;
        console.log("----------------------->", collaborators);
        console.log("----------------------->", this.props.note.id);
        user_services.addCollab(collaborators, this.props.note.id).then((data) => {
            this.props.getNotes();
            this.props.getCloseStatus(false);
            console.log('data', data);
        }).catch(error => {
            console.log('searchCollab', error);
        });
    }

    colabArr = (val) => {
        return (
            <MenuItem
                style={{ cursor: "pointer" }}>
                <div style={{
                    width: "350px",
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <div>
                        {val.email}
                    </div>
                    <div>
                        {val.firstName}
                    </div>
                </div>
            </MenuItem>

        )
    }

    onDelete = (userId) => {
        user_services.deleteCollab(this.props.note.id, userId).then((data) => {
            this.props.getNotes();
            console.log('data', data);
        }).catch(error => {
            console.log('searchCollab', error);
        });
    }

    saveCollab = () => {
        this.props.getNotes();
        this.setState({
            collabData: []
        });
        this.props.getCloseStatus(false);
    }

    closeDialog = () => {
        this.setState({
            collabData: []
        });
        this.props.getCloseStatus(false);

    }

    onCancel = () => {
        this.setState({
            collabData: [],
            cancel: false
        });
    }

    render() {
        const { classes } = this.props;
        
        const collabDetails = this.props.note.collaborators.map((data, index) => {
            let name = data.firstName
            const chars = name.split('');
            return (
                <MenuItem key={index} >
                    <div className="collab-dtl">
                        <Tooltip title={name}>
                            <div style={{
                                // backgroundColor: this.props.value.color,
                                marginLeft: '5px',
                                marginRight: '4px'
                            }}>
                                <Avatar alt={chars[0]} src={chars[0]} />
                            </div>
                        </Tooltip>
                        <span className="email-disp">{data.email}</span>
                        <span className='on-close' >
                            <CloseIcon onClick={() => this.onDelete(data.userId)} />
                        </span>
                    </div>
                </MenuItem>
            );
        });
        return (
            <div>
                <Dialog
                    open={this.props.open}>
                    <div
                        className="dialog-body"
                        style={{
                            width: "570px",
                            minHeight: "160px",
                            padding: "15px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between"
                        }}>
                        <div style={{ borderBottom: "2px solid #e4d6d6" }}>
                            Collaborators
                        </div>

                        <div className="collab-details">
                            <div className="owner">
                                <div className="avatar-img">
                                    <Avatar alt="Jay" src="/static/images/avatar/3.jpg" />
                                </div>
                                <div className="owner-title">
                                    <div className="name-txt">{localStorage.getItem('first')} {localStorage.getItem('last')}  (Owner)</div>
                                    <div className="email-txt">{localStorage.getItem('email')}</div>
                                </div>
                            </div>
                            <div>
                                <MenuList>{collabDetails}</MenuList>
                            </div>
                            <div className="search-cnt" style={{position: 'relative' }}>
                                <div className="plus">
                                    <PersonAddIcon /></div>
                                <TextField
                                    className={classes.underline}
                                    name="collaborators"
                                    multiline
                                    placeholder="Search"
                                    onChange={this.handleInput}
                                />
                                {/* <div style={{
                                    maxHeight: "350px",
                                    overflow: "scroll"
                                }}> */}
                                    <CollabPoper
                                        // className="colabpop"
                                        id={this.state.openPopper ? 'simple-popover' : undefined}
                                        List={this.state.collabData}
                                        open={this.state.openPopper}
                                        anchorEl={this.state.anchorEl}
                                        onClose={this.handleClose}
                                        // anchorOrigin={{
                                        //     vertical: 'bottom',
                                        //     horizontal: 'center',
                                        // }}
                                        // transformOrigin={{
                                        //     vertical: 'top',
                                        //     horizontal: 'center',
                                        // }}
                                        collabAdd={(data) => {
                                            if (this.props.colaboratorFlag === "UnChecked") {
                                                this.addColaborator(data);
                                            } else {
                                                this.addColaboratorCreateNote(data);
                                            }
                                        }
                                        } />

                               {/* / </div> */}
                                <div className="on-close" style={{ display: this.state.cancel ? 'block' : 'none' }}>
                                    <CloseIcon onClick={this.onCancel} />
                                </div>
                            </div>

                        </div>

                        <div className='collab-btn'>
                            <div className='collab-btn-cnt'>
                                <span onClick={this.closeDialog}>Cancel</span>
                                <span onClick={this.saveCollab}>Save</span>
                            </div>
                        </div>

                    </div>

                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(Collaborators);
