import {Library} from './endpoints'
import {UserData} from '../closures/LocalData'

export const addLibrary = (file,fileData)=>{
    console.log(file);
    const body = new FormData();
    body.append("file",file,file.name);
    body.append("name",fileData.name);
    body.append("description",fileData.description);

    const requestOptions = {
        method:'POST',
        headers:{"token": UserData.getToken()},
        body: body,
    }

    return fetch(Library.post,requestOptions);

}

export const getLibrary = ()=>{

    const requestOptions = {
        method:'GET',
        headers:{"token": UserData.getToken(), 'Content-Type': 'application/json' },
    }

    return fetch(Library.get,requestOptions);
}

export const deleteLibrary = (fileId,publicId)=>{

    const requestOptions ={
        method:'DELETE',
        headers:{"token": UserData.getToken(), 'Content-Type': 'application/json' },
        body: JSON.stringify({file_id:fileId, public_id:publicId})
    }

    return fetch(Library.delete,requestOptions);

}