import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Avatar from '@material-ui/core/Avatar';
import './Header.css';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import user_services from '../../services/userService'; 

const useStyles = makeStyles((theme) => ({
  paper: {
    border: '1px #cdcbcb solid',
    padding: theme.spacing(1),
    backgroundColor: 'white',
    marginTop:'30px',
    height:'260px',
    borderRadius:"7px",
    width:'250px'
  },
  margin: {
    margin: theme.spacing(1),
  }
}));

export default function SimplePopper() {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const signOut=()=> {
    localStorage.clear();
    user_services.signOut().then((data) => {
        history.push("/");
      }).catch(error => {
      });
    history.push("/");
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <div>
      <Avatar alt="Jay Bapai" 
        src="" 
        aria-describedby={id} type="button" onClick={handleClick}/>
      {/* <AccountCircle aria-describedby={id} type="button" onClick={handleClick}/> */}
      <Popper id={id} open={open} anchorEl={anchorEl} placement={'bottom'}>
        <div className={classes.paper}>
            <div className="profile">
                <div className="profile-content">
                    <img className="profile-img" src="" alt=""/>
                </div>
                <div className="profile-content profile-content-name">{localStorage.getItem('first')} {localStorage.getItem('last')}</div>
                <div className="profile-content">{localStorage.getItem('email')}</div>
                <div className="profile-content profile-content-icon">
                    <Button variant="contained" 
                    size="small" 
                    color="primary"
                    onClick={signOut} 
                    className={classes.margin}>Sign Out</Button>
                    </div>
            </div>
        </div>
      </Popper>
    </div>
  );
}
