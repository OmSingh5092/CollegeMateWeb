
export const UserData = function(){
    const data = {
        idToken:"",
        email:"",
        userData:{},
    }

    data.idToken = localStorage.getItem('token');
    data.userData = localStorage.getItem('userData');
    data.email = localStorage.getItem('email');

    function setUserData(newData){
        data.userData = newData;
        localStorage.setItem('userData',newData);
    }
    function setIdToken(newToken){
        data.idToken = newToken;
        localStorage.setItem('token', data.idToken)
    }

    function setEmail(newEmail){
        localStorage.setItem('email',newEmail);
        data.email = newEmail;
    }
    function getEmail(){
        return data.email;
    }
    function getToken(){
        return data.idToken;
    }
    function getUserData(){
        return data;
    }

    return ({setUserData,getUserData,setIdToken,getToken,getEmail,setEmail})
} ();
