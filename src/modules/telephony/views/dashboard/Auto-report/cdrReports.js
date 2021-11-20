import React, { useState } from 'react'
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
import InteractionDate from './DaterangeReport'
// import DownloadReport from '../../../dashboard-360/views/DashboardView/DownloadReport'
import axios from 'axios';
import moment from 'moment'
// import { DataGrid } from '@material-ui/data-grid';
// import { MDBDataTable } from 'mdbreact';
import Popup from './cdrPopup'
import {AGENT_SERVICE} from 'src/modules/dashboard-360/utils/endpoints'
import ExcelReport from '../ExcelReport'
import { DataGrid,GridToolbar } from '@material-ui/data-grid';

const CdrReports = (props) => {
    const [records, setRecords] = useState([])
    const [show, setShow] = useState(false)
    const [cdr, setCdr] = useState([])

    const handleClose = () => {
        setShow(false);

    };

    const getDataof1 = (id) => {
        console.log(id)
        axios.get(`${AGENT_SERVICE}/interactions/${id}`)
            .then((res) => {
                console.log(res.data)
                setCdr(res.data)
                setShow(true)
            })
            .catch((err) => {
                console.log(err)
            })
    }




    const getData = (date, enddate) => {
        console.log(date, enddate)
        let value = moment(date).format().slice(0, 10)
        let value2 = moment(enddate).format().slice(0, 10)
        const data = {
            "startDate": value,
            "endDate": value2
        }

        axios.post(`${AGENT_SERVICE}/interactions/bydaterange`, data)
            .then((res) => {
                console.log(res.data.records)
                // res.data = res.data.reverse()
                var i = 0
                res.data.records.map((ele) => {
                    i = i + 1
                    return ele.id = i
                })
                
                let finalData =[]
                // res.data.records.map((ele)=>{
                //     if(ele.hasOwnProperty("CRMDISPOSITION")){
                //         res.data.records.remove('CRMDISPOSITION')
                //     }
                // })
                setRecords(res.data.records)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const AgentsColumns = [
        {
            headerName: 'Agent Name',
            field: 'AGENTNAME',
            flex: 0.5

        },
        {
            headerName: 'SIP ID',
            field: 'AGENTID',
            flex: 0.5
        },

        {
            headerName: 'Call Unique ID',
            field: 'UID',
            flex: 0.5
        },
        {
            headerName: 'Caller Number',
            field: 'CALLERNUMBER',
            flex: 0.5
        },
        {
            headerName: 'Call Start Time',
            field: 'CALLSTARTTIME',
            flex: 0.5
        },
        {
            headerName: 'Total Call Duration',
            field: 'TOTALCALLDURATION',
            flex: 0.5
        },   
    ]

    return (<div>
        <br />
        <br />
        <Grid container spacing={3} direction="row">
            <Grid item xs={6} sm={6} lg={5}></Grid>
            <Grid item xs={6} sm={6} lg={4}><h3>CDR Report</h3></Grid>
            <Grid item xs={6} sm={6} lg={3}></Grid>
        </Grid>
        <Grid container spacing={3} direction="row">
            <Grid item xs={6} sm={6} lg={5}></Grid>
            <Grid item xs={6} sm={6} lg={4}> <InteractionDate getData={getData} /></Grid>
            <Grid item xs={6} sm={6} lg={1}></Grid>
            <Grid item xs={6} sm={6} lg={2}></Grid>
        </Grid>
        {
            records.length > 0 &&  <Grid container spacing={3} direction="row">
            <Grid item xs={12} sm={12} lg={2}></Grid>
            <Grid item xs={12} sm={12} lg={8}>
            <DataGrid components={{
                Toolbar: GridToolbar,
              }}rows={records} columns={AgentsColumns} pageSize={5}
                        //rowsPerPageOptions={[5, 20, 50]}
                        autoHeight="true"
                        pagination />
            </Grid>
            <Grid item xs={12} sm={12} lg={2}></Grid>
            </Grid>
        }
       

    </div>)
}

export default CdrReports