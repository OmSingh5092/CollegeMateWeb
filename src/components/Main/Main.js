import React from 'react'

import {HashRouter,Switch, Route} from 'react-router-dom'

//Componenst
import Login from '../Login/Login'
import HomePage from '../HomePage/HomePage'

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
                    </Switch>
                </HashRouter>
            </div>
        )
    }
}

export default Main;