import React, { Component } from 'react';
import './Icons.css';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';

import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Popper from './popper';
import user_services from '../../services/userService';
import Tooltip from '@material-ui/core/Tooltip';
import Collaborators from '../Collaborators/Collaborators';
import image from '../../assests/image.svg';

class Icons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            openStatus: false,
            title: '',
            description: '',
            file:'',
            noteId: '',

        }

    }
    handleClose = () => {
        this.setState({
            anchorEl: null
        })

    };

    menuClick = (event) => {
        this.setState({

            anchorEl: event.currentTarget
        })
    }

    onSetColor = (color) => {
        if (this.props.colorval === "update") {
            let Data = {
                color: color.code,
                noteIdList: [this.props.val.id]
            };
            user_services.changeColor(Data).then((data) => {
                console.log('Color Note', data);
                this.props.get();
            }).catch(error => {
                console.log('Color error', error);
            });
            console.log("Color", Data);
        } else {
            this.props.getColor(color.code);
        }
    }

    onSetStatus = (val) => {
        this.setState({
            openStatus: val
        });
    }

    dialogopen = () => {
        this.setState({
            openStatus: true
        });
    }

    image = (e) => {
        console.log(e.target.files[0])
    const formData = new FormData();
        debugger;
    formData.append('noteId',Boolean(this.state.noteId) ? this.state.noteId : this.props.id)
    formData.append('file', e.target.files[0].name)
    formData.append("title",Boolean(this.state.title) ? this.state.title : this.props.val.title )
    formData.append("description",Boolean(this.state.description) ? this.state.description : this.props.val.description )
      
    console.log("FormData",e.target.files[0].name);
    user_services.updateNote(formData).then((data) => {
        console.log('Update Note', data);
    }).catch(error => {
        console.log('Update error', error);
    })
}



fileChangedHandler = (event) => {
    event.preventDefault();
    debugger;
    console.log(event.target.files[0]);
    this.setState({ file: event.target.files[0] });
  };

    render() {
        return (
            <div>
                <div className="icon-open-content">
                    <div className="note-icons-hover">
                        <Tooltip title="Reminder">
                            <AddAlertOutlinedIcon className="i-disp" />
                        </Tooltip>
                    </div>
                    <div className="note-icons-hover">
                        <Tooltip title="Collaborator">
                            <PersonAddOutlinedIcon className="i-disp" onClick={this.dialogopen} />
                        </Tooltip>
                    </div>
                    <div className="note-icons-hover">
                        <Popper putColor={(Data) => {
                            this.onSetColor(Data);
                        }} />
                    </div>
                    <div className="note-icons-hover">
                        <Tooltip title="Image">
                          
                            <label htmlFor="icon-button-photo">
                            <input
                            type="file"
                            style={{ display: "none" }}
                            
                            onChange={(e) => this.image(e)}
                            ref={(fileUpload) => (this.fileUpload = fileUpload)}
                            ></input>
                            <img
                            className="file"
                            onClick={() => this.fileUpload.click()}
                            file={() => this.fileChangedHandler}
                            src={image}
                            label="New note with image"
                            alt="new note"
                            />
                         
                        </label>
                        </Tooltip>
                    </div>
                    <div className="note-icons-hover">
                        <Tooltip title="Archive">
                            <ArchiveOutlinedIcon className="i-disp" onClick={() => {
                                if (this.props.colorval === "update") {
                                    this.props.archive()
                                }
                                else {
                                    this.props.archiveCreate()
                                }
                            }} />
                        </Tooltip>
                    </div>
                    <div style={{position: 'relative'}}>
                        <div className="note-icons-hover">
                            <Tooltip title="More">
                                <MoreVertOutlinedIcon className="i-disp" onClick={this.menuClick} />
                            </Tooltip>
                        </div>

                        <Menu
                            id="simple-menu"
                            keepMounted
                            anchorEl={this.state.anchorEl}
                            onClose={this.handleClose}
                            open={Boolean(this.state.anchorEl)}
                        >
                            <MenuItem onClick={() => {
                                if (this.props.deleteNote === "deleteUpdate") {
                                    this.props.delete()
                                    this.handleClose()
                                }
                                else{
                                    this.props.delete()
                                    this.handleClose()
                                   
                                }
                            }
                            }
                            >Delete Node</MenuItem>
                            <MenuItem >Add Label</MenuItem>
                            <MenuItem >Add Drawing</MenuItem>
                            <MenuItem >Make a Copy</MenuItem>
                            <MenuItem >Show Checkboxes</MenuItem>

                        </Menu>

                    </div>
                </div>
                <Collaborators
                    open={this.state.openStatus}
                    note={this.props.val}
                    colaboratorFlag={this.props.colabFlag}
                    getCloseStatus={(Data) => {
                        this.onSetStatus(Data);
                    }}

                    getDetails ={this.props.getClose}
                    getNotes={() =>  this.props.get } />
            </div>
        );
    }
}

export default Icons;
