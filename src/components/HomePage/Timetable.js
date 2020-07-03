import React from 'react'

import {withStyles,useTheme} from '@material-ui/styles'

import {Grid, Typography, Button,Box,Popover, TextField,List,ListItem,ListItemText,FormControl,InputLabel,Select,MenuItem,DialogTitle,Dialog} from '@material-ui/core'
import { UserData } from '../../closures/LocalData';

//Closures
import {Classes,Subjects} from '../../closures/GeneralData'

//Icons
import AddIcon from '../../res/images/ic_add.png'
import DownIcon from '../../res/images/ic_down.png'
import CloseIcon from '../../res/images/ic_close.png'

//Apis
import {addClass,deleteClass} from '../../api/timetableCtrl'

//DateFormatter
import {parseDate,getPresent,getLongDays} from '../../utils/timeFormatting'

//Weekdays
const daysLong = getLongDays();

const style = (theme)=>({
    root:{
        display:"flex",
        flexDirection:"column",
        flexGrow:1
    },
    title:{
        color:"#000000",
        fontSize:30
    },
})


const ViewHolder = (props)=>{
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
            minWidth:150
        }
    }

    const [dialog,setDialog] = React.useState(false);
    
    const {index} = props;
    const {deleteCallback} = props;
    const {timetable} = props;

    return(
        <div style={style.root}>
            <Box display="flex" flexGrow={1} component={Button} justifyContent="flex-end" onClick={()=>setDialog(true)}>
                <img src={CloseIcon} style={{height:20, width:20}}/>
            </Box>
            <Dialog
                open={dialog}
                onClose={()=>setDialog(false)}
            >
                <DialogTitle >Are you sure to delete this subject?</DialogTitle>
                <Button onClick={()=>{setDialog(false); deleteCallback(timetable['class_id'],index,timetable.day)}} color="primary">
                    Agree
                </Button>
                <Button onClick={()=>setDialog(false)} color="primary" autoFocus>
                    Disagree
                </Button>
            </Dialog>
            <Typography>
                {timetable.course_name} : {timetable.course_code}
            </Typography><br/>
            <Typography>
                {timetable.venue}
            </Typography><br/>
            <Typography>
                {timetable.start} - {timetable.end}
            </Typography><br/>
            <Typography>
                {timetable.faculty}
            </Typography><br/>


        </div>
    )
}

const AddTimetable = (props)=>{
    const style = {
        root:{
            display:"flex",
            flexDirection:"column",
            padding:50
        },
        submitButton:{
            backgroundColor:"#000000",
            borderRadius:"10px 10px 0px 10px",
            color:"#FFFFFF",
            margin:10,
            display:"flex"
        }
    }
    const presentDay = getPresent('day')
    const[day,setDay] = React.useState(presentDay);
    const[venue,setVenue] = React.useState('');
    const[startTime, setStartTime] = React.useState(presentDay);
    const[endTime, setEndTime] = React.useState(presentDay);
    const[subject,setSubject] = React.useState({});
    const[faculty,setFaculty] = React.useState('');

    const[selectedSubject,setSelectedSubject] = React.useState('');

    const {callback} = props;

    const data = {}

    return(
        <div style={style.root}>
            <Typography style={{padding:10}}>
                Add Timetable
            </Typography>

            <FormControl variant="outlined" >
                <InputLabel>Day</InputLabel>
                <Select label="Subject" value={day} onChange= {(event)=>{
                    setDay(event.target.value)}}
                >
                {daysLong.map((item,index)=>(
                    <MenuItem value={index}>{item}</MenuItem>
                ))}
                </Select>
            </FormControl> <br/>

            <TextField variant="outlined" label="Venue" onChange={(event)=>{setVenue(event.target.value)}}/><br/>
            <TextField variant="outlined" label="Start Time" type="time" inputProps={{max:endTime}}
                onChange = {(event)=>{setStartTime(event.target.value)}}
            /> <br/>
            <TextField variant="outlined" label="End Time" type="time" inputProps={{min:startTime}}
                onChange = {(event)=>{setEndTime(event.target.value)}}
            /> <br/>

            <FormControl variant="outlined" >
                <InputLabel>Subject</InputLabel>
                <Select label="Subject" value={selectedSubject} onChange= {(event)=>{
                    setSelectedSubject(event.target.value)}}
                >
                {Subjects.getSubjects().map((item,index)=>(
                    <MenuItem value={index} onClick={()=>{
                        setSubject(item)
                    }}>{item.subject_title} : {item.course_code}</MenuItem>
                ))}
                
                </Select>
            </FormControl> <br/>

            <TextField variant="outlined" label="Faculty (Optional)" onChange={(event)=>{setFaculty(event.target.value)}}/><br/>
            
            <Box style={style.submitButton} component={Button} onClick={()=>{callback(
                {
                    course_code:subject.course_code,
                    course_name:subject.subject_title,
                    faculty:faculty,
                    start:startTime,
                    end:endTime,
                    day:day.toString(),
                    venue:venue,
                }
            )}}>
                <Typography>
                    Submit
                </Typography>
            </Box>
        </div>
    )
}


