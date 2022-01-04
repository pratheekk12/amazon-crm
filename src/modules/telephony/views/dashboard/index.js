import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { DataGrid } from '@material-ui/data-grid';
import Dialog from './Auto-report/dialog'
import AddIcon from '@material-ui/icons/Add';

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {
    Avatar,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    makeStyles,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Card,
    CardContent,
    CardHeader,
    Box,
    Button,
    TextField,
    Paper,
    Snackbar,
    Tooltip,
    IconButton
} from '@material-ui/core';
import {
    MenuItem, InputLabel, Select,
    FormControl
} from '@material-ui/core'
import { grey } from '@material-ui/core/colors';
import moment from 'moment';
import { propTypes } from 'react-bootstrap/esm/Image';
import Dialog1 from './Auto-report/updatedialog'
import { date } from 'yup';
import { AGENT_PERFORMANCE, AGENT_SERVICE, AUTH } from 'src/modules/dashboard-360/utils/endpoints'
import Popup from './Auto-report/PopUp';


const Inbound = (props) => {

    const [profiles1, setProfiles1] = useState([]);
    const [agents, setAgents] = useState([])
    const [liveCalls, setLivecalls] = useState([])
    const [breakdetails, setBreakdetails] = useState([])
    const [agentsFree, setAgentsFree] = useState([])
    const [idle, setIdle] = useState([])
    const [update, setUpdate] = useState({})
    const [show, setShow] = useState(false)


    const profilesColumns = [
        {
            headerName: 'Name',
            field: 'name',
            flex: 0.5

        },
        {
            headerName: 'Actions',
            field: 'id',

            renderCell: rowData => (
                <>
                    <Tooltip title="update">
                        <IconButton
                            onClick={() => <Dialog1 update={rowData.row} />}
                        ><Typography>{rowData.row.id}</Typography>
                        </IconButton>
                    </Tooltip>
                </>
            ),
            flex: 0.5
        },

        {
            headerName: 'Email',
            field: 'UserName',
            flex: 0.5
        },
        {
            headerName: 'Queue',
            field: 'Queue',
            flex: 0.5
        },
    ]
    const agentStatusColumn = [
        {
            headerName: 'SIP',
            field: 'Location',
            flex: 1

        },
        {
            headerName: 'Name',
            field: 'name',
            flex: 1

        },
        {
            headerName: 'Status',
            field: 'Event',
            flex: 1
        },
        {
            headerName: 'Duration',
            field: 'Mduration',
            flex: 1
        },

        {
            headerName: 'Actions',
            field: '',

            renderCell: rowData => (
                <>
                   <div>
                        <Tooltip title="Delete Agent">
                        
                               
                            <Button variant="contained" onClick={() => handleremoveagent(rowData.row._id)} ><DeleteForeverIcon /></Button>
                           
                        </Tooltip>
                      </div>
                    

                </>
            ),
            flex: 1.1
        },


    ]
    const liveCallsColumn = [

        {
            headerName: 'Name',
            field: 'name',
            flex: 1

        },
        {
            headerName: 'Customer Number',
            field: 'CallerIDNum',
            flex: 1
        },
        {
            headerName: 'Status',
            field: 'Event',
            flex: 1
        },
        {
            headerName: 'Duration',
            field: 'Mduration',
            flex: 1
        }
    ]
    const callsNotDisposed = [
        {
            headerName: 'Name',
            field: 'name',
            flex: 1

        },
        {
            headerName: 'Customer Number',
            field: 'CallerIDNum',
            flex: 1
        },
        {
            headerName: 'Queue Name',
            field: 'Queue',
            flex: 1
        },
        {
            headerName: 'Duration',
            field: 'Mduration',
            flex: 1
        }
    ]
    const agentsFreeColumn = [
        {
            headerName: 'Name',
            field: 'name',
            flex: 1

        },
        {
            headerName: 'Customer Number',
            field: 'CallerIDNum',
            flex: 1
        },
        {
            headerName: 'Queue ',
            field: 'queue',
            flex: 1
        },
        {
            headerName: 'Duration',
            field: 'Mduration',
            flex: 1
        }
    ]
    const showProfile = (data) => {
        console.log(data.row)
        // const record = profiles1.filter((ele) => {
        //     return ele._id === data.row._id
        // })
        // console.log(record)
        setUpdate(data.row)
        setShow(true)
    }


    const handleRejectPopup = (id) => {
        // console.log(id)

        // setOpen(true)
    }

    const handleremoveagent =(idv,e)=>{
        const data = {
            "id":idv
        }
     
        
       //alert(id)
        axios.delete(`${AUTH}/removeuser`,data)
            .then((res)=>{
                alert("agent deleted succesfully")
            })
            .catch((err)=>{
                alert("error in deleting user")
            })
    }

    const getAgents = () => {
        axios.get(`${AGENT_SERVICE}/agents`)
            .then((res) => {
                console.log(res.data)
                if (res.data.length > 0) {
                    let i=0;
                    res.data.map((ele)=>{
                        i=i+1;
                        return ele.id =i
                    })
                    res.data.map((ele) => {
                        if (ele.Event === 'AgentComplete') {
                            return ele.Event = 'Call Disconnected Not Disposed'
                        } else if (ele.Event === 'LoggedOut') {
                            return ele.Event = 'Logged Out'
                        } else if (ele.Paused === '1' && ele.Event !== 'AgentConnect' && ele.Event !== 'holdRelease'&& ele.Event !== 'MusiconHold') {
                            return ele.Event = 'On Break'
                        } else if (ele.Event === 'LoggedIn') {
                            return ele.Event = 'Logged In'
                        } else if (ele.Event === 'BREAKOUT') {
                            return ele.Event = 'Free for Next Call'
                        } else if (ele.Event === 'AgentCalled') {
                            return ele.Event = 'Ringing'
                        } else if (ele.Event === 'AgentRingNoAnswer') {
                            return ele.Event = 'Missed Last Call, Ready for Next Call'
                        } else if (ele.Event === 'AgentConnect') {
                            return ele.Event = 'On Call'
                        } else if (ele.Event === 'AgentDisposed') {
                            return ele.Event = 'Free for Next Call'
                        }else if (ele.Event === 'MusiconHold') {
                            return ele.Event = 'On Hold'
                        }else if (ele.Event === 'holdRelease') {
                            return ele.Event = 'Hold Released'
                        }
                    })


                    


                    let value;
                    res.data.map((ele) => {

                        value = new Date(ele.updatedAt).toUTCString()
                        //console.log(value)
                        // value = new date() - new Date(value)
                        value = new Date() - new Date(value)
                        console.log(value)
                        value = new Date(value).toUTCString().slice(17, 25)
                        //value = moment(value).format().slice(11, 18)
                        //value = moment(value).format()
                        return (
                            ele.Mduration = value
                        )
                    })
                   
                    
                    const idle1 = res.data.filter((ele) => {
                        
                        return ele.Event === 'Call Disconnected Not Disposed'
                    })
                    setIdle(idle1)
                    const break1 = res.data.filter((ele) => {
                        return ele.Event === 'On Break'
                    })
                    setBreakdetails(break1)
                    const agentsFree1 = res.data.filter((ele) => {
                        return ele.Event === 'Free for Next Call'
                    })
                    setAgentsFree(agentsFree1)
                    const live = res.data.filter((ele) => {
                        return ele.Event === 'On Call' || ele.Event ==='On Hold' || ele.Event === 'Hold Released'
                    })
                    setLivecalls(live)
                }

            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getAgents1 = () => {
        axios.get(`${AGENT_SERVICE}/agents`)
            .then((res) => {
                console.log(res.data)
                if (res.data.length > 0) {
                    let i=0;
                    res.data.map((ele)=>{
                        i=i+1;
                        return ele.id =i
                    })
                    res.data.map((ele) => {
                        if (ele.Event === 'AgentComplete') {
                            return ele.Event = 'Call Disconnected Not Disposed'
                        } else if (ele.Event === 'LoggedOut') {
                            return ele.Event = 'Logged Out'
                        } else if (ele.Paused === '1' && ele.Event !== 'AgentConnect' && ele.Event !== 'holdRelease'&& ele.Event !== 'MusiconHold') {
                            return ele.Event = 'On Break'
                        } else if (ele.Event === 'LoggedIn') {
                            return ele.Event = 'Logged In'
                        } else if (ele.Event === 'BREAKOUT') {
                            return ele.Event = 'Free for Next Call'
                        } else if (ele.Event === 'AgentCalled') {
                            return ele.Event = 'Ringing'
                        } else if (ele.Event === 'AgentRingNoAnswer') {
                            return ele.Event = 'Missed Last Call, Ready for Next Call'
                        } else if (ele.Event === 'AgentConnect') {
                            return ele.Event = 'On Call'
                        } else if (ele.Event === 'AgentDisposed') {
                            return ele.Event = 'Free for Next Call'
                        }else if (ele.Event === 'MusiconHold') {
                            return ele.Event = 'On Hold'
                        }else if (ele.Event === 'holdRelease') {
                            return ele.Event = 'Hold Released'
                        }
                    })


                    


                    let value;
                    res.data.map((ele) => {

                        value = new Date(ele.updatedAt).toUTCString()
                        //console.log(value)
                        // value = new date() - new Date(value)
                        value = new Date() - new Date(value)
                        console.log(value)
                        value = new Date(value).toUTCString().slice(17, 25)
                        //value = moment(value).format().slice(11, 18)
                        //value = moment(value).format()
                        return (
                            ele.Mduration = value
                        )
                    })
                   
                    setAgents(res.data)
                    
                    
                  
                }

            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {

        const interval = setInterval(async () => {
            if(window.location.href.includes('dashboard')){
                getAgents()
            }
           

        }, 3000);
      

    }, [])

    useEffect(()=>{
        getAgents1()
    },[])

    console.log(agents, "agents")
    console.log(liveCalls,"live calls")
    console.log(idle,"idle")

    const handleClose = () => {
        setShow(false);
        setUpdate({})
    };


    return (
        <>
            <Grid container spacing={3} direction="row">
                {/* <Grid item xs={6} sm={6} lg={6}>
                            <Grid container spacing={3} direction="row">
                                <Grid item xs={6} sm={6} lg={5}></Grid>
                                <Grid item xs={6} sm={6} lg={5}> <b>Agents Status</b></Grid>
                                <Grid item xs={6} sm={6} lg={1}></Grid>
                                <Grid item xs={6} sm={6} lg={12}>
                                    <DataGrid rows={agents} columns={agentStatusColumn} pageSize={3}
                                        //rowsPerPageOptions={[5, 20, 50]}
                                        autoHeight="true"
                                        pagination onRowClick={showProfile} />
                                </Grid>
                            </Grid>    
                </Grid> */}
                <Grid item xs={6} sm={6} lg={6}>
                            <Grid container spacing={3} direction="row">
                                <Grid item xs={6} sm={6} lg={5}></Grid>
                                <Grid item xs={6} sm={6} lg={5}> <b>Live Calls</b></Grid>
                                <Grid item xs={6} sm={6} lg={1}></Grid>
                                <Grid item xs={6} sm={6} lg={12}>
                                    <DataGrid rows={liveCalls} columns={liveCallsColumn} pageSize={3}
                                        //rowsPerPageOptions={[5, 20, 50]}
                                        autoHeight="true"
                                        pagination onRowClick={showProfile} />
                                </Grid>
                            </Grid>
                </Grid>
                <Grid item xs={6} sm={6} lg={6}>
                   
                            <Grid container spacing={3} direction="row">
                                <Grid item xs={6} sm={6} lg={5}></Grid>
                                <Grid item xs={6} sm={6} lg={5}> <b>Break Details</b></Grid>
                                <Grid item xs={6} sm={6} lg={1}></Grid>
                                <Grid item xs={6} sm={6} lg={12}>
                                    <DataGrid rows={breakdetails} columns={liveCallsColumn} pageSize={3}
                                        //rowsPerPageOptions={[5, 20, 50]}
                                        autoHeight="true"
                                        pagination onRowClick={showProfile} />
                                </Grid>
                            </Grid>
                       
                </Grid>
                <Grid item xs={12} sm={12} lg={12}>
                            <Grid container spacing={3} direction="row">
                                <Grid item xs={6} sm={6} lg={5}></Grid>
                                <Grid item xs={6} sm={6} lg={5}> <b>Agents Status</b></Grid>
                                <Grid item xs={6} sm={6} lg={1}><Dialog /></Grid>
                                <Grid item xs={6} sm={6} lg={12}>
                                    <DataGrid rows={agents} columns={agentStatusColumn} pageSize={5}
                                        //rowsPerPageOptions={[5, 20, 50]}
                                        autoHeight="true"
                                        pagination onRowClick={showProfile} />
                                </Grid>
                            </Grid>    
                </Grid>
                {/* <Grid item xs={6} sm={6} lg={6}>
                            <Grid container spacing={3} direction="row">
                                <Grid item xs={6} sm={6} lg={5}></Grid>
                                <Grid item xs={6} sm={6} lg={5}> <b>Call Completed Not Disposed</b></Grid>
                                <Grid item xs={6} sm={6} lg={1}></Grid>
                                <Grid item xs={6} sm={6} lg={12}>
                                    <DataGrid rows={idle} columns={callsNotDisposed} pageSize={3}
                                        //rowsPerPageOptions={[5, 20, 50]}
                                        autoHeight="true"
                                        pagination onRowClick={showProfile} />
                                </Grid>
                            </Grid>
                </Grid>
                <Grid item xs={6} sm={6} lg={6}>
                            <Grid container spacing={3} direction="row">
                                <Grid item xs={6} sm={6} lg={5}></Grid>
                                <Grid item xs={6} sm={6} lg={5}> <b>Agents Free</b></Grid>
                                <Grid item xs={6} sm={6} lg={1}></Grid>
                                <Grid item xs={6} sm={6} lg={12}>
                                    <DataGrid rows={agentsFree} columns={agentsFreeColumn} pageSize={3}
                                        //rowsPerPageOptions={[5, 20, 50]}
                                        autoHeight="true"
                                        pagination onRowClick={showProfile} />
                                </Grid>
                            </Grid>
                </Grid> */}
                
            </Grid>
            <Popup record={update} show={show} handleClose={handleClose} />
        </>
    );



}

export default Inbound
