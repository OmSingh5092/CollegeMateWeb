import React from 'react'

import {withStyles,useTheme} from '@material-ui/styles'

import {Grid, Typography, Button,Box,Popover, TextField,FormControl,InputLabel,Select,MenuItem} from '@material-ui/core'
import { KeyboardDatePicker } from "@material-ui/pickers";

//Api
import {addAssignment,getAssinments} from '../../api/assignmentCtrl'

//Icons
import AddIcon from '../../res/images/ic_add.png'

//DateFormatter
import {parseDate} from '../../utils/timeFormatting'

//Cloures
import {Assignments,Subjects} from '../../closures/GeneralData'

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
        },text:{
            fontFamily:"Raleway-Medium",
            margin:3,
        },title:{
            margin:5,
        }
    }
    const {assignments} = props;
    return(
        <div style={style.root}>
            <Typography style={style.title}>
                {assignments.assignment_title}
            </Typography >
            <Typography style={style.text}>
                {assignments.assignment_description}
            </Typography>
            <Typography style={style.text}>
                {parseDate(assignments.date_due)}
            </Typography >
            <Typography style={style.text}>
                {assignments.course_name} : {assignments.course_code}
            </Typography>
        </div>
    )
}

const AddAssignments = (props)=>{
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

    const subjects = Subjects.getSubjects();

    const {callback} = props;

    const [title,setTitle] = React.useState('')
    const [description,setDescription] = React.useState('')
    const [date,setDate] = React.useState('')
    const [subject,setSubject] = React.useState({})

    const [selectedSubject, setSelectedSubject] = React.useState("");

    return(
        <div style={style.root}>
            <Typography style={{padding:10}}>
                Add Assignment
            </Typography>
            <TextField variant="outlined" label="Title" onChange={(event)=>{setTitle(event.target.value)}}/><br/>
            <TextField variant="outlined" label="Description" onChange={(event)=>{setDescription(event.target.value)}}/><br/>
            <TextField variant="outlined" label="Due Date" type="datetime-local" onChangeCapture={(event)=>{setDate(event.target.value)}} InputLabelProps={{shrink: true,}}/>
            <br/>
            <FormControl variant="outlined" >
                <InputLabel>Subject</InputLabel>
                <Select label="Subject" value={selectedSubject} onChange= {(event)=>{
                    setSelectedSubject(event.target.value)}}
                >
                {subjects.map((item,index)=>(
                    <MenuItem value={index} onClick={()=>{
                        setSubject(item)
                    }}>{item.subject_title} : {item.course_code}</MenuItem>
                ))}
                
                </Select>
            </FormControl>
            
            <Box style={style.submitButton} component={Button} onClick={()=>{callback(
                {
                    assignment_title: title,
                    assignment_description: description,
                    course_name: subject.subject_title,
                    course_code:subject.course_code,
                    date_due:date,
                }
            )}}>
                <Typography>
                    Submit
                </Typography>
            </Box>
        </div>
    )
}


class AssignmentComp extends React.Component{

    constructor(props){
        super(props);

        this.state={
            popoveranchor:null,
            assignments:Assignments.getAssignments(),
        }

        this.handlePopOver= this.handlePopOver.bind(this);
        this.closePopOver = this.closePopOver.bind(this);
        this.addAssignment = this.addAssignment.bind(this);
    }

    addAssignment(data){
        console.log(data);
        addAssignment(data).then((res)=>(res.json()))
        .then((res)=>{
            if(res.success){
                Assignments.addAssignment(res.assignment)
                this.setState({assignments:Assignments.getAssignments()})
            }
        })
    }

    handlePopOver(event){
        this.setState({popoveranchor:event.target});
    }

    closePopOver(){
        this.setState({popoveranchor:null});
    }

    componentDidMount(){

    }

    render(){
        const{classes} = this.props;

        return(
            <div className={classes.root}>
                <Box display="flex" >
                    <Typography className={classes.title}>
                        Assignments
                    </Typography>
                    <Box display="flex" flexGrow={1} justifyContent="flex-end">
                        <Button sytle={{height:50, width:50}}>
                            <img src={AddIcon} onClick={this.handlePopOver}/>
                            <Popover
                                open={this.state.popoveranchor}
                                anchorEl={this.state.popoveranchor}
                                onClose={this.closePopOver}>
                                <AddAssignments callback={this.addAssignment}/>
                            </Popover>
                        </Button>
                    </Box>
                </Box>
                <Box display="flex" flexWrap="wrap">
                    {this.state.assignments.map((item,index)=>(
                        <Box display="flex">
                            <ViewHolder assignments={item}/>
                        </Box>   
                    ))}
                </Box>

            </div>
        )
    }

}

export default withStyles(style,{withTheme:true})(AssignmentComp);