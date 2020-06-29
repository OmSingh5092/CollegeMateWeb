import {Timetable} from './endpoints'

import {UserData} from '../closures/LocalData'

export const getClasses = ()=>{

    const requestOptions = {
        method:"GET",
        headers:{"token": UserData.getToken(), 'Content-Type': 'application/json' },
    }

    return fetch(Timetable.get,requestOptions)
    

}

export const addClass= (newClass)=>{

    const requestOptions={
        method:"POST",
        headers:{"token": UserData.getToken(), 'Content-Type': 'application/json' },
        body:JSON.stringify(subject),
    }

    return fetch(Subject.post,requestOptions);
    
}