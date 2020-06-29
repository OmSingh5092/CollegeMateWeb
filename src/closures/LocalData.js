
export const UserData = function(){
    var data = {
        userExists: false,
        tokenExists: false,
        idToken:"",
        email:"",
        userData:{},
    }

    data.idToken = localStorage.getItem('token');
    data.userData = localStorage.getItem('userData');
    data.email = localStorage.getItem('email');
    if(data.userData){
        data.userExists = true;
    }
    if(data.idToken){
        data.tokenExists = true;
    }

    function setUserData(newData){
        data.userData = newData;
        localStorage.setItem('userData',newData);
        data.userExists = true;
    }
    function setIdToken(newToken){
        data.tokenExists = true;
        data.idToken = newToken;
        localStorage.setItem('token', data.idToken)
    }

    function userExists(){
        return data.userExists;
    }

    function tokenExists(){
        return data.tokenExists;
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

    function deleteUser(){
        data = {
            userExists: false,
            tokenExists: false,
            idToken:"",
            email:"",
            userData:{},
        }

        localStorage.removeItem('email');
        localStorage.removeItem('token');
        localStorage.removeItem('userData');

    }

    return ({setUserData,getUserData,setIdToken,getToken,getEmail,setEmail,
        userExists,tokenExists, deleteUser})
} ();
