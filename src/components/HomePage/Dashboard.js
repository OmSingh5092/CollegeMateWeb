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

//Time Formatting
import {dayAndTime} from '../../utils/timeFormatting'

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
                            {dayAndTime(data['date_due'])}
                        </Typography>
                    </Box>
                ))}
            </Box>

            <Box display="flex" flexGrow={1} justifyContent="flex-end" style={{marginTop:20}} component={Link} to={"/assignment"}>
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
            <Box display="flex" justifyContent="flex-end" component={Link} style={{marginLeft:"auto"}} to={"/subject"}>
                    View More.
                </Box>
            
            
            
        </div>
    )
}

const style=(theme)=>({
    root:{
        display:"flex",
        flexGrow:1,
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
            
        }
    }

    render(){
        const {classes} = this.props;
        const {assignmentLoading,subjectLoading} = this.state;
        return(
            <div className={classes.root}>
                <Box display="flex" flexDirection="row"  flexWrap="wrap" flexGrow={1}>
                    <Box display="flex" flexDirection="column" flexGrow={1} style={{marginRight:30}}>
                        <Box>
                            <AssignmentComp/>
                        </Box>
                        <Box>
                            <SubjectComp/>
                        </Box>
                    </Box>
                    <Box display="flex" flexDirection="row" flexWrap="wrap" flex={1} justifyContent="flex-end">

                        <Box style={{margin:20}} className={classes.sideButtons} component={Button} onClick={()=>{this.props.history.push('./library')}}>
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