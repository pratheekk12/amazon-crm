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
import DownloadReport from '../DownloadReport'
import axios from 'axios';
import moment from 'moment'
import { DataGrid } from '@material-ui/data-grid';
import Popup from './cdrPopup'
import ExcelReport from '../ExcelReport'
import { AGENT_SERVICE } from 'src/modules/dashboard-360/utils/endpoints'

const OpenTickets = (props) => {
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

        axios.post(`${AGENT_SERVICE}/interactions/filteropenTicketbydate`, data)
            .then((res) => {
                console.log(res.data.records)
                // res.data = res.data.reverse()
                var i = 0
                res.data.map((ele) => {
                    i = i + 1
                    return ele.L1_Interaction.id = i
                })
                let data =[]
                res.data.map((ele1)=>{
                    return data.push(ele1.L1_Interaction)
                })
                
                setRecords(data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const OpenTicketsColumns = [
        {
            headerName: 'Slno',
            field: 'id',
            flex: 1.0

        },
        {
            headerName: 'Ticket status',
            field: 'status',
            flex: 1.0

        },
        {
            headerName: 'Customer Name',
            field: 'Customer_name',
            flex: 1.0

        },
        {
            headerName: 'Customer Phone Number',
            field: 'Customer_Phone_Number',
            flex: 1.0

        },
        {
            headerName: 'Issues',
            field: 'issues',
            flex: 1.0

        },
        {
            headerName: 'Agent Remarks',
            field: 'Agent_Remarks',
            flex: 1.0
        },
        {
            headerName: 'Agent Name',
            field: 'Agent_Name',
            flex: 1.0
        },
        {
            headerName: 'Agent Extension',
            field: 'Agent_SIP',
            flex: 1.0
        },
    ]
  
    return (<div>
        <br />
        <br />
        <Grid container spacing={3} direction="row">
            <Grid item xs={6} sm={6} lg={5}></Grid>
            <Grid item xs={6} sm={6} lg={4}><h3>Open Tickets</h3></Grid>
            <Grid item xs={6} sm={6} lg={3}></Grid>
        </Grid>
        <Grid container spacing={3} direction="row">
            <Grid item xs={6} sm={6} lg={5}></Grid>
            <Grid item xs={6} sm={6} lg={4}> <InteractionDate getData={getData} /><DownloadReport DownloadData={records} /></Grid>
            <Grid item xs={6} sm={6} lg={1}>{records.length > 0 && 
                       <ExcelReport
                        data={records}
                        fileName={'Open Ticket Report '}
                     />
                    }</Grid>
            <Grid item xs={6} sm={6} lg={2}></Grid>
        </Grid>
        
        <Grid container spacing={3} direction="row">
        
            <Grid item xs={12} sm={12} lg={12}>
                <DataGrid rows={records} columns={OpenTicketsColumns} pageSize={10}
                    // rowsPerPageOptions={[10, 20, 50]}
                    //onRowClick={showProfile}
                    autoHeight="true"
                    pagination />
            </Grid>
            
        </Grid>

    </div>)
}

export default OpenTickets