
import {profile} from './endpoints'

//Getting token 
import {UserData} from '../closures/UserData'

export const updateProfile = (data)=>{
    const requestOptions = {
        method:"POST",
        headers:{ "token": UserData.getToken(),'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }

    return fetch(profile.post, requestOptions);

}