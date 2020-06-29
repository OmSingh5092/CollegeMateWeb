import React from 'react'

import {withStyles,useTheme} from '@material-ui/styles'

import {Grid, Typography, Button,Box,Popover, TextField,FormControl,InputLabel,Select,MenuItem} from '@material-ui/core'
import { KeyboardDatePicker } from "@material-ui/pickers";

//Icons
import AddIcon from '../../res/images/ic_add.png'

//Cloures
import {Assignment,Subjects} from '../../closures/GeneralData'

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
    const {assigment} = props;
    return(
        <div style={style.root}>
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

    const data = {
        assignment_title:"",
        assignment_description:"",
        course_name:"",
        course_code:"",
        date_due:"",
    }

    const [selectedSubject, setSelectedSubject] = React.useState("");

    return(
        <div style={style.root}>
            <Typography style={{padding:10}}>
                Add Assignment
            </Typography>
            <TextField variant="outlined" label="Title" onChange={(event)=>{data.assignment_title = event.target.value}}/><br/>
            <TextField variant="outlined" label="Description" onChange={(event)=>{data.assignment_description = event.target.value}}/><br/>
            <TextField variant="outlined" defaultValue="2000-01-01" label="Due Date" type="date" onChangeCapture={(event)=>{data.date_due=event.target.value}} InputLabelProps={{shrink: true,}}/>
            <FormControl variant="outlined" >
                <InputLabel>Subject</InputLabel>
                <Select label="Subject" value={selectedSubject} onChange= {(event)=>{
                    setSelectedSubject(event.target.value)}}
                >
                {subjects.map((item,index)=>(
                    <MenuItem value={index} onClick={()=>{
                        data.course_name = item.subject_title;
                        data.course_code = item.course_code;
                    }}>{item.subject_title} : {item.course_code}</MenuItem>
                ))}
                
                </Select>
            </FormControl>
            
            <Box style={style.submitButton} component={Button} onClick={()=>{callback(data)}}>
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
            assignments:[],
        }

        this.handlePopOver= this.handlePopOver.bind(this);
        this.closePopOver = this.closePopOver.bind(this);
        this.addAssignmnet = this.addAssignmnet.bind(this);
    }

    addAssignmnet(data){
        console.log(data);
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
                                <AddAssignments callback={this.addAssignmnet}/>
                            </Popover>
                        </Button>
                    </Box>
                </Box>
                <Box display="flex" flexWrap="wrap">
                    {this.state.assignments.map((item,index)=>(
                        <Box display="flex">
                            <ViewHolder assigment={item}/>
                        </Box>   
                    ))}
                </Box>

            </div>
        )
    }

}

export default withStyles(style,{withTheme:true})(AssignmentComp);