import React from 'react'

import {withStyles,makeStyles,useTheme} from '@material-ui/styles'
import { Grid, Typography ,Box,CircularProgress,Button} from '@material-ui/core';

import {getSubjects} from '../../api/subjectCtrl'
import {getAssinments} from '../../api/assignmentCtrl'

//Closures
import {Assignments,Subjects} from '../../closures/GeneralData'
import {UserData} from '../../closures/LocalData'
import { Subject } from '../../api/endpoints';

//Assignment Component

//Icons

import {BookIcon} from '../../res/images/ic_books.png'
import {DocIcon} from '../../res/images/ic_doc.png'


const useStyles =  makeStyles({
    root:{
        color:"#FFFFFF"
    },
    title:{
        color:"#000000"
    },
    box:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignContent:"center",
        margin:50,
        backgroundColor: "#000000",
        borderRadius:"20px 20px 0px 20px",
        height:150,
        width:200,
    },
    text:{
        marginLeft:"auto",
        marginRight:"auto",
    }
})

const AssignmentComp = (props)=>{
    const classes = useStyles();
    var data = Assignments.getAssignments();
    console.log(data);
    return(
        <div className={classes.root}>
            <Typography className={classes.title}>
                Assignments
            </Typography>
            <br/>
            <Box display="flex" flexDirection="row">
                {data.map((data,index)=>(
                    <Box className={classes.box}>
                        <Typography className={classes.text}>
                            {data['assignment_title']}
                        </Typography>
                        <br/>
                        <Typography className={classes.text}>
                            {data['date_due']}
                        </Typography>
                    </Box>
                ))}

            </Box>
            
            
        </div>
    )
}


const SubjectComp = (props)=>{
    const classes = useStyles();
    const data = Subjects.getSubjects();
    return(
        <div className={classes.root}>
            <Typography className={classes.title}>
                Subjects
            </Typography>
            <br/>
            <Box display="flex" flexDirection="row">
                {data.map((data,index)=>(
                    <Box className={classes.box}>
                        <Typography className={classes.text}>
                            {data['subject_title']}
                        </Typography>
                        <br/>
                        <Typography className={classes.text}>
                            {data['course_code']}
                        </Typography>
                        
                    </Box>
                ))}

            </Box>
            
            
        </div>
    )
}






const style=(theme)=>({
    root:{
        borderRadius: "100px 0px 0px 0px",
        background:theme.palette.primary.light,
        display:"flex",
        justifyContent:"center",
        alignContent:"center",
    },
})

class Dashboard extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            assignmentLoading:true,
            subjectLoading:true,
        }
    }

    componentDidMount(){
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

        console.log(Subjects.getSubjects());

        getAssinments().then((res)=>(res.json()))
        .then((data)=>{
            if(data.success){
                Assignments.setAssignments(data.assignments);
                this.setState({assignmentLoading:false})
            }
        }).catch((err)=>{
            console.log(err);
        })
    }

    render(){
        const {classes} = this.props;
        const {assignmentLoading,subjectLoading} = this.state;
        return(
            <div className={classes.root}>
                <Grid container style={{marginLeft:50, marginTop:50}}>
                    <Grid item ls={9} xs ={9}>
                        <Grid item xs={12}>
                            {assignmentLoading?<CircularProgress/>:<AssignmentComp/>}
                        </Grid>
                        <Grid item xs={12}>
                            {subjectLoading?<CircularProgress/>:<SubjectComp/>}
                        </Grid>
                    </Grid>
                    <Grid item ls={3} xs = {3}>
                        <Grid item xs={12}>
                            <img src={BookIcon} style={{height:"100px", width:"100px"}}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Button>
                                <img src={DocIcon} style={{height:100, width:100}}/>
                            </Button>
                            
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(style)(Dashboard);



