import React from 'react'

import {withStyles,makeStyles,useTheme} from '@material-ui/styles'
import { Grid, Typography ,Box,CircularProgress,Button} from '@material-ui/core';
import {Link} from 'react-router-dom'

import {getSubjects} from '../../api/subjectCtrl'
import {getAssinments} from '../../api/assignmentCtrl'

//Closures
import {Assignments,Subjects} from '../../closures/GeneralData'
import {UserData} from '../../closures/LocalData'
import { Subject } from '../../api/endpoints';

//Assignment Component

//Icons

import BookIcon from '../../res/images/ic_books.png'
import DocIcon from '../../res/images/ic_doc.png'


const useStyles =  makeStyles({
    root:{
        color:"#FFFFFF"
    },
    title:{
        color:"#000000",
        fontSize:30
    },
    box:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignContent:"center",
        marginRight:30,
        backgroundColor: "#000000",
        borderRadius:"20px 20px 0px 20px",
        height:100,
        width:200,
    },
    text:{
        marginLeft:"auto",
        marginRight:"auto",
    },
})

const AssignmentComp = (props)=>{
    const classes = useStyles();
    var data = Assignments.getAssignments().slice(0,3);
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

            <Box display="flex" flexGrow={1} justifyContent="flex-end" style={{marginTop:20}} component={Link}>
                    View More.
            </Box>
            
            
        </div>
    )
}


const SubjectComp = (props)=>{
    const classes = useStyles();
    const data = Subjects.getSubjects().slice(0,3);
    return(
        <div className={classes.root}>
            <Typography className={classes.title}>
                Subjects
            </Typography>
            <br/>
            <Box display="flex" flexDirection="row" flexWrap="wrap">
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
            <Box display="flex" justifyContent="flex-end" component={Link} style={{marginLeft:"auto"}}>
                    View More.
                </Box>
            
            
            
        </div>
    )
}

const style=(theme)=>({
    root:{
        borderRadius: "100px 0px 0px 0px",
        background:theme.palette.primary.light,
        display:"flex",
        flexGrow:1,
        flexWrap:"wrap",
    },
    sideButtons:{
        borderRadius:"30px 30px 0px 30px",
        backgroundColor:"#FFFFFF",
        padding:40,
        height:200,
        width:350
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
                <Box display="flex" flexDirection="row" style={{margin:50}} flexWrap="wrap" flexGrow={1}>
                    <Box display="flex" flexDirection="column" flexGrow={1} style={{marginRight:30}}>
                        <Box>
                            {assignmentLoading?<CircularProgress/>:<AssignmentComp/>}
                        </Box>
                        <Box>
                            {subjectLoading?<CircularProgress/>:<SubjectComp/>}
                        </Box>
                    </Box>
                    <Box display="flex" flexDirection="row" flexWrap="wrap" flex={1} justifyContent="flex-end">

                        <Box style={{margin:20}} className={classes.sideButtons} component={Button}>
                            <img src={BookIcon} style={{height:"100px", width:"100px"}}/>
                            <br/>
                            <Typography style={{marginLeft:30}}>
                                Library
                            </Typography>
                        </Box>
                        
                        <Box style={{margin:20}} className={classes.sideButtons} component={Button}>
                            <img src={DocIcon} style={{height:100, width:100}}/>
                            <br/>
                            <Typography style={{marginLeft:30}}>
                                Attendance
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </div>
        )
    }
}

export default withStyles(style)(Dashboard);