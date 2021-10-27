import React from 'react';
import Popper from '@material-ui/core/Popper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        width: '390px',
        maxHeight: '200px',
        borderRadius: '3px',
        backgroundColor: 'white',
        overflow: 'scroll',
        '@media(minWidth: 780px)' : {
            width: '80%'
        }
    },
    pop: {
        zIndex: "10000",
        width: '100%',
        height: '100%',
        position: 'absolute !important',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        top: '27% !important',
        left: '0px !important'
        
    }
  }));
export default function CollabPoper(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const list = (val) => {
        return (
            <div style={{
                height: '35px',
                cursor: 'pointer',
                padding: '6px',
                '&:hover': {
                    backgroundColor: 'grey'
                }
            }}
                onClick={() => {
                    props.collabAdd(val);
                }}>
                {val.email}
            </div>
       )
    }

    return (
        <>
            <Popper className={classes.pop} open={props.open} anchorEl={anchorEl}>
                <div className={classes.paper} >{props.List.map(list)}</div>
            </Popper>
        </>
    );
}

