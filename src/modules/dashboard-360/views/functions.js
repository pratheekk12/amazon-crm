import axios from 'axios'
import { AGENT_SERVICE } from '../utils/endpoints'

export const  changeAgentStatus =(event)=>{

    console.log(" i am inside function")
    const data = {
        id : localStorage.getItem('Agent_Object_ID'),
        Event : event
    }

    axios.put(`${AGENT_SERVICE}/agents/ChangeStatus`,data)
        .then((response)=>{
            console.log(response.data,"status changed")
        })
        .catch((err)=>{
            console.log(err.message)
        })
}