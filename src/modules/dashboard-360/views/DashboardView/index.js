import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  makeStyles,
  Typography,
  TextField

} from '@material-ui/core';
import {

  AGENT_SERVICE, AMI
} from 'src/modules/dashboard-360/utils/endpoints';

import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';


import PropTypes from 'prop-types';
import Page from 'src/components/Page';
import BasicTable from 'src/modules/dashboard-360/components/BasicTable';
import MainLoader from 'src/components/MainLoader';
import {
  CallerInteractioncolumns, lastFiveCallData,
} from 'src/modules/dashboard-360/utils/columns-config';
import CommonAlert from 'src/components/CommonAlert';
import { connect, useSelector } from 'react-redux';
import CustomBreadcrumbs from 'src/components/CustomBreadcrumbs';
import CallIcon from '@material-ui/icons/Call';

import { setAgentCurrentStatus } from 'src/redux/action';
import Switch from './switch';
import { setDistributorOrders } from '../../redux/action';
import DispositionForm from './DispositionForm';
import OpenTicketsTable from './openTicketsTable'
import Tabs from 'src/components/L2Tabs.js'
import L2Dispositionform from './L2DispositionForm'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';




const axios = require('axios');


const useStyles = makeStyles(theme => {
  return {
    root: {
      backgroundColor: theme.palette.background.dark,
      minHeight: '100%',
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(3)
    },
    panelBody: {
      padding: 0
    },
    dialogActions: {
      padding: '0 1.5rem 1rem'
    },
    modal: {
      alignItems: 'center',
      width: '100%',
      height: '100%'
    },
    timerComp: {
      position: 'absolute',
      top: 0,
      left: '55%',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '1.2rem',
      backgroundColor: theme.palette.secondary.light,
      padding: '8px 10px',
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8
    },
    callWrapper: {
      left: 'calc(55% + 90px)'
    },
    callInbound: {
      backgroundColor: theme.palette.success.light
    },
    callOutbound: {
      backgroundColor: theme.palette.secondary.light
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      padding: theme.spacing(1, 1)
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  };
});


const Dashboard = ({
  setAgentCurrentStatusAction,
}) => {
  const classes = useStyles();
  const user1 = useSelector(state => state.userData)
  const reduxState = useSelector(state => state);
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [remarks, setRemarks] = useState('');
  const [ticketType, setTicketType] = useState({});
  const [category, setCategory] = useState({});
  const [selectedData1, setSelectedData1] = useState({})
  const [selectedItem, setSelectedItem] = useState({
    CallerName: "",
    agentExtension: "",
    agentID: "",
    asterixUniqueID: "",
    callerapplication: "",
    callermobilenumber: "",
    category: "",
    comments: "",
    contactedNumber: "",
    created: "",
    createdAt: "",
    issuetype: "",
    seccategory: "",
    secsubcategory: "",
    subcategory: "",
    type: "",
    updatedAt: "",
    _id: "",
  })
  const [open, setOpen] = React.useState(false);
  const [searchItem, setSearchItem] = useState("")
  const [customerTable, setCustomertable] = useState([])
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [outbound,setOutbound]=useState(null)
  const [l2AccountID,setL2AccountID] = ("")
  const [callInProgress,setCallProgress]= useState(false)
  const [breakType,setBreakType]= useState(null)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [subCategory, setSubCategory] = useState({
    value: '',
    label: ''
  });
  const [subCategoryItem, setSubCategoryItem] = useState({
    value: '',
    label: ''
  });
  const [currentCall, setCurrentCall] = useState({
    callStatus: '',
    callUniqueId: '',
  });
  const [user, setUserDetails] = useState({
    userType: 'agent'
  });
  const [agent, setAgent] = useState({
    AgentId: '1234',
    AgentType: localStorage.getItem('AgentType'),
    AgentSipId: localStorage.getItem('AgentSIPID')
  });
  const [ALF, setALF] = useState([]);
  const [DLF, setDLF] = useState([]);
  const [disForm, setdisForm] = useState({});
  const [records,setRecords]= useState([])
  

  // console.log(user1)

  
  const callCustomer=async ()=>{
    await axios.get(`${AMI}/actions/originatecall`, {
      params: {
        sipAgentID: `SIP/${localStorage.getItem('AgentSIPID')}`,
        NumbertobeCalled: '0' + localStorage.getItem('L2Caller'),
        Account:localStorage.getItem('L2AccountID')
      }
    })
    .then((res)=>{
     console.log(res,"originate")
      localStorage.setItem('callStarttime',new Date())
      setCallProgress(true)
      let at=parseInt(localStorage.getItem('Attempt'))+1
        console.log(at,"attempt")
        changeStatus("in-progress",at)
     
    })
    .catch((err)=>{
      console.log(err.message)
    })
   
  }


  const getAllOpenTickets =()=>{
    axios.get(`${AGENT_SERVICE}/interactions/getAllOpenTickets`)
        .then((response)=>{
                console.log(response.data.records)
                let i=0;
                let finalData = []
                response.data.records.map((ele)=>{
                    i=i+1;
                    ele.L1_Interaction.id = i
                    ele.L1_Interaction.L2Status = ele.L2Status
                    ele.L1_Interaction.Attempt=ele.Attempt
                    ele.L1_Interaction.L2ID=ele.L2_AccountCode
                    ele.L1_Interaction.L1_InteractionID = ele.L1_InteractionId
                    delete ele.L1_Interaction.AgentObject_ID
                    delete ele.L1_Interaction.Agent_SIP
                    finalData.push(ele.L1_Interaction)
                })
                
                setRecords(finalData)
            
            
        })
        .catch((err)=>{
            alert(`Error in fetching Tickets -${err.message} `)
        })
}

  const customerCalled =()=>{
    setCallProgress(false)
  }



  function setCurrentCallDetails(
    callStatus,
  ) {
    setCurrentCall({
      callStatus,
    });
    localStorage.setItem('callStatus', callStatus);
  }

  function addToQueue() {
    var axios = require('axios');
    var config = {
      method: 'get',
      url: `${AMI}/actions/break?Queue=${localStorage.getItem('Queue')}&Interface=SIP%2F${localStorage.getItem('AgentSIPID')}&Reason=BREAKOUT&Break=false`,
      headers: {}
    };

    axios(config)
      .then(function (response) {
        console.log((response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function removeFromQueue() {
    var axios = require('axios');
      var config = {
        method: 'get',
        url: `${AMI}/actions/break?Queue=${localStorage.getItem('Queue')}&Interface=SIP%2F${localStorage.getItem('AgentSIPID')}&Reason=BREAKIN&Break=true`,
        headers: {}
      };

      axios(config)
        .then(function (response) {
          console.log((response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
  }
  
  

  const changeStatus=async(status,attempt)=>{

    const data={
     "id":localStorage.getItem('L2AccountID'),
     "status":status,
     "attempt":attempt
   }

   console.log(attempt,"change required")
   await axios.post(`${AGENT_SERVICE}/interactions/changeStatus`,data)
    .then((res)=>{
      console.log(res.data,"status ************************************")
      getAllOpenTickets()
    })
    .catch((err)=>{
      console.log(err)
    })
 }

 useEffect(()=>{
  getAllOpenTickets()
},[])



  function getAgentCallStatus(agentSipID) {
    // console.log('calling the', agentSipID);

    var axios = require('axios');

    var config = {
      method: 'get',
      url: `${AGENT_SERVICE}/agents/${agentSipID}`,
      headers: {}
    };

    axios(config)
      .then(function (response) {
        // console.log((response.data));
        setCurrentCallDetails(
          response.data.Event,
          localStorage.setItem('Interaction_id', response.data.InteractionID),
          localStorage.setItem('CallerNumber', response.data.CallerIDNum)
        )
        if (response.data.Paused === '1') {
          localStorage.setItem('Break_Status', 'IN')
        } else {
          localStorage.setItem('Break_Status', 'OUT')
        }
        localStorage.setItem('Queue', response.data.Queue)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const resumeWork =(event)=>{
    if (localStorage.getItem('Break_Status') === 'IN') {
      // alert(`i am called`)
    const AgentSIPID = localStorage.getItem('AgentSIPID')
    axios.get(`${AMI}/actions/break?Queue=${localStorage.getItem('Queue')}&Interface=SIP%2F${AgentSIPID}&Reason=BREAKOUT&Break=false`)
      .then((res)=>{
        console.log(res.data)
        changeEventforBreak("BREAKOUT")
        setBreakType("")
      })
      .catch((err)=>{
        console.log(err.message)
      })
    }
  }

  const TakeaBreak =(event)=>{
    if (localStorage.getItem('Break_Status') === 'OUT') {
      //alert(`i am called`)
      const AgentSIPID = localStorage.getItem('AgentSIPID')
      console.log(" i am here")
    axios.get(`${AMI}/actions/break?Queue=${localStorage.getItem('Queue')}&Interface=SIP%2F${AgentSIPID}&Reason=${breakType}&Break=true`)
      .then((res)=>{
        console.log(res.data)
        changeEventforBreak("BREAKIN")
      })
      .catch((err)=>{
        console.log(err.message)
      })
    }
  }

  const handlebreakChange =(e)=>{
    setBreakType(e.target.value)
  }

  // function breakService() {
  //   console.log("called from dispos")
  //   const AgentSIPID = localStorage.getItem('AgentSIPID')
  //   if (localStorage.getItem('Break_Status') === 'OUT') {
  //     var axios = require('axios');
  //     var config = {
  //       method: 'get',
  //       url: `${AMI}/actions/break?Queue=${localStorage.getItem('Queue')}&Interface=SIP%2F${AgentSIPID}&Reason="TEABREAK"&Break=true`,
  //       headers: {}
  //     };

  //     axios(config)
  //       .then(function (response) {
  //         console.log((response.data));
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   } else {
      
  //   }

  // }

  useEffect(() => {

    async function getInitialData() {
      try {
        await getAgentCallStatus(localStorage.getItem('Agent_Object_ID'));
      } catch (err) {
        console.log('err', err);
      }
    }
    getInitialData();
    setLoadingDetails(false);



  }, []);



  useEffect(() => {
    const agentSipID = localStorage.getItem('Agent_Object_ID')
    const interval = setInterval(async () => {
      if(localStorage.getItem('AgentType')){
        const GET_CURRENT_STATUS_BY_AGENT_SIP_ID = `${AGENT_SERVICE}/agents/${localStorage.getItem('Agent_Object_ID')}`;
        const getCurrentStatus = await axios.get(GET_CURRENT_STATUS_BY_AGENT_SIP_ID);
        console.log('getCurrentStatus', getCurrentStatus)
        getAgentCallStatus(agentSipID)
      }
    }, 3000);

  }, [])



  useEffect(() => {
   


    if (
      currentCall.callerNumber !== '' &&
      currentCall.callDispositionStatus === 'NotDisposed'
    ) {
      // getDLF();

    }
    // getALF();
    if (localStorage.getItem('Agenttype') === 'L1') {
      // getOpenTickets('L1', 'open');
    }
    if (localStorage.getItem('Agenttype') === 'L2') {
      // getOpenTickets('L1', 'open');
    }
    if (localStorage.getItem('Agenttype') === 'L3') {
      // getOpenTickets('L2', 'open');
    }

  }, [
    currentCall.callDispositionStatus,
    currentCall.callStatus,
    currentCall.breakStatus
  ]);

  const handleSearch = (e) => {
    setSearchItem(e.target.value)
  }

  const searchaction = (e) => {
    let config = {
      method: 'get',

      url: `http://164.52.205.10:42004/crm/callermobilenumber?callermobilenumber=${searchItem}`,
      headers: {
        'Content-Type': 'application/json'
      },

    };
    axios(config)
      .then(response => {
        console.log('Response data', JSON.stringify(response.data));
        setCustomertable(response.data)
        // props.getALF();
      })
      .catch(error => {
        console.log('dispostionFrom', error);
      });
  }

  const changeEventforBreak =(event)=>{
    var axios = require('axios');
    var data = JSON.stringify({ "Event": event });

    var config = {
      method: 'put',
      url: `${AGENT_SERVICE}/agents1/${localStorage.getItem('Agent_Object_ID')}`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data), "status changed");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const changeEvent =(event)=>{
    var axios = require('axios');
    var data = JSON.stringify({ "Event": event });

    var config = {
      method: 'put',
      url: `${AGENT_SERVICE}/agents1/${localStorage.getItem('Agent_Object_ID')}`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data), "status changed");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const changeAgentType =()=>{
    if(localStorage.getItem('AgentType') === 'Inbound'){
      removeFromQueue()
      localStorage.setItem('AgentType','Outbound')
      changeEvent("Outbound")
      getAllOpenTickets()
     

    }else{
      addToQueue()
      localStorage.setItem('AgentType','Inbound')
      changeEvent("LoggedIn")
    }
  }


const clearScreen=()=>{
  setCallProgress(false)
  setOutbound(null)
  
}

  return !loadingDetails ? (
    <div style={{ position: 'relative' }}>
      {
        localStorage.getItem('role') === 'agent'  ? (
         <div>
           {
             localStorage.getItem('AgentType') === 'Inbound' &&  <Box
             alignItems="center"
             display="flex"
             className={`${classes.timerComp} ${classes.callWrapper} ${classes.callInbound}`}
           >
             {
               currentCall.callStatus === 'AgentCalled' ? (<div>
                 <CallIcon />
           &nbsp;
                 <Typography display="inline">
                   {/* {localStorage.getItem('callerNumber')} */}
         Call Ringing
       </Typography>
               </div>) : null
             }
             {
               currentCall.callStatus === 'AgentConnect' ? (<div>
                 <CallIcon />
           &nbsp;
                 <Typography display="inline">
                   {/* {localStorage.getItem('callerNumber')} */}
                   {localStorage.getItem('CallerNumber')}-Call in Progress
       </Typography>
               </div>) : null
             }
             {
               currentCall.callStatus === 'AgentComplete' ? (<div>
                 <CallIcon />
           &nbsp;
                 <Typography display="inline">
                   {/* {localStorage.getItem('callerNumber')} */}
                   {localStorage.getItem('CallerNumber')}- Call Disconnected
       </Typography>
               </div>) : null
             }
             {
               currentCall.callStatus === 'AgentDisposed' || currentCall.callStatus === 'LoggedIn' || currentCall.callStatus === 'BREAKOUT' ? (<div>
                 <CallIcon />
           &nbsp;
                 <Typography display="inline">
                   {/* {localStorage.getItem('callerNumber')} */}
        Free for next call
       </Typography>
               </div>) : null
             }
             {
               currentCall.callStatus === 'BREAKIN' ? (<div>
                 <CallIcon />
           &nbsp;
                 <Typography display="inline">
                   {/* {localStorage.getItem('callerNumber')} */}
                 You are in Break
       </Typography>
               </div>) : null
             }
             {
               currentCall.callStatus === 'AgentRingNoAnswer' ? (<div>
                 <CallIcon />
           &nbsp;
                 <Typography display="inline">
                   {/* {localStorage.getItem('callerNumber')} */}
        Call Not Answered
       </Typography>
               </div>) : null
             }

           </Box>
           }
           
          
            <CustomBreadcrumbs />
            <Page className={classes.root} title="Dashboard">
              <Container maxWidth={false}>
              <Grid container spacing={3}>
                  <Grid item lg={4} md={6} xs={12}>
                  
                    {
                      localStorage.getItem('AgentType') === 'Inbound' &&  localStorage.getItem('Break_Status') === 'OUT' && <Grid item>
                        <FormControl variant="outlined" className={classes.formControl}>
                          <InputLabel id="demo-simple-select-outlined-label">Break</InputLabel>
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={breakType}
                            onChange={handlebreakChange}
                            label="Break"
                           
                          >
                            <MenuItem value="">
                             Select type of break
                            </MenuItem>
                            <MenuItem value="Tea Break">Tea Break</MenuItem>
                            <MenuItem value="Lunch Break">Lunch Break</MenuItem>
                            <MenuItem value="Other Break">Other Break</MenuItem>
                          </Select>
                        </FormControl>
                      {breakType && <>
                      
                      {currentCall.callStatus === 'AgentDisposed' || currentCall.callStatus === 'LoggedIn' || currentCall.callStatus === 'BREAKOUT' || currentCall.callStatus === 'BREAKIN' && localStorage.getItem('Agent')  ? (<Button variant="contained" color="primary" onClick={TakeaBreak}>Take Break </Button>) : (null)

                      }&nbsp;
                      
                      </>}

                    </Grid>
                    }

                    {
                      localStorage.getItem('Break_Status') === 'IN' && currentCall.callStatus !== 'AgentConnect' && currentCall.callStatus !== 'AgentComplete' && currentCall.callStatus !== 'AgentCalled' &&  <Grid item lg={4} md={6} xs={12}>
                        <Button variant="contained" color="primary" onClick={resumeWork} >Resume Work </Button>
                      </Grid>
                    }
                    </Grid>
                    <Grid  item lg={8} md={8} xs={8}> </Grid>
                    
                    <Grid  item lg={4} md={6} xs={6}>
                     
                      {<Button variant="contained" color="primary" onClick={changeAgentType}>{localStorage.getItem('AgentType') === 'Inbound' ? ('Switch to Outbound') : ('Switch to Inbound')}</Button>

                      }

                   
                    </Grid>
                    <Grid item lg={4} md={6} xs={6}></Grid>
                    {
                      outbound && !callInProgress && <Grid item lg={4} md={6} xs={6}>
                      <Button variant="contained" color="primary" onClick={callCustomer}><CallIcon/> &nbsp;call customer</Button>
                      </Grid>
                    }
                    
                    
                    
                    <Grid item lg={12} md={12} xs={12}></Grid>
                    <Grid item>
                      
                      
                    </Grid>
                   
                 
                </Grid>
                
                <Grid container spacing={3}>
                  {
                    localStorage.getItem('AgentType') === 'Inbound' && <Grid item lg={6} md={6} xs={12}>
                    <Card>
                        <CardHeader title="Customer Details" />
                        <Divider />
                      </Card>
                    </Grid>
                    }
                    {
                      outbound &&  <Grid item lg={6} md={6} xs={12}>
                      <Tabs customer={outbound}/> 
                    </Grid>
                    }
                  <Grid item lg={6} md={6} xs={12}>
                    {
                      localStorage.getItem('AgentType') === 'Inbound' &&  <Card>
                      <CardHeader title="Disposition Details" />
                      <Divider />
                      {currentCall.callStatus !== 'AgentDisposed' &&
                        user.userType === 'agent' && currentCall.callStatus == 'LoggedIn' && currentCall.callStatus !== 'AgentRingNoAnswer' && currentCall.callStatus !== 'BREAKOUT' && currentCall.callStatus !== 'BREAKIN' && currentCall.callStatus !== 'LoggedOut' && currentCall.callStatus !== '0' ? (<CardContent>
                          <DispositionForm
                            breakService={resumeWork}
                            agentSipID={agent.AgentSipId}
                            DLF={DLF}
                            setCurrentCallDetails={setCurrentCallDetails}
                            addToQueue={addToQueue}
                            removeFromQueue={removeFromQueue}
                            selectedData1={selectedData1}
                            // getALF={getALF}
                            disForm={disForm}
                            setdisForm={form => {
                              setdisForm(form);
                            }}
                            category={category}
                            setCategory={cat => {
                              setCategory(cat);
                            }}
                            ticketType={ticketType}
                            setTicketType={tkstyp => {
                              setTicketType(tkstyp);
                            }}
                            subCategory={subCategory}
                            setSubCategory={subcat => {
                              setSubCategory(subcat);
                            }}
                            subCategoryItem={subCategoryItem}
                            setSubCategoryItem={subcatitem => {
                              setSubCategoryItem(subcatitem);
                            }}
                            remarks={remarks}
                            setRemarks={rks => {
                              setRemarks(rks);
                            }}
                            currentCall={currentCall.callStatus}
                          />
                        </CardContent>
                      ) : (<></>)}
                    </Card>
                    }
                   {
                     localStorage.getItem('AgentType') === 'Outbound' &&  callInProgress && <Card>
                     <CardHeader title="Disposition Details" />
                     <Divider />
                       <L2Dispositionform clearScreen={clearScreen} changeStatus={changeStatus}/>
                   </Card>
                   }
                   
                  </Grid>
                  {
                    localStorage.getItem('AgentType') === 'Inbound' &&  <Grid item lg={6} md={6} xs={12}>
                    <Card>
                        <CardHeader title="Customer last Three Interactions" />
                        <Divider />
                      </Card>
                    </Grid>
                  }
                 {
                   !callInProgress && localStorage.getItem('AgentType') === 'Outbound' &&  <Grid item lg={12} md={12} xs={12}>
                   <OpenTicketsTable setOutbound={setOutbound} setL2AccountID={setL2AccountID} records={records} getAllOpenTickets ={getAllOpenTickets}/>
               </Grid>
                 }
                

                </Grid>

              </Container>
            </Page>

            {/* <Dialog
              fullScreen={fullScreen}
              open={open}
              onClose={handleClose}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">{"Outbound Call"}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are You sure, You Want to make a Outbound Call ?
          </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleClose} color="primary">
                  Close
          </Button>
                <Button onClick={makeCall} color="primary" autoFocus>
                  Make A Call
          </Button>
              </DialogActions>
            </Dialog> */}
          </div>
        ) : (<div>

        </div>)
      }


    </div>
  ) : (
    <MainLoader />
  );
};
Dashboard.propTypes = {
  distributorOrders: PropTypes.arrayOf(PropTypes.object),
  agentCurrentStatus: PropTypes.arrayOf(PropTypes.object),
  setDistributorOrdersAction: PropTypes.func,
  setAgentCurrentStatusAction: PropTypes.func,
  searchDistributor: PropTypes.string
};

const mapStateToProps = state => {
  return {
    distributorOrders: state.distributorOrders,
    agentCurrentStatus: state.currentCall,
    searchDistributor: state.searchDistributor
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setDistributorOrdersAction: orders =>
      dispatch(setDistributorOrders(orders)),
    setAgentCurrentStatusAction: currentCall =>
      dispatch(setAgentCurrentStatus(currentCall)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);


