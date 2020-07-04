//closures
import {UserData} from '../closures/LocalData'

//endpoints
import {Attendance} from './endpoints'

export const getAttendance = ()=>{

    const requestOptions = {
        method:"GET",
        headers:{"token": UserData.getToken(), 'Content-Type': 'application/json' },
    }

    return fetch(Attendance.get,requestOptions);
}

export const addAttendance = (data)=>{
    const requestOptions = {
        method:"POST",
        headers:{"token": UserData.getToken(), 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }

    return fetch(Attendance.post,requestOptions);
}

export const deleteAttendance = (attendanceId)=>{
    const requestOptions = {
        method:"DELETE",
        headers:{"token": UserData.getToken(), 'Content-Type': 'application/json' },
        body: JSON.stringify({attendance_id:attendanceId})
    }

    return fetch(Attendance.delete,requestOptions);
}