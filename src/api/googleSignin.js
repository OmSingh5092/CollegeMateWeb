import {login} from './endpoints'

const signInWithGoogle = (response)=>{
    const requestOptions = {
        method:"POST",
        headers:{ 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken: response.tokenId })
    }

    return fetch(login.post,requestOptions);

    
}

export {signInWithGoogle};