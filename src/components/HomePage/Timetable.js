import React from 'react'

import {withStyles,useTheme} from '@material-ui/styles'

import {Grid, Typography, Button,Box,Popover, TextField} from '@material-ui/core'
import { UserData } from '../../closures/LocalData';

//Closures
import {Classes} from '../../closures/GeneralData'

//Icons
import AddIcon from '../../res/images/ic_add.png'

//Apis
import {addTimetable} from '../../api/subjectCtrl'

//DateFormatter
import {parseDate} from '../../utils/timeFormatting'

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
    const {timetable} = props;
    return(
        <div style={style.root}>
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

    const {callback} = props;

    const data = {}

    return(
        <div style={style.root}>
            <Typography style={{padding:10}}>
                Add Timetable
            </Typography>

            <Box style={style.submitButton} component={Button} onClick={()=>{callback(data)}}>
                <Typography>
                    Submit
                </Typography>
            </Box>
        </div>
    )
}


class Timetable extends React.Component{

    constructor(props){
        super(props);
        this.state={
            popoveranchor:null,
            timetable:Classes.getClasses(),
        }

        this.handlePopOver= this.handlePopOver.bind(this);
        this.closePopOver = this.closePopOver.bind(this);
        this.addTimetable = this.addTimetable.bind(this);
    }

    addTimetable(data){
        
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
                        Timetable
                    </Typography>
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
                    {this.state.timetable.map((item,index)=>(
                        <Box display="flex">
                            <ViewHolder subject={item}/>
                        </Box>   
                    ))}
                </Box>

            </div>
        )
    }
}

export default withStyles(style,{withTheme:true})(Timetable);