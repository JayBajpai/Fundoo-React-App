import React, { Component } from 'react';
import user_services from '../../services/userService'; 
import './Header.css';
import Createnotes from '../createNotes/Createnotes';
//import Displaynotes from '../displayNotes/Displaynotes';
import NoteMaker from '../noteMaker/NoteMaker';

class GetNote extends Component {
    constructor(props) {
        super(props);
        this.state={
            notes:[]
        }
        // this.getNotes();
    }

    componentDidMount() {
        this.getNotes();
      }
    
    getNotes = () =>{
        user_services.getAllNotes().then((data) =>{
            console.log(data);
            this.setState({
                notes:data.data.data.data
            });
            
    
        }).catch(error=>{
          console.log("error",error);
        })
    }
    render() {
        return (
            <div className="create">
                <Createnotes get={this.getNotes}/>
                <NoteMaker value={this.state.notes} get={this.getNotes}/>
            </div>

        );
    }
}

export default GetNote;