const EmptyComp = (props)=>{
    const {day} = props;
    return(
        <div style={{margin:30}}>
            <Typography style={{color:"#b00202"}}>
                No class has been added to {getLongDays()[day]}
            </Typography>
        </div>
    )
}


class Timetable extends React.Component{

    constructor(props){
        super(props);
        this.state={
            popoveranchor:null,
            dayPopoverAnchor:null,
            timetable:Classes.getClasses(getPresent('day')),
            currentDay:getPresent('day')
        }

        this.handlePopOver= this.handlePopOver.bind(this);
        this.closePopOver = this.closePopOver.bind(this);
        this.addTimetable = this.addTimetable.bind(this);
        this.handleDayPopOver = this.handleDayPopOver.bind(this);
        this.closeDayPopOver = this.closeDayPopOver.bind(this);
        this.deleteTimetable = this.deleteTimetable.bind(this);
    }

    addTimetable(data){
        addClass(data).then((res)=>(res.json()))
        .then((res)=>{
            if(res.success){
                Classes.addClasses(res.classes);
                this.setState({timetable:Classes.getClasses(res.classes.day)})
                this.setState({currentDay:res.classes.day});
                this.setState({popoveranchor:null});
            }else{

            }
        })
    }

    deleteTimetable(classId,index,day){
        deleteClass(classId).then((res)=>(res.json()))
        .then((res)=>{
            if(res.success){
                Classes.removeClass(index,day);
                this.setState({timetable:Classes.getClasses(day)});
                this.setState({currentDay:day});
            }
        })
    }

    handlePopOver(event){
        this.setState({popoveranchor:event.target});
    }

    handleDayPopOver(event){
        this.setState({dayPopoverAnchor:event.target})
    }

    closeDayPopOver(){
        this.setState({dayPopoverAnchor:null})
    }

    closePopOver(){
        this.setState({popoveranchor:null});
    }


    render(){
        const {classes} = this.props;
        const {theme} = this.props;

        return(
            <div className={classes.root}>
                <Box display="flex" >
                    <Typography className={classes.title}>
                        Timetable
                    </Typography>
                    <Box component={Button} style={{marginLeft:50}} onClick={this.handleDayPopOver}>
                        <Typography>
                            {daysLong[this.state.currentDay]}
                        </Typography>
                        <img src={DownIcon} style={{marginLeft:30}}/>
                    </Box>

                    <Popover
                        open={this.state.dayPopoverAnchor}
                        anchorEl={this.state.dayPopoverAnchor}
                        onClose={this.closeDayPopOver}>
                        <List>
                            {getLongDays().map((item,index)=>(
                                <ListItem button onClick={()=>{
                                this.closeDayPopOver(); 
                                this.setState({timetable:Classes.getClasses(index)})
                                this.setState({currentDay:index})}}>
                                    <ListItemText>{item}</ListItemText>
                                </ListItem>
                            ))}
                        </List>
                    </Popover>  

                    <Box display="flex" flexGrow={1} justifyContent="flex-end">
                        <Button sytle={{height:50, width:50}}>
                            <img src={AddIcon} onClick={this.handlePopOver}/>
                            <Popover
                                open={this.state.popoveranchor}
                                anchorEl={this.state.popoveranchor}
                                onClose={this.closePopOver}>
                                <AddTimetable callback={this.addTimetable}/>
                            </Popover>
                        </Button>
                    </Box>
                </Box>
                <Box display="flex" flexWrap="wrap">
                    {this.state.timetable.length ==0?
                        <EmptyComp day={this.state.currentDay}/>:
                        this.state.timetable.map((item,index)=>(
                            <Box display="flex">
                                <ViewHolder timetable={item} index={index} deleteCallback={this.deleteTimetable}/>
                            </Box>   
                        ))
                    }
                    
                </Box>

            </div>
        )
    }
}

export default withStyles(style,{withTheme:true})(Timetable);