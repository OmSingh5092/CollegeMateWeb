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
import {addAttendance} from '../../api/attendanceCtrl'

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
            padding:30,
            display:"flex",
            flexDirection:"column",
            maxWidth:300,
        },
        text:{
            color:"#FFFFFF",
            margin:10,
            fontSize:20
        }
    }

    const {subject} = props;
    var {attendance} = props;
    if(attendance ==null){
        attendance = [];
    }


    //states 
    const [data,setData] = React.useState(attendance);
    const [anchor,setAnchor] = React.useState(null);
    const [selectedDay,setSelectedDay] = React.useState('');


    //functions
    const setPresent = ()=>{
        const attendanceData = {
            subject_id:subject.subject_id,
            date: selectedDay,
            is_present:true,
        }
        addAttendance(attendanceData).then((res)=>(res.json()))
        .then((res)=>{
            setAnchor(null);
            if(res.success){
                Attendance.addData(attendanceData);
                setData(Attendance.getDataFromSubject(subject.subject_id));
            }
        })
    }

    const setAbsent = ()=>{
        const attendanceData = {
            subject_id:subject.subject_id,
            date: selectedDay,
            is_present:false,
        }
        addAttendance(attendanceData).then((res)=>(res.json()))
        .then((res)=>{
            console.log(res);
            setAnchor(null);
            if(res.success){
                Attendance.addData(attendanceData);
                setData(Attendance.getDataFromSubject(subject.subject_id));
                setSelectedDay(new Date());
                
            }
        })
    }


    return(
        <div style={style.root}>
            <Box display="flex" flexDirection="row" width="100%" style={style.text}>
                <Box >
                    <Typography>
                        {subject.subject_title}
                    </Typography>
                    <Typography>
                        {subject.course_code}
                    </Typography>

                </Box>
                {data.length ==0?
                <div/>:
                <Box display="flex" flexGrow={1} justifyContent="flex-end">
                    {getPercentage(data)}%
                </Box>
                }
                
            </Box>

            <div>
                <Calendar 
                maxDate={new Date()}
                onClickDay={(value,event)=>{
                    setAnchor(event.target);
                    setSelectedDay(new Date(value).toISOString());
                }}
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
            

            <Popover
            open={anchor}
            anchorEl={anchor}
            onClose={()=>setAnchor(null)}>
                <div style={{padding:10}}>
                    <Button onClick={()=>{setPresent()}}>
                        Present
                    </Button>
                    <Button onClick={()=>{setAbsent()}}>
                        Absent
                    </Button>
                </div>
            </Popover>
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
                            <CalendarViewHolder subject={item} attendance = {Attendance.getDataFromSubject(item.subject_id)}/> 
                            }
                        
                        </div>
                        
                    ))}
                </Box>

            </div>
        )
    }
}

export default withStyles(style,{withTheme:true})(AttendanceComp)