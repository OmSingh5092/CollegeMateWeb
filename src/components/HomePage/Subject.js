import React from 'react'

import {withStyles,useTheme} from '@material-ui/styles'

import {Grid, Typography, Button,Box,Popover, TextField,Dialog,DialogTitle} from '@material-ui/core'
import { UserData } from '../../closures/LocalData';

//Closures
import {Subjects} from '../../closures/GeneralData'

//Icons
import AddIcon from '../../res/images/ic_add.png'
import CloseIcon from '../../res/images/ic_close.png'

//Apis
import {addSubject,getSubjects,deleteSubject} from '../../api/subjectCtrl'

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

    const [dialog,setDialog] = React.useState(false);

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
    const {subject} = props;
    const {index} = props;
    const {deleteCallback} = props;
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
                <Button onClick={()=>{setDialog(false); deleteCallback(subject['subject_id'],index)}} color="primary">
                    Agree
                </Button>
                <Button onClick={()=>setDialog(false)} color="primary" autoFocus>
                    Disagree
                </Button>
            </Dialog>
            <Typography>
                {subject['subject_title']}
            </Typography>
            <br/>
            <Typography>
                {subject['course_code']}
            </Typography>
        </div>
    )
}

const AddSubject = (props)=>{
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

    const {callback} = props;
    
    const data = {
        subject_title:"",
        course_code:""
    }

    return(
        <div style={style.root}>
            <Typography style={{padding:10}}>
                Add Subject
            </Typography>
            <TextField variant="outlined" label="Name" onChange={(event)=>{data.subject_title = event.target.value}}/><br/>
            <TextField variant="outlined" label="Course Code" onChange={(event)=>{data.course_code = event.target.value}}/>

            <Box style={style.submitButton} component={Button} onClick={()=>{callback(data)}}>
                <Typography>
                    Submit
                </Typography>
            </Box>
        </div>
    )
}


class Subject extends React.Component{

    constructor(props){
        super(props);
        this.state={
            popoveranchor:null,
            subjects:Subjects.getSubjects(),
        }

        this.handlePopOver= this.handlePopOver.bind(this);
        this.closePopOver = this.closePopOver.bind(this);
        this.addSubject = this.addSubject.bind(this);
        this.deleteSubject = this.deleteSubject.bind(this);
    }

    addSubject(data){
        addSubject(data).then((res)=>(res.json()))
        .then((res)=>{
            if(res.success){
                Subjects.addSubject(res.subject);
                console.log(Subjects.getSubjects());
                this.setState({subjects:Subjects.getSubjects()});
            }else{

            }
        })
    }

    deleteSubject(subjectId,index){
        deleteSubject(subjectId).then((res)=>(res.json()))
        .then((res)=>{
            //Removing subject from local array
            if(res.success){
                Subjects.removeSubject(index);
                this.setState({subjects:Subjects.getSubjects()})
            }
           
        })
    }

    handlePopOver(event){
        this.setState({popoveranchor:event.target});
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
                        Subjects
                    </Typography>
                    <Box display="flex" flexGrow={1} justifyContent="flex-end">
                        <Button sytle={{height:50, width:50}}>
                            <img src={AddIcon} onClick={this.handlePopOver}/>
                            <Popover
                                open={this.state.popoveranchor}
                                anchorEl={this.state.popoveranchor}
                                onClose={this.closePopOver}>
                                <AddSubject callback={this.addSubject}/>
                            </Popover>
                        </Button>
                    </Box>
                </Box>
                <Box display="flex" flexWrap="wrap">
                    {this.state.subjects.map((item,index)=>(
                        <Box display="flex">
                            <ViewHolder subject={item} index={index} deleteCallback={this.deleteSubject}/>
                        </Box>   
                    ))}
                </Box>

            </div>
        )
    }
}

export default withStyles(style,{withTheme:true})(Subject);