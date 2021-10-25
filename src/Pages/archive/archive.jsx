import React from 'react';
import Displaynotes from '../../components/displayNotes/Displaynotes';


class Archive extends React.Component{
 
    note=(val)=>{
        return( <Displaynotes value={val} flag={true} get = {this.props.get}/>)
    }

    render(){ 
        return(
            <div className="note-disp">
            {this.props.value.filter((element) => {
                return element.isArchived === true;
            }).reverse().map(this.note)}
            </div>
        )
    }

}

export default Archive;
