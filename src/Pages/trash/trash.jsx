import React from 'react';
import Displaynotes from '../../components/displayNotes/Displaynotes';

class Trash extends React.Component{
  
    note=(val)=>{
        return( <Displaynotes value={val} get = {this.props.get}/>)
    }

    render(){
        return(
            <div className="note-disp">
            {this.props.value.filter((element) => {
                return element.isDeleted === true;
            }).reverse().map(this.note)}
            </div>
        )
    }

}


export default Trash;
