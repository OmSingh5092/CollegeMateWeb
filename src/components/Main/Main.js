import React, { useDebugValue } from 'react'

import {HashRouter,Switch, Route,withRouter} from 'react-router-dom'

import {CircularProgress,Box, Typography} from '@material-ui/core'


//Componenst
import Login from '../Login/Login'
import Homepage from '../Homepage/Homepage'
import Register from '../Register/Register';

import {handleClientLoad} from './script/handleGoogle'

//Closure
import {UserData} from '../../closures/LocalData'

const Progress = (props)=>{

    return(
        <Box display="flex" flexGrow={1} style={{height:'100vh'}} justifyContent="center" flexDirection="column" alignContent="center" flexWrap="wrap">
            <Typography style={{fontSize:30}}>
                Welcome to CollegeMate
            </Typography>
            <Typography style={{marginLeft:"auto", marginRight:"auto", marginTop:50 }}>
                Loading Scripts.....
            </Typography>
            <Box display="flex" flexGrow={1} alignContent="center">

                <CircularProgress style={{
                    margin:"auto",
                    width:100, 
                    height:100}}/>

            </Box>
             

        </Box>
       
    )
}

class Main extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            scritpsLoading:true,
        }
    }

    componentDidMount(){
        const callback = ()=>{console.log(1);this.setState({scritpsLoading:false})};

        const script = document.createElement('script');
        script.src = "https://apis.google.com/js/api.js"
        script.onload = ()=>{handleClientLoad(callback)}
        document.body.append(script);
    }

    render(){
        return(
            <div style = {{display:"flex", flexGrow:1}}>
                <HashRouter>
                    <Switch>
                        <Route exact path= "/" component={
                            (this.state.scritpsLoading)?
                            Progress:
                            Login}/>
                        <Route path="/register" component = {
                            (this.state.scritpsLoading)?
                            Progress:
                            Register}/>
                        <Route path= "/homepage" component  = {
                            (this.state.scritpsLoading)?
                            Progress:
                            Homepage}/>
                    </Switch>
                </HashRouter>
            </div>
        )
    }
}

export default Main