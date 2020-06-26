
export const UserData = function(){
    const data = {
        idToken:"",
        userData:{},
    }

    data.idToken = localStorage.getItem('token');
    data.userData = localStorage.getItem('userData');

    function setUserData(newData){
        data.userData = newData;
        localStorage.setItem('userData',newData);
    }
    function setIdToken(newToken){
        data.idToken = newToken;
        localStorage.setItem('token', data.idToken)
    }
    function getToken(){
        return data.idToken;
    }
    function getUserData(){
        return data;
    }

    return ({setUserData,getUserData,setIdToken,getToken})
} ();
