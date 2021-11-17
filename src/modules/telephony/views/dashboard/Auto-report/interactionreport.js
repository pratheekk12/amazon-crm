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

const InteractionReport = (props) => {
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
                res.data.records.map((ele)=>{
                    if(ele.hasOwnProperty("CRMDISPOSITION")){
                        finalData.push(ele.CRMDISPOSITION)
                    }
                })
                setRecords(finalData)
            })
            .catch((err) => {
                console.log(err)
            })
    }

  
    return (<div>
        <br />
        <br />
        <Grid container spacing={3} direction="row">
            <Grid item xs={6} sm={6} lg={5}></Grid>
            <Grid item xs={6} sm={6} lg={4}><h3>Interaction Performance Report</h3></Grid>
            <Grid item xs={6} sm={6} lg={3}></Grid>
        </Grid>
        <Grid container spacing={3} direction="row">
            <Grid item xs={6} sm={6} lg={5}></Grid>
            <Grid item xs={6} sm={6} lg={4}> <InteractionDate getData={getData} /><DownloadReport DownloadData={records} /></Grid>
            <Grid item xs={6} sm={6} lg={1}>{records.length > 0 && 
                       <ExcelReport
                        data={records}
                        fileName={'Interaction Report '}
                     />
                    }</Grid>
            <Grid item xs={6} sm={6} lg={2}></Grid>
        </Grid>
        
        <Grid container spacing={3} direction="row">
           
        </Grid>

    </div>)
}

export default InteractionReport