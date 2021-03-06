import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// import config from '../modules/ticketing/views/config.json';
import { Link, Link as RouterLink, useHistory } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles,
  Typography,
  InputBase,
  fade,
  Tooltip,
  Button
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import Logo from 'src/modules/dashboard-360/components/Logo';
import { SearchIcon } from '@material-ui/data-grid';
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { setLoggedIn, setSearchDistributor } from 'src/redux/action';
import { connect } from 'react-redux';
import Axios from 'axios';
import { SET_SEARCH_DISTRIBUTOR } from 'src/redux/constants';
import { changeAgentStatus } from 'src/modules/dashboard-360/views/functions';
import Drawer from './Drawer'
import GRLOGO from './grLogo'

import {

  AGENT_SERVICE,
  AMI
} from 'src/modules/dashboard-360/utils/endpoints';
const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    width: 60,
    height: 60
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(4),
      width: 'auto'
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontWeight: 500,
    marginRight: 15,
    fontSize: '0.96rem',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  inputRoot: {
    color: 'white'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '18ch',
      '&:focus': {
        width: '30ch'
      }
    }
  }
}));

var APIENDPOINT = 'http:///';
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// addToQueue start //////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function addToQueue(agentId, queue) {
  var axios = require('axios');
  var data = JSON.stringify({
    agentId: agentId,
    queue: queue,
    action: 'QueueAdd'
  });

  var config = {
    method: 'get',
    url:
      APIENDPOINT +
      '/ami/actions/addq?Interface=' + agentId + '&Queue=' +
      queue +
      '',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  axios(config)
    .then(function (response) { })
    .catch(function (error) {
      console.log(error);
    });
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// addToQueue end //////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// removeFromQueue start //////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function removeFromQueue(agentId, queue) {
  var axios = require('axios');
  console.log('remove', agentId)
  var data = JSON.stringify({
    agentId: agentId,
    queue: queue,
    action: 'QueueRemove'
  });

  var config = {
    method: 'get',
    url:
      APIENDPOINT +
      '/ami/actions/rmq?Queue=' +
      queue +
      '&Interface=' + agentId + '',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  axios(config)
    .then(function (response) {
      console.log(response)
      // window.location.reload()
    })
    .catch(function (error) {
      console.log(error);
    });
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// removeFromQueue end //////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////




const TopBar = ({
  className,
  onMobileNavOpen,
  logout,
  searchDist,
  ...rest
}) => {
  const userData = useSelector(state => state.userData);
  const [createAccess, setCreateAccess] = useState(-1);
  const [viewAccess, setViewAccess] = useState(-1);
  const [assignAccess, setAssignAccess] = useState(-1);
  const [reportsAccess, setReportsAccess] = useState(-1);
  const [editAccess, setEditAccess] = useState(-1);
  const [role, setRole] = useState(-1);
  const classes = useStyles();
  const [notifications] = useState([]);
  const [searchText, setSearchText] = useState('');
  useEffect(() => {

  }, []);
  const updateSearchText = evt => {
    setSearchText(evt.target.value);
  };
  const distributorID = evt => {
    console.log('searchText', searchText);
    searchDist(searchText);
  };
  async function logoutUser() {

    if (localStorage.getItem('role') === 'admin') {
      logout()
      localStorage.clear()
      window.location.reload()
    }

    
      var axios = require('axios');
      var data = JSON.stringify({ "Event": "LoggedOut" });

      var config = {
        method: 'put',
        url: `${AGENT_SERVICE}/agents/${localStorage.getItem('Agent_Object_ID')}`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };

      await axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data), "status changed");
        })
        .catch(function (error) {
          console.log(error);
        });

      var axios = require('axios');
      var data = '';

      var config = {
        method: 'get',
        url: `${AMI}/actions/rmq?Queue=${localStorage.getItem('Queue')}&Interface=SIP/${localStorage.getItem('AgentSIPID')}`,
        headers: {},
        data: data
      };

      await axios(config)
        .then(function (response) {
          console.log(response.data, "removed from queue");
        })
        .catch(function (error) {
          console.log(error);
        });

      const AgentSIPID = localStorage.getItem('AgentSIPID')
      var axios = require('axios');
      var config = {
        method: 'get',
        url: `${AMI}/actions/break?Queue=${localStorage.getItem('Queue')}&Interface=SIP%2F${AgentSIPID}&Reason=BREAK_IN&Break=true`,
        headers: {}
      };

      await axios(config)
        .then(function (response) {
          console.log((response.data));
          logout()
          localStorage.clear()
          window.location.reload()

        })
        .catch(function (error) {
          console.log(error);
        });
    
  }
  var test = "#FF8F00"
  return (
    <AppBar className={clsx(classes.root, className)} elevation={0} {...rest} style={{ background: `${test}` }}>
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>


        <Box flexGrow={1} />
        <Hidden mdDown>
          {localStorage.getItem("role") === "Agent" ? <Typography className={classes.title} variant="h5" noWrap>
            <Link to="/dash360" className="color-white">
              Agent {localStorage.getItem('Agenttype') + ' ' + localStorage.getItem('AgentSIPID')}
            </Link>
          </Typography> : <></>}

          {viewAccess === -1 ? (
            ''
          ) : (
            <></>
          )}


         {
           localStorage.getItem('role') === 'admin' && <Typography><Drawer/></Typography>
         }
        
         <GRLOGO />
          <Tooltip title="Logout">
            <IconButton color="inherit" onClick={() => logoutUser()}>
              <ExitToAppIcon />
            </IconButton>
          </Tooltip>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};
const mapStateToProps = state => ({
  searchtextdist: state.searchDistributor
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(setLoggedIn(false)),
  searchDist: val => dispatch(setSearchDistributor(val))
});

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func,
  logout: PropTypes.func,
  searchDist: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
