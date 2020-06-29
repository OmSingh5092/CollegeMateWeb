import React, { useDebugValue } from 'react'

import {HashRouter,Switch, Route,withRouter} from 'react-router-dom'

//Componenst
import Login from '../Login/Login'
import Homepage from '../Homepage/Homepage'
import Register from '../Register/Register';

//Closure
import {UserData} from '../../closures/LocalData'

class Main extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div style = {{display:"flex", flexGrow:1}}>
                <HashRouter>
                    <Switch>
                        <Route exact path= "/" component={Login}/>
                        <Route path="/register" component = {Register}/>
                        <Route path= "/homepage" component  = {Homepage}/>
                    </Switch>
                </HashRouter>
            </div>
        )
    }
}

export default Main