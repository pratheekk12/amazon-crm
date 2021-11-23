import React, { useEffect, useState } from 'react'
import TimePicker from './timepicker'
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
  TextField,
  Paper,
  Button,
  Tooltip,
  IconButton

} from '@material-ui/core';
import moment from 'moment';
import Date from './DaterangeReport'
import { DataGrid,GridToolbar } from '@material-ui/data-grid';
import axios from 'axios'
import {AGENT_SERVICE} from 'src/modules/dashboard-360/utils/endpoints'
import AddIcon from '@material-ui/icons/Add';
import Dialog from 'src/modules/telephony/views/dashboard/Auto-report/dialog.js'




const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
    margin: '1rem 2rem'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 260,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


const ManageAgents = (props) => {
  const classes = useStyles();

  const [agents,setAgents]= useState([])
  const [agentStatus,setAgentStatus]= useState([])
  const [liveCalls,setLivecalls]= useState([])
  const [onBreakAgents,setonBreakAgents]= useState([])
  const [agentNotdisposed,setagentNotDisposed]= useState([])
  const [agentsFree,setAgentsFree]= useState([])

  useEffect(()=>{
    getAllAgents()
  },[])

  const getAllAgents = ()=>{
    axios.get(`${AGENT_SERVICE}/agents`)
    .then((response)=>{
      console.log(response.data)
      let i = 0
      response.data.map((ele)=>{
        i=i+1;
        return ele.id =i
      })
      setAgents(response.data)
      setAgentStatus(response.data.filter((ele)=>{
        return ele.Event !== 'LoggedOut' && ele.Event !== '0'
      }))
      setonBreakAgents(response.data.filter((ele)=>{
        return ele.Paused === '1' && ele.Event !== 'LoggedOut'
      }))


      setLivecalls(response.data.filter((ele)=>{
        return ele.Event === 'AgentConnect'
      }))

      setagentNotDisposed(response.data.filter((ele)=>{
        return ele.Event === 'AgentComplete'
      }))
      setAgentsFree(response.data.filter((ele)=>{
        return ele.Event === 'AgentDisposed' || ele.Event === 'LoggedIn'
      }))
    })
    .catch((err)=>{
      console.log(err.message)
    })
  }
 
  
  const AgentsColumns = [
            {
              headerName: 'Sl',
              field: 'id',
              flex: 0.5
            },
            {
                headerName: 'Name',
                field: 'name',
                flex: 0.5

            },
            {
                headerName: 'SIP ID',
                field: 'Location',
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
          headerName: 'Name',
          field: 'name',
          flex: 0.5

      },
      // {
      //     headerName: 'SIP ID',
      //     field: 'id',
      //     flex: 0.5
      // },

      {
          headerName: 'Status',
          field: 'Event',
          flex: 0.5
      },
      {
          headerName: 'Queue',
          field: 'Queue',
          flex: 0.5
      },
]

  const liveCallsColumn = [
      {
          headerName: 'Name',
          field: 'name',
          flex: 0.5

      },
      {
          headerName: 'SIP ID',
          field: 'Location',
          flex: 0.5
      },

      {
          headerName: 'Caller ID',
          field: 'CallerIDNum',
          flex: 0.5
      },
      {
          headerName: 'Queue',
          field: 'Queue',
          flex: 0.5
      },
  ]
  
  const showProfile = (data)=>{
    console.log(data)
  }


  useEffect(() => {
    
    const interval = setInterval(async () => {
      if(window.location.href.includes('dashboard')){
     getAllAgents()
      }
    }, 6000);

  }, [])

  //const date = moment(new Date()).format().slice(0,10);
  
  

  return (<div>
    <Grid container spacing={3}>
      {/* <Grid item lg={5} md={12} xs={12}></Grid> */}
      <Grid item lg={6} md={12} xs={12}>
      {/* <Card>
          <CardContent style={{ 'height': '500px' }}> */}
            <Grid container spacing={3} direction="row">
              <Grid item xs={12} sm={12} lg={5}></Grid>
              <Grid item xs={12} sm={12} lg={5}> <b>Manage Agents</b></Grid>
              <Grid item xs={12} sm={12} lg={1}></Grid>
              <Grid item xs={12} sm={12} lg={1}>
                <Dialog />
              </Grid>
              <Grid item xs={12} sm={12} lg={12}>
                <DataGrid rows={agents} columns={AgentsColumns} pageSize={5}
                  // rowsPerPageOptions={[10, 20, 50]}
                  onRowClick={showProfile}
                  autoHeight="true"
                  pagination />
                </Grid>
              </Grid>
          {/* </CardContent>
        </Card> */}
    </Grid>
    <Grid item xs={12} sm={12} lg={6}>
        {/* <Card style={{ 'height': '500px' }}>
          <CardContent> */}
            <Grid container spacing={3} direction="row">
              <Grid item xs={12} sm={12} lg={5}></Grid>
              <Grid item xs={12} sm={12} lg={5}> <b>Agents Status</b></Grid>
              <Grid item xs={12} sm={12} lg={1}></Grid>
              <Grid item xs={12} sm={12} lg={12}>
                  <DataGrid rows={agentStatus} columns={agentStatusColumn} pageSize={5}
                    //rowsPerPageOptions={[5, 20, 50]}
                    autoHeight="true"
                    pagination />
              </Grid>
            </Grid>
    </Grid>
    <Grid item xs={12} sm={12} lg={6}>
        {/* <Card style={{ 'height': '500px' }}>
          <CardContent> */}
            <Grid container spacing={3} direction="row">
              <Grid item xs={12} sm={12} lg={5}></Grid>
              <Grid item xs={12} sm={12} lg={5}> <b>Break Details</b></Grid>
              <Grid item xs={12} sm={12} lg={1}></Grid>
              <Grid item xs={12} sm={12} lg={12}>
                  <DataGrid rows={onBreakAgents} columns={agentStatusColumn} pageSize={5}
                    //rowsPerPageOptions={[5, 20, 50]}
                    autoHeight="true"
                    pagination />
              </Grid>
            </Grid>
    </Grid>
    <Grid item xs={12} sm={12} lg={6}>
        {/* <Card style={{ 'height': '500px' }}>
          <CardContent> */}
            <Grid container spacing={3} direction="row">
              <Grid item xs={12} sm={12} lg={5}></Grid>
              <Grid item xs={12} sm={12} lg={5}> <b>Live Calls</b></Grid>
              <Grid item xs={12} sm={12} lg={1}></Grid>
              <Grid item xs={12} sm={12} lg={12}>
                  <DataGrid rows={liveCalls} columns={liveCallsColumn} pageSize={5}
                    //rowsPerPageOptions={[5, 20, 50]}
                    autoHeight="true"
                    pagination />
              </Grid>
            </Grid>
    </Grid>
    <Grid item xs={12} sm={12} lg={6}>
        {/* <Card style={{ 'height': '500px' }}>
          <CardContent> */}
            <Grid container spacing={3} direction="row">
              <Grid item xs={12} sm={12} lg={5}></Grid>
              <Grid item xs={12} sm={12} lg={5}> <b>Call Disconnected yet to be Disposed</b></Grid>
              <Grid item xs={12} sm={12} lg={1}></Grid>
              <Grid item xs={12} sm={12} lg={12}>
                  <DataGrid rows={agentNotdisposed} columns={agentStatusColumn} pageSize={5}
                    //rowsPerPageOptions={[5, 20, 50]}
                    autoHeight="true"
                    pagination />
              </Grid>
            </Grid>
            
    </Grid>
    <Grid item xs={12} sm={12} lg={6}>
        {/* <Card style={{ 'height': '500px' }}>
          <CardContent> */}
            <Grid container spacing={3} direction="row">
              <Grid item xs={12} sm={12} lg={5}></Grid>
              <Grid item xs={12} sm={12} lg={5}> <b>Agents Free</b></Grid>
              <Grid item xs={12} sm={12} lg={1}></Grid>
              <Grid item xs={12} sm={12} lg={12}>
                  <DataGrid rows={agentsFree} columns={agentStatusColumn} pageSize={5}
                    //rowsPerPageOptions={[5, 20, 50]}
                    autoHeight="true"
                    pagination />
              </Grid>
            </Grid>
    </Grid>
    </Grid>
   
  </div >)
}

export default ManageAgents