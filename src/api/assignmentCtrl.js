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