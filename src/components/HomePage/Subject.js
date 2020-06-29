import React from 'react'

import {withStyles,useTheme} from '@material-ui/styles'

import {Grid, Typography, Button,Box,Popover, TextField} from '@material-ui/core'
import { UserData } from '../../closures/LocalData';

//Closures
import {Subjects} from '../../closures/GeneralData'

//Icons
import AddIcon from '../../res/images/ic_add.png'

//Apis
import {addSubject,getSubjects} from '../../api/subjectCtrl'

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
    const {subject} = props;
    return(
        <div style={style.root}>
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

const AddSbuject = (props)=>{
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
            subjects:[]
        }

        this.handlePopOver= this.handlePopOver.bind(this);
        this.closePopOver = this.closePopOver.bind(this);
        this.addSubject = this.addSubject.bind(this);
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

    handlePopOver(event){
        this.setState({popoveranchor:event.target});
    }

    closePopOver(){
        this.setState({popoveranchor:null});
    }

    componentDidMount(){
        if(Subjects.getSubjects().length ==0){
            getSubjects().then((res)=>(res.json())
            .then((res)=>{
                if(res.success){
                    Subjects.setSubjects(res.subjects);
                    this.setState({subjects:Subjects.getSubjects()});
                }else{

                }
            }));
        }else{
            this.setState({subjects:Subjects.getSubjects()});
        }

        
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
                                <AddSbuject callback={this.addSubject}/>
                            </Popover>
                        </Button>
                    </Box>
                </Box>
                <Box display="flex" flexWrap="wrap">
                    {this.state.subjects.map((item,index)=>(
                        <Box display="flex">
                            <ViewHolder subject={item}/>
                        </Box>   
                    ))}
                </Box>

            </div>
        )
    }
}

export default withStyles(style,{withTheme:true})(Subject);