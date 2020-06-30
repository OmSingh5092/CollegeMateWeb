import React from 'react'

import {withStyles,useTheme} from '@material-ui/styles'

import {Grid, Typography, Button,Box,Popover, TextField,Dialog,DialogTitle, Switch} from '@material-ui/core'
import { UserData } from '../../closures/LocalData';

//Closures
import {Events} from '../../closures/GeneralData'

//Icons
import AddIcon from '../../res/images/ic_add.png'
import CloseIcon from '../../res/images/ic_close.png'

//Apis
import {createCalendarEvent} from '../../api/googleApiCtrl.js'

//Timeformatting
import {parseDate} from '../../utils/timeFormatting'


const style=(theme)=>({
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
        },text:{
            fontFamily:"Raleway-Medium",
            margin:3,
        },title:{
            margin:5,
        }
    }

    const [dialog,setDialog] = React.useState(false);
    const {reminder} = props; 
    const {index} = props;
    const {deleteCallback} = props;
    return(
        <div style={style.root}>
            <Box display="flex" flexGrow={1} component={Button} justifyContent="flex-end" onClick={()=>setDialog(true)}>
                <img src={CloseIcon} style={{height:20, width:20}}/>
            </Box>

            <Typography style={style.title}>
                {reminder.summary}
            </Typography>
            <Typography style={style.title}>
                {reminder.description}
            </Typography>
            <Typography style={style.title}>
                Start : {parseDate(reminder.start.dateTime)}
            </Typography>
            <Typography style={style.title}>
                End : {parseDate(reminder.end.dateTime)}
            </Typography>

            <Dialog
                open={dialog}
                onClose={()=>setDialog(false)}
            >
                <DialogTitle >Are you sure to delete this subject?</DialogTitle>
                <Button onClick={()=>{setDialog(false); deleteCallback()}} color="primary">
                    Agree
                </Button>
                <Button onClick={()=>setDialog(false)} color="primary" autoFocus>
                    Disagree
                </Button>
            </Dialog>
            
        </div>
    )
}

const AddReminder = (props)=>{
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
    /*{
        'summary': 'Google I/O 2015',
        'description': 'A chance to hear more about Google\'s developer products.',
        'start': {
            'dateTime': '2020-07-28T09:00:00-07:00',
        },
        'end': {
            'dateTime': '2020-07-28T17:00:00-07:00',
        },
        'reminders': {
            'useDefault': false,
            'overrides': [
            {'method': 'email', 'minutes': 24 * 60},
            {'method': 'popup', 'minutes': 10},
            ],
        },
    }   */

    const [summary,setSummary] = React.useState('');
    const [description,setDescription] = React.useState('');
    const [start, setStart] = React.useState('');
    const [end,setEnd] = React.useState('');
    const [reminder, setReminder] = React.useState(false); 

    const {callback} = props;

    return(
        <div style={style.root}>
            <Typography style={{padding:10}}>
                Add Reminder
            </Typography><br/>

            <TextField variant="outlined" label="Summary" onChange={(event)=>{setSummary(event.target.value)}}/><br/>
            <TextField variant="outlined" label="Description" onChange={(event)=>{setDescription(event.target.value)}}/><br/>
            <TextField variant="outlined" label="Start Time" type="datetime-local" onChangeCapture={(event)=>{setStart(event.target.value)}} InputLabelProps={{shrink: true,}}/>
            <br/>
            <TextField variant="outlined" label="End Time" type="datetime-local" onChangeCapture={(event)=>{setEnd(event.target.value)}} InputLabelProps={{shrink: true,}}/>
            <br/>
            <Box>
                <Typography> Notifications </Typography> 
                <Switch checked={reminder} onChange={()=>setReminder(!reminder)}/>
            </Box>
            <Box style={style.submitButton} component={Button} onClick={()=>{
                callback({
                    summary:summary,
                    description:description,
                    start:{
                        dateTime:new Date(start).toISOString(),
                        'timeZone': 'America/Los_Angeles'
                    },end:{
                        dateTime:new Date(end).toISOString(),
                        'timeZone': 'America/Los_Angeles'
                    },
                    reminders: reminder?{
                        useDefault: true,
                    }:{
                        useDefault: false,
                        'overrides': [
                        {'method': 'email', 'minutes': 24 * 60},
                        {'method': 'popup', 'minutes': 10},
                        ],  
                    }
                })
            }}>
                <Typography>
                    Submit
                </Typography>
            </Box>
        </div>
    )
}




class Reminder extends React.Component{

    constructor(props){
        super(props);

        this.state={
            popoveranchor:null,
            reminders:Events.getEvents(),
        }

        this.handlePopOver = this.handlePopOver.bind(this);
        this.closePopOver = this.closePopOver.bind(this);
        this.addReminder = this.addReminder.bind(this);
    }

    componentDidMount(){
        console.log(Events.getEvents());
    }

    addReminder(event){
        const callback = (event)=>{
            console.log(event);
        }
        createCalendarEvent(event,callback);
    }

    removeReminder(){

    }

    handlePopOver(event){
        this.setState({popoveranchor:event.target});
    }

    closePopOver(){
        this.setState({popoveranchor:null});
    }

    render(){
        const {classes} = this.props;

        return(
            <div className={classes.root}>
                <Box display="flex" >
                    <Typography className={classes.title}>
                        Reminders
                    </Typography>

                    <Box display="flex" flexGrow={1} justifyContent="flex-end">
                        <Button sytle={{height:50, width:50}}>
                            <img src={AddIcon} onClick={this.handlePopOver}/>
                            <Popover
                                open={this.state.popoveranchor}
                                anchorEl={this.state.popoveranchor}
                                onClose={this.closePopOver}>

                                <AddReminder callback={this.addReminder}/>
                            </Popover>
                        </Button>
                    </Box>

                </Box>

                <Box display="flex" flexWrap="wrap">
                    {this.state.reminders.map((item,index)=>(
                        <Box display="flex">
                            <ViewHolder reminder ={item} deleteCallback={this.removeReminder} />
                        </Box>   
                    ))}
                </Box>
                    

            </div>
        )
    }
}

export default withStyles(style)(Reminder);