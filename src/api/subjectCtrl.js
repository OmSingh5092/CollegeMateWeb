import {Subject} from './endpoints'

import {UserData} from '../closures/LocalData'

export const getSubjects = ()=>{

    const requestOptions = {
        method:"GET",
        headers:{"token": UserData.getToken(), 'Content-Type': 'application/json' },
    }

    return fetch(Subject.get,requestOptions);

}