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
        body:JSON.stringify(newClass),
    }

    return fetch(Timetable.post,requestOptions);
    
}

export const deleteClass = (classId) =>{

    const requestOptions={
        method:"DELETE",
        headers:{"token": UserData.getToken(), 'Content-Type': 'application/json' },
        body:JSON.stringify({class_id:classId}),
    }

    return fetch(Timetable.delete,requestOptions);

}