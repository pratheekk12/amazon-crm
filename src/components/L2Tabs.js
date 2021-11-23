
  
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import {AGENT_SERVICE} from 'src/modules/dashboard-360/utils/endpoints'



function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const [l2Interaction,setl2Interaction]= useState({})

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
}));

export default function FullWidthTabs(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [l2Interaction,setl2Interaction]= useState({})


  useEffect(()=>{
    if(Object.keys(props.customer).length !==0 ){

       
        getInteraction()
    }
  },[])




  const getInteraction =()=>{
  //   const data={
  //       id : props.customer.L2ID
  //   }
  //  axios.post(`${AGENT_SERVICE}/interactions/getInteractionbyID`,data)
  //   .then((response)=>{
  //       console.log(response.data)
  //       setl2Interaction(response.data[0].attempt)
      
  //   })
  //   .catch((err)=>{
  //       alert(`error in fetching outbound Interaction ${err.message}`)
  //   })
  }

//   console.log(props.customer,"l1 interaction")
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  console.log(props.l1Interaction,"l1interactoi")

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Customer Details" {...a11yProps(0)} />
          {/* {
            props.l1Interaction != "" &&  <Tab label="Outbound-1 Interaction" {...a11yProps(1)} />
          }
          {
            props.l2Interaction != "" &&  <Tab label="outbound-2 Interaction" {...a11yProps(2)} />
          } */}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
        {
                props.customer && <>
                <TableContainer component={Paper}>
                  <Table size="small" aria-label="customer table">
                    <TableBody>
                      { Object.keys(props.customer).map((e, index) =>  <TableRow key={e}>
                      <TableCell component="th" scope="row">
                              {e}
                      </TableCell>
                      <TableCell align="right">{props.customer[e]}</TableCell>
                      </TableRow>)}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            }
            
        
        
        </TabPanel>
        
      </SwipeableViews>
    </div>
  );
}