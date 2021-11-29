import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import {Link} from 'react-router-dom'

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'right' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
      <ListItem button >
        <ListItemIcon><MailIcon /></ListItemIcon>
        <Link to="/dashboard"><ListItemText primary={'Manage Agents'} /></Link>
        {/* <ListItemText primary={'Manage Agents'} /> */}
      </ListItem><Divider />
      <ListItem button >
        <ListItemIcon><MailIcon /></ListItemIcon>
        <Link to="/interactionreport"><ListItemText primary={'Interaction Report'} /></Link>
      </ListItem><Divider />
      <ListItem button >
        <ListItemIcon><MailIcon /></ListItemIcon>
        <Link to="/cdr_Reports"><ListItemText primary={'CDR Report'} /></Link>
        
        {/* <ListItemText primary={'CDR Report'} /> */}
      </ListItem><Divider /> 
      <ListItem button >
        <ListItemIcon><MailIcon /></ListItemIcon>
        <Link to="/cdr_Reports"><ListItemText primary={'Outbound Tickets'} /></Link>
        
        {/* <ListItemText primary={'CDR Report'} /> */}
      </ListItem><Divider /> 
      <ListItem button >
        <ListItemIcon><MailIcon /></ListItemIcon>
        <Link to="/cdr_Reports"><ListItemText primary={'Outbound Interactions'} /></Link>
        
        {/* <ListItemText primary={'CDR Report'} /> */}
      </ListItem><Divider /> 
      <ListItem button >
        <ListItemIcon><MailIcon /></ListItemIcon>
        <Link to="/cdr_Reports"><ListItemText primary={'Outbound CDR'} /></Link>
        
        {/* <ListItemText primary={'CDR Report'} /> */}
      </ListItem><Divider />
      <ListItem button >
        <ListItemIcon><MailIcon /></ListItemIcon>
        <Link to="/agentPerformance"><ListItemText primary={'Agent Performance'} /></Link>
        
        {/* <ListItemText primary={'CDR Report'} /> */}
      </ListItem><Divider /> 

      
      </List>
    </div>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}style={{color:'white'}}>Reports</Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}