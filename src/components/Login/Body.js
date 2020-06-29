import React, { Component } from 'react'

import {withStyles} from '@material-ui/styles'
import { Box, Typography, Button } from '@material-ui/core';

import {GoogleLogin} from 'react-google-login'

//Image
import GoogleIcon from '../../res/images/google_logo.png'

//Configuration
import {googleConfig} from '../../config';

//Api calls
import {signInWithGoogle} from '../../api/googleSignin'

//Closures
import {UserData} from '../../closures/LocalData'

//Api Handler
import {getProfile} from '../../api/profileCtrl'

import {withRouter} from 'react-router-dom'

const style = (theme)=>({
    root:{
        borderRadius: "100px 0px 0px 0px",
        background:theme.palette.primary.light,
        height:"100vh",
        display:"flex",
        justifyContent:"center",
        alignContent:"center",

    },
    container:{
        
    }
})

const customGoogleButton= (renderProps  )=>(
    <Box display="flex" flexDirection="row" style={{borderRadius:"30px", backgroundColor:"#FFFFFF"}} component={Button} onClick={renderProps.onClick}>
        <img src= {GoogleIcon} style={{height:"50px", width:"50px"}}/>
        <Typography style={{margin:20}}>
            Login with Google
        </Typography>
    </Box>
    
)

class Body extends React.Component{
    constructor(props){
        super(props);

        this.successHandler = this.successHandler.bind(this);
    }

    successHandler(response){
        var profile = response.profileObj
        signInWithGoogle(response).then((res)=>(res.json()))
        .then((data)=>{
            console.log("login successfull");
            //Saving data in 
            //Getting Success.
            if(data.success){
                console.log(data);
                UserData.setIdToken(data.authToken);
                console.log(UserData.getToken());
                //setting email
                UserData.setEmail(profile.email);
                if(data.newUser){
                    this.props.history.push('/register');
                }else{
                    getProfile().then((res)=>(res.json()))
                    .then((res)=>{
                        if(res.success){
                            UserData.setUserData(res.profile);
                            this.props.history.push('/homepage');
                        }else{
                            console.log(res.msg);
                        }
                        
                    })
                    
                }
                
            }else{
                console.log(data.msg);
            }
        })
    }

    
    

    failureHandler(error){
        console.log(error);
    }

    render(){
        const {classes} = this.props;
        return(
            <div className={classes.root}>
                <Box display="flex" alignContent="center" justifyContent="center" flexWrap="wrap">
                    <GoogleLogin
                        render={customGoogleButton}
                        onSuccess={this.successHandler}
                        onFailure={this.failureHandler}
                        clientId={googleConfig.clientId}
                        cookiePolicy={'single_host_origin'}/>
                </Box>
            </div>
        )
    }
}

export default withRouter(withStyles(style)(Body));