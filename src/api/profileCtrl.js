
import {Profile} from './endpoints'

//Getting token 
import {UserData} from '../closures/LocalData'

export const updateProfile = (data)=>{
    const requestOptions = {
        method:"POST",
        headers:{ "token": UserData.getToken(),'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }

    return fetch(Profile.post, requestOptions);

}

export const getProfile = ()=>{

    const requestOptions = {
        method:"GET",
        headers:{ "token": UserData.getToken(),'Content-Type': 'application/json'},
    }

    return fetch(Profile.get, requestOptions);

}