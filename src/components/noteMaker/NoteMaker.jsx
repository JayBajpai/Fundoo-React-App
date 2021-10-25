import React, { Component } from 'react'; 
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
