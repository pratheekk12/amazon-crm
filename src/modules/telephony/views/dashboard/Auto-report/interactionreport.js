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
                res.data = res.data.reverse()
                var i = 0
                res.data.map((ele) => {
                    i = i + 1
                    return ele.id = i
                })
                
                let finalData =[]
                res.data.map((ele)=>{
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

    // if (records.length > 0) {
    //     const records1 = records.map((ele) => {
    //         return ele.CALLSTARTTIME === new Date(ele.CALLSTARTTIME)
    //     })
    //     setRecords(records1)
    // }


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
            <Grid item xs={6} sm={6} lg={1}></Grid>
            <Grid item xs={6} sm={6} lg={2}></Grid>
        </Grid>
        <Grid container spacing={3} direction="row">
            {/* {
                records.length > 0 ? (
                    <Grid item xs={6} sm={6} lg={12}>
                        <DataGrid rows={records} columns={profilesColumns} pageSize={10}
                            //rowsPerPageOptions={[10, 20, 50]}
                            autoHeight="true"
                            pagination />
                    </Grid>
                ) : (null)
            } */}
        </Grid>
        <Grid container spacing={3} direction="row">
            {
                records.length > 0 ? (
                    <Grid item xs={6} sm={6} lg={12}>
                        <div id="dtHorizontalVerticalExample" class="table table-striped table-bordered table-sm " cellspacing="2"
                            width="100%">

                            <table class="table table-bordered table-striped mb-0">
                                <thead>
                                    <tr>
                                        <th scope="col">Id</th>
                                        <th scope="col">Call Id</th>
                                        <th scope="col" >Agent Name</th>
                                        <th scope="col">Agent Id</th>
                                        <th scope="col">Caller Number</th>
                                        <th scope="col">Call Start Time</th>
                                        <th scope="col">Call Picked Time</th>
                                        <th scope="col">Call Disconnected Time</th>
                                        <th scope="col">Call No Answer Time</th>
                                        <th scope="col">Call Disposed Time</th>
                                        <th scope="col">Total Call Duration</th>
                                        <th scope="col">Call Connected Duration</th>
                                        <th scope="col">Call Disconnected Duration</th>
                                        <th scope="col">Call Ring Duration</th>
                                        <th scope="col">Caller Name</th>
                                        <th scope="col">Queue</th>
                                        <th scope="col">Location </th>
                                        <th scope="col">Main Disposition</th>
                                        <th scope="col">SUB Disposition </th>
                                        <th scope="col">Sip ID</th>
                                        <th scope="col">Agent Type</th>
                                        <th scope="col">Agent ID</th>
                                        <th scope="col">Agent Name</th>
                                        <th scope="col">Response</th>
                                        <th scope="col">Callback Date Time </th>
                                        <th scope="col">Remarks</th>
                                        <th scope="col">Record Date Time</th>
                                        <th scope="col">Last DTMF Option</th>

                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        records.map((ele) => {
                                            return (
                                                <tr onClick={() => { getDataof1(ele._id) }}>
                                                    <td>{ele.id}</td>
                                                    <td>{ele.CALLID}</td>
                                                    <td >{ele.AGENTNAME}</td>
                                                    <td>{ele.AGENTID}</td>
                                                    <td>{ele.CALLERNUMBER}</td>
                                                    <td>{ele.CALLSTARTTIME}</td>
                                                    <td>{ele.CALLPICKEDTIME}</td>

                                                    <td>{ele.CALLDICONNECTEDTIME}</td>
                                                    <td>{ele.CALLNOANSWERTIME}</td>
                                                    <td>{ele.CALLDISPOSEDTIME}</td>
                                                    <td>{ele.TOTALCALLDURATION}</td>

                                                    <td>{ele.CALLCONNECTEDDURATION}</td>
                                                    <td>{ele.CALLDISCONECTEDDURATION}</td>
                                                    <td>{ele.CALLRINGDURATION}</td>

                                                    <td>{ele.CallerName}</td>
                                                    <td>{ele.Queue}</td>
                                                    <td>{ele.Location}</td>


                                                    <td>{ele.mainDisposition}</td>
                                                    <td>{ele.subDisposition}</td>
                                                    <td>{ele.sip_id}</td>
                                                    <td>{ele.agent_type}</td>
                                                    <td>{ele.agent_id}</td>
                                                    <td>{ele.agentName}</td>

                                                    <td>{ele.response}</td>

                                                    <td>{ele.CallbackDate}</td>
                                                    <td>{ele.Remarks}</td>
                                                    <td>{ele.createdAt}</td>
                                                    {/* <td>{ele.Location}</td> */}
                                                    <td>{ele.optionsselct}</td>




                                                    {/* <td>{ele.Disposition}</td>
                                                    <td>{ele.SubDisposition}</td> */}

                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>

                        </div>
                        <Popup record={cdr} show={show} handleClose={handleClose} />
                    </Grid>
                ) : (null)
            }
        </Grid>

    </div>)
}

export default InteractionReport