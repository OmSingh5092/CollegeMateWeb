import React from 'react'

import {withStyles,useTheme} from '@material-ui/styles'

import {Grid, Typography, Button,Box,Popover,Input,TextField,FormControl,InputLabel,Select,MenuItem,DialogTitle,Dialog} from '@material-ui/core'
import { KeyboardDatePicker } from "@material-ui/pickers";

//Api

//Icons
import AddIcon from '../../res/images/ic_add.png'
import CloseIcon from '../../res/images/ic_close.png'

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

    const [dialog,setDialog] = React.useState(false);
    
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

const AddFile = (props)=>{
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
    //Props
    const {callback}= props;

    //States
    const [file,setFile] = React.useState(null);


    return(
        <div style={style.root}>
            <Typography style={{padding:10}}>
                Add File
            </Typography>

            <Input type="file" onChange={(event)=>{setFile(event.target.files[0]); console.log(event.target.files[0])}}></Input>
            
            <br/>
            
            <Box style={style.submitButton} component={Button} onClick={()=>{callback(file)}}>
                <Typography>
                    Submit
                </Typography>
            </Box>
        </div>
    )
}


class LibraryComp extends React.Component{

    constructor(props){
        super(props);

        this.state={
            popoveranchor:null,
            assignments:Assignments.getAssignments(),
        }

        this.handlePopOver= this.handlePopOver.bind(this);
        this.closePopOver = this.closePopOver.bind(this);
        this.addFile = this.addFile.bind(this);
        this.deleteFile = this.deleteFile.bind(this);
    }

    addFile(file){

    }

    deleteFile(){

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
                        Library
                    </Typography>
                    <Box display="flex" flexGrow={1} justifyContent="flex-end">
                        <Button sytle={{height:50, width:50}}>
                            <img src={AddIcon} onClick={this.handlePopOver}/>
                            <Popover
                                open={this.state.popoveranchor}
                                anchorEl={this.state.popoveranchor}
                                onClose={this.closePopOver}>
                                <AddFile callback={this.addFile}/>
                            </Popover>
                        </Button>
                    </Box>
                </Box>
                <Box display="flex" flexWrap="wrap">
                    {this.state.assignments.map((item,index)=>(
                        <Box display="flex">
                            <ViewHolder />
                        </Box>   
                    ))}
                </Box>

            </div>
        )
    }

}

export default withStyles(style,{withTheme:true})(LibraryComp);