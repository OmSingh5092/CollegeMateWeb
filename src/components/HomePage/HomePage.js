import React from 'react'

import {withStyles} from '@material-ui/styles'
import {withRouter,Switch,Route,Router, HashRouter} from 'react-router-dom'

//Components
import Header from './Header'
import Dashboard from './Dashboard'
import Timetable from './Timetable'
import Reminder from './Reminder'

import {UserData} from '../../closures/LocalData'

const style = (theme)=>({
    root:{
        display:"flex",
        flexGrow:1,
        flexDirection:"column",
        backgroundColor:theme.palette.primary.main,
        height:"100vh"
    }
})

class Homepage extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        //Checking Authentication of user
        if(!UserData.userExists()){
            this.props.history.push('/');
        }
    }

    render(){
        const {classes} = this.props;

        return(
            <div className={classes.root}>
                
                <HashRouter basename="/homepage">    
                    <Header/><br/>
                    <Switch>
                        <Route exact path="/" component={Dashboard}/>
                        <Route path = "/dashboard" component={Dashboard}/>
                        <Route path="/timetable" component={Timetable}/>
                        <Route path="/reminder" component={Reminder}/>
                    </Switch>

                </HashRouter>
                
                
                
                
            </div>
        )
    }
}

export default withRouter(withStyles(style)(Homepage));