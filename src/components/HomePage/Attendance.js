import React from 'react'

import {withStyles,useTheme} from '@material-ui/styles'

import {Grid, Typography, Button,Box,Popover, TextField,Dialog,DialogTitle} from '@material-ui/core'
import { UserData } from '../../closures/LocalData';

//Calendar
import Calendar from 'react-calendar'

//Closures
import {Subjects,Attendance} from '../../closures/GeneralData'

//Icons
import AddIcon from '../../res/images/ic_add.png'
import CloseIcon from '../../res/images/ic_close.png'

//Utils
import {getPercentage} from '../../utils/attendanceUtil'

//Apis
import {addSubject,getSubjects,deleteSubject} from '../../api/subjectCtrl'

//Styles
import 'react-calendar/dist/Calendar.css';
import '../../style/Calendar.css'




const CalendarViewHolder = (props)=>{
    const theme = useTheme();
    const style = {
        root:{
            backgroundColor:theme.palette.primary.main,
            borderRadius:"20px 20px 0px 20px",
            margin:30,
            color:"#FFFFFF",
            padding:30,
            display:"flex",
            flexDirection:"column",
            maxWidth:300,
        },
    }

    var {data} = props;
    if(data == null){
        data = [];
    }


    const {subject} = props;
    console.log("Attendance",data);
    return(
        <div style={style.root}>
            <Box display="flex" flexDirection="row" flexGrow={1}>
                <Box>
                    <Typography>
                        {subject.subject_title}
                    </Typography>
                    <Typography>
                        {subject.course_code}
                    </Typography>

                </Box>
                <Box flexGrow={1} flexDirection="row" alignContent="flex-end">
                    {getPercentage(data)}%
                </Box>
                
            </Box>

            


            <Calendar
            tileClassName={({date,view})=>{
                //Present
                if(data.find((x)=>((new Date(date).toISOString() === x.date) && ( x.is_present === true)))){
                    return "presentDayHighlight"
                }else if(data.find((x)=>((new Date(date).toISOString() === x.date) && ( x.is_present === false)))){
                    return "absentDayHighlight"
                }
            }}
            />
        </div>
        
        
    )
}



const style = ((theme)=>({
    root:{
        display:"flex",
        flexDirection:"column",
        flexGrow:1
    },
    title:{
        color:"#000000",
        fontSize:30
    },
}))

class AttendanceComp extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            subjects:Subjects.getSubjects(),
        }
    }
    render(){
        const {classes} = this.props;

        return(
            <div className={classes.root}>
                <Box display="flex" >
                    <Typography className={classes.title}>
                        Attendance
                    </Typography>
                </Box>
                
                <Box display="flex" flexWrap="wrap">
                    {this.state.subjects.map((item,index)=>(
                        <div>
                            {item.length==0?
                            <div/>:
                            <CalendarViewHolder subject={item} data = {Attendance.getDataFromSubject(item.subject_id)}/> 
                            }
                        
                        </div>
                        
                    ))}
                </Box>

            </div>
        )
    }
}

export default withStyles(style,{withTheme:true})(AttendanceComp)