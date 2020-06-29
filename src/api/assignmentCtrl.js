import {assignment} from './endpoints'

import {UserData} from '../closures/LocalData'
import {Assignment} from './endpoints'

export const getAssinments = ()=>{

    const requestOptions = {
        method:"GET",
        headers:{"token": UserData.getToken(), 'Content-Type': 'application/json' },
    }

    return fetch(Assignment.get,requestOptions);
}

export const addAssignment = (data)=>{
    const requestOptions = {
        method:"POST",
        headers:{"token": UserData.getToken(), 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }

    return fetch(Assignment.post,requestOptions);
}

export const deleteAssignment = (assignmentId)=>{
    const requestOptions = {
        method:"DELETE",
        headers:{"token": UserData.getToken(), 'Content-Type': 'application/json' },
        body: JSON.stringify({assignment_id:assignmentId})
    }

    return fetch(Assignment.delete,requestOptions);
}