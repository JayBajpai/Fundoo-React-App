import React, { Component } from 'react';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import BrushIcon from '@material-ui/icons/Brush';
import './Createnotes.css';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import pin from '../../assests/pin.svg';
import user_services from '../../services/userService';
import Icons from '../Icons/Icons';

const styles = {
    underline: {
        "& .MuiInput-underline:before": {
            position: 'fixed'
        },
        "& .MuiInput-underline:after": {
            position: 'fixed'
        }
    },
    widthInp : {
        "& .MuiInput-underline:before": {
            position: 'fixed',
            height:'50px'
        },
        "& .MuiInput-underline:after": {
            position: 'fixed',
            height:'50px'
        },
        width : '500px'
    }
};

class Createnotes extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open:true,
            title: "",
            note: "",
            responce: false,
            color:"#ffffff",
            collaborators:[]
        }

    }
    handleClick=()=>{
        console.log("hello");
        this.setState({
            open: false
        })
    }

    handleColor=(data)=>{
        this.setState({
            color:data
        });

    }

    handleClickClose=(state1)=>{

        let userData = {
        title: this.state.title,
        description: this.state.note,
        color:this.state.color,
        isArchived:state1,
        }

    if(!this.state.color){
        userData.color = this.state.color;
        console.log("colordata",userData.color);
    }  

    else if(this.state.open !== true && (this.state.title !== "" || this.state.description !== "")){
      
        console.log("success");
        user_services.addNotes(userData).then((data) =>{
            console.log('data after added note',data);
            this.setState({
                open: true,
                title: "",
                note: "",
                responce: true,
                color:""
              },()=>{console.log(this.state);})
            this.props.get();
        })
        .catch(error=>{
            this.setState({
                open: true,
                title: "",
                note: "",
                responce: true,
                color:""
              },()=>{console.log(this.state);})
            console.log('Error',error);
        });
    }
    else{
        console.log("error");
        this.setState({
            open: true,
                title: "",
                note: "",
                responce: true
              },()=>{console.log(this.state);})
    }
}



handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        }, () => { console.log(this.state); })
    }

    render() {
        const { classes } = this.props;
        return (
            <>
          {this.state.open ? (
                <div className="takenote" onClick={this.handleClick} >
                    <div className="input-feild"  >
                        <div className="inputText" type="text" >Take a Note...</div>
                            <div classname="imgIconClose">
                                <CheckBoxOutlinedIcon/>
                                <BrushIcon/>
                                <ImageOutlinedIcon/>
                            </div>
                    </div>
                </div>
        ):( 
                <div className="takenote takenote-open" style={{
                    backgroundColor: this.state.color
                    }}>
                    <div className="input-feild-open">
                        <div className="input-title-note"  >
                            <TextField 
                                id="standard-multiline-flexible" 
                                className={classes.underline,classes.widthInp}
                                name="title"
                                multiline 
                                placeholder="Title"
                                onChange={this.handleInput} />
                            <img src={pin} className="pin-inp" alt="" />
                        </div>
                        <div className="input-title-note">
                            <TextField 
                                id="standard-multiline-flexible" 
                                className={classes.underline,classes.widthInp}
                                name="note"
                                multiline  
                                placeholder="Note"
                                onChange={this.handleInput} />
                        </div>
                        <div className="icon-open">
                        <div className="icon-open-content">
                            <Icons colorval="create" 
                            archiveCreate={()=>this.handleClickClose(true)}
                            val={this.state}  
                            colabFlag="Checked"
                            getClose={() => {
                                this.setState({
                                    open: true
                                   })
                            }}
                            getColor={this.handleColor}
                            />
                        </div>
                            <div onClick={()=>this.handleClickClose(false)} className="icon-open-close">Close</div>

                        </div>
                    </div>
                </div>
         ) }
            </>
        );
    }
}

export default withStyles(styles)(Createnotes);
