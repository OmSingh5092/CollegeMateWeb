import {Subject} from './endpoints'

import {UserData} from '../closures/LocalData'
import { Subjects } from '../closures/GeneralData';

export const getSubjects = ()=>{

    const requestOptions = {
        method:"GET",
        headers:{"token": UserData.getToken(), 'Content-Type': 'application/json' },
    }

    return fetch(Subject.get,requestOptions)
    

}

export const addSubject = (subject)=>{

    const requestOptions={
        method:"POST",
        headers:{"token": UserData.getToken(), 'Content-Type': 'application/json' },
        body:JSON.stringify(subject),
    }

    return fetch(Subject.post,requestOptions);
    
}