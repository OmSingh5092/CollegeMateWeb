import React from 'react'

import {withStyles} from '@material-ui/styles'
import {withRouter,Switch,Route,Router, HashRouter} from 'react-router-dom'
import {Box, CircularProgress} from '@material-ui/core'

//Components
import Header from './Header'
import Dashboard from './Dashboard'
import Timetable from './Timetable'
import Reminder from './Reminder'
import AssignmentComp from './Assignment';
import SubjectComp from './Subject'

import {Assignments,Subjects,Classes} from '../../closures/GeneralData'
import {UserData} from '../../closures/LocalData'

import {getSubjects} from '../../api/subjectCtrl'
import {getAssinments} from '../../api/assignmentCtrl'
import {getClasses} from '../../api/timetableCtrl'

const style = (theme)=>({
    root:{
        display:"flex",
        flexGrow:1,
        flexDirection:"column",
        backgroundColor:theme.palette.primary.main,
        minHeight:"100vh"
    },
    body:{
        borderRadius: "100px 0px 0px 0px",
        background:theme.palette.primary.light,
        display:"flex",
        flexGrow:1,
        flexWrap:"wrap",
        padding:50
    }
})


const Progress = (props)=>{

    return(
        <CircularProgress style={{width:100, height:100}}/>
    )
}

class Homepage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            subjectLoading:true,
            assignmentLoading:true,
            timetableLoading:true,
        }

        this.logoutUser = this.logoutUser.bind(this);
    }

    componentDidMount(){
        //Checking Authentication of user
        if(!UserData.userExists()){
            this.props.history.push('/');
        }

        getSubjects().then((res)=>(res.json()))
        .then((data)=>{
            if(data.success){
                Subjects.setSubjects(data.subjects);
                this.setState({subjectLoading:false})
            }else{
                console.log(data.msg);
            }
        }).catch((err)=>{
            console.log(err);
        })

        getAssinments().then((res)=>(res.json()))
        .then((data)=>{
            if(data.success){
                Assignments.setAssignments(data.assignments);
                this.setState({assignmentLoading:false})
            }
        }).catch((err)=>{
            console.log(err);
        })

        getClasses().then((res)=>(res.json()))
        .then((res)=>{
            if(res.success){
                Classes.setClasses(res.classes);
                this.setState({timetableLoading:false})
            }else{

            }
        })


    }

    logoutUser(){
        UserData.deleteUser();
        this.props.history.push('/');

        //Signout with Google
    }

    render(){
        const {classes} = this.props;

        return(
            <div className={classes.root}>
                
                <HashRouter basename="/homepage">    
                    <Header logout={this.logoutUser}/><br/>
                    <Box className={classes.body}>
                        <Switch>
                            <Route exact path="/" component={
                                (this.state.assignmentLoading || this.state.subjectLoading)? 
                                Progress:Dashboard
                            }/>
                            <Route path = "/dashboard" component={
                                (this.state.assignmentLoading || this.state.subjectLoading)? 
                                Progress:Dashboard
                            }/>
                            <Route path="/timetable" component={
                                (this.state.assignmentLoading || this.state.subjectLoadingn || this.state.timetableLoading)? 
                                Progress:Timetable
                            }/>
                            <Route path="/reminder" component={Reminder}/>
                            <Route path= "/assignment" component ={
                                (this.state.assignmentLoading)?
                                    Progress:AssignmentComp
                            } />
                            <Route path="/subject" component={
                                (this.state.subjectLoading)? 
                                    Progress:SubjectComp
                            }/>
                        </Switch>

                    </Box>
                    
                </HashRouter>  
            </div>
        )
    }
}

export default withRouter(withStyles(style)(Homepage));