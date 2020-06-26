import React from 'react'

import {HashRouter,Switch, Route} from 'react-router-dom'

//Componenst
import Login from '../Login/Login'
import HomePage from '../HomePage/HomePage'
import Register from '../Register/Register';

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
                        <Route path="/app" component = {HomePage}/>
                        <Route path="/register" component = {Register}/>
                    </Switch>
                </HashRouter>
            </div>
        )
    }
}

export default Main;