import React, { Component } from 'react';
import Createnotes from '../createNotes/Createnotes';
import user_services from '../../services/userService'; 
import Displaynotes from '../displayNotes/Displaynotes';
import './notemaker.css'

class NoteMaker extends Component {

constructor(props)
{
    super(props);

}


note=(val)=>{
    return( <Displaynotes value={val} get = {this.props.get}/>)
}


    render() {
        // console.log(this.props.value);
        return (
            <>
            <div className="note-disp">
               {this.props.value.filter((element) => {
                        return element.isArchived === false && element.isDeleted === false;
                    }).reverse().map(this.note)}
            </div>
            </>
        );
    }
}

export default NoteMaker;
