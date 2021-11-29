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
import InteractionDate from './agentperformance_date'
import DownloadReport from '../DownloadReport'
import axios from 'axios';
import moment from 'moment'
import { DataGrid } from '@material-ui/data-grid';
import ExcelReport from '../ExcelReport'
import { AGENT_PERFORMANCE,AGENT_SERVICE } from 'src/modules/dashboard-360/utils/endpoints'


const AgentPerformance = (props) => {
    const [date, setdate] = useState("")
    const [records, setRecords] = useState([])

    const profilesColumns = [
        {
            headerName: 'SL.No',
            field: 'id',
            flex: 0.5
        },
        {
            headerName: 'Agent Name',
            field: 'UserName',
            flex: 0.5

        },
        {
            headerName: 'SIP',
            field: 'AgentID',
            flex: 0.5
        },
        {
            headerName: 'Login Duration',
            field: 'loginDuration',
            flex: 0.5
        },
        {
            headerName: 'Calls Offered',
            field: 'callsoffered',
            flex: 0.5
        },
        {
            headerName: 'Calls Handled',
            field: 'CallsHandled',
            flex: 0.5
        },
        {
            headerName: 'Missed Calls',
            field: 'notAnswered',
            flex: 0.5
        },
        {
            headerName: 'Tea Break Duration',
            field: 'TeabreakDuration',
            flex: 0.5
        },
        {
            headerName: 'Lunch Break Duration',
            field: 'LunchBreakDuration',
            flex: 0.5
        },
        {
            headerName: 'Bio Break Duration',
            field: 'otherBreakDuration',
            flex: 0.5
        },
        {
            headerName: 'Idle Duration',
            field: 'idleDuration',
            flex: 0.5
        },
        {
            headerName: 'Talk Duration',
            field: 'CallHandledDuration',
            flex: 0.5
        },
        {
            headerName: 'ACW',
            field: 'ACW',
            flex: 0.5
        },
    ]

    const getData = (date) => {
        let value = moment(date).format().slice(0, 10)
        const data = {
            "startDate": value
        }

        axios.post(`${AGENT_SERVICE}/agentPerformanceReport`, data)
            .then((res) => {
                console.log(res.data)
                var i = 0
                res.data.map((ele) => {
                    i = i + 1
                    return ele.id = i
                })
                setRecords(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (<div style={{overflowX:'hidden',height:'100vh'}}>
        <br />
        <br />
        <Grid container spacing={3} direction="row">
            <Grid item xs={6} sm={6} lg={5}></Grid>
            <Grid item xs={6} sm={6} lg={4}><h3>Agent Performance Report</h3></Grid>
            <Grid item xs={6} sm={6} lg={3}></Grid>
        </Grid>
        <Grid container spacing={3} direction="row">
            <Grid item xs={6} sm={6} lg={5}></Grid>
            <Grid item xs={6} sm={6} lg={4}> <InteractionDate getData={getData} /> {records && records.length > 0 && (
                <ExcelReport
                    data={records}
                    fileName={'Agent Performance'}
                />
            )}</Grid>
            <Grid item xs={6} sm={6} lg={1}></Grid>
            <Grid item xs={6} sm={6} lg={2}></Grid>
        </Grid>
        <Grid container spacing={3} direction="row" style={{minWidth:'100vw',maxWidth:'100vw'}}>
            {
                records.length > 0 ? (
                    <Grid item xs={6} sm={6} lg={12}>
                        <DataGrid rows={records} columns={profilesColumns} pageSize={10}
                            //rowsPerPageOptions={[10, 20, 50]}
                            autoHeight="true"
                            pagination />
                    </Grid>
                ) : (null)
            }

        </Grid>
    </div>)
}

export default AgentPerformance