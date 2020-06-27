import React from 'react'

import {withStyles} from '@material-ui/styles'
import { Grid } from '@material-ui/core';

import {getSubjects} from '../../api/subjectCtrl'
import {getAssinments} from '../../api/assignmentCtrl'

//Assignment Component

import {Assignments,Subjects} from '../../closures/GeneralData'




const style=(theme)=>({
    root:{
        borderRadius: "100px 0px 0px 0px",
        background:theme.palette.primary.light,
        height:"100vh",
        display:"flex",
        justifyContent:"center",
        alignContent:"center",
    }
})

class Dashboard extends React.Component{

    componentDidMount(){
        getSubjects().then((res)=>(res.json()))
        .then((data)=>{
            if(data.success){
                Subjects.setSubjects(data.subjects);
                console.log(Subjects.getSubjects());
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
                    console.log(Assignments.getAssignments());
                }
            })
    }

    render(){
        const {classes} = this.props;

        return(
            <div className={classes.root}>
                <Grid container>
                    <Grid item ls={9} xs ={12}>
                        <Grid item>

                        </Grid>
                    </Grid>
                    <Grid item ls={3} xs = {12}>

                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(style)(Dashboard);



