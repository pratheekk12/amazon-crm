import React,{useState,useEffect} from 'react'
import { DataGrid } from '@material-ui/data-grid';
import {AGENT_SERVICE} from 'src/modules/dashboard-360/utils/endpoints.js'
import axios from 'axios'


const OpenTicketsTable =(props)=>{
    const {records}=props
    
    const {setOutbound}= props

    // useEffect(()=>{
    //     getAllOpenTickets()
    // },[])

    // const getAllOpenTickets =()=>{
    //     axios.get(`${AGENT_SERVICE}/interactions/getAllOpenTickets`)
    //         .then((response)=>{
               
    //                 let i=0;
    //                 let finalData = []
    //                 response.data.records.map((ele)=>{
    //                     i=i+1;
    //                     ele.L1_Interaction.id = i
    //                     ele.L1_Interaction.L2Status = ele.L2Status
    //                     ele.L1_Interaction.Attempt=ele.Attempt
    //                     ele.L1_Interaction.L2ID=ele.L2_AccountCode
    //                     delete ele.L1_Interaction.AgentObject_ID
    //                     delete ele.L1_Interaction.Agent_SIP
    //                     finalData.push(ele.L1_Interaction)
    //                 })
                    
    //                 setRecords(finalData)
                
                
    //         })
    //         .catch((err)=>{
    //             alert(`Error in fetching Tickets -${err.message} `)
    //         })
    // }


    const AgentsColumns =[
        {
            headerName: 'Sl.No',
            field: 'id',
            flex: 0.5
        },
        {
            headerName: 'Ticket Status',
            field: 'L2Status',
            flex: 0.5
        },
        {
            headerName: 'Issue',
            field: 'issues',
            flex: 0.5
        },
        {
            headerName: 'Agent Remarks',
            field: 'Agent_Remarks',
            flex: 0.5
        },
        {
            headerName: 'Attempt',
            field: 'Attempt',
            flex: 0.5
        }, 
    ]

    const rowClick =(data)=>{
        console.log(data)
        setOutbound(data.row)
        localStorage.setItem('Attempt',data.row.Attempt)
        localStorage.setItem('L2AccountID',data.row.L2ID)
        localStorage.setItem('L2Caller',data.row.Customer_Phone_Number)
    }
    
    return (<div>
         <DataGrid components={{
              }}rows={records} columns={AgentsColumns} pageSize={5}
                        //rowsPerPageOptions={[5, 20, 50]}
                        onRowClick={rowClick}
                        autoHeight="true"
                        pagination />
    </div>)
}

export default OpenTicketsTable