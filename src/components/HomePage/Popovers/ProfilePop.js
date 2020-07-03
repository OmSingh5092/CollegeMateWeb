import React from 'react'

import {withStyles,useTheme} from '@material-ui/styles'
import {Typography,TextField,Box,Button} from '@material-ui/core'

//Closures
import {Profile} from '../../../closures/GeneralData'

//Api Ctrls
import {updateProfile} from '../../../api/profileCtrl'

//Icons
import EditIcon from '../../../res/images/ic_edit.png'

const style = ((theme)=>({
    root:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        flexGrow:1,
        margin:40,
    },
    title:{
        color:"#000000",
        fontSize:30
    },
}))


const EditViewHolder = (props)=>{
    const style = {
        root:{
            backgroundColor:"#FFFFFF",
            borderRadius:20,
            display:"flex",
            flexDirection:"column",
            flexWrap:"wrap",
            padding:30,
            flexGrow:1,
        },
        submitButton:{
            backgroundColor:"#000000",
            borderRadius:"10px 10px 0px 10px",
            color:"#FFFFFF",
            margin:10,
            display:"flex"
        }
    }

    const {data} = props;
    const {callback} = props;

    const [name,setName] = React.useState('');
    const [enrollment,setEnrollment] = React.useState('');
    const [phone,setPhone] =React.useState('');
    const [year,setYear] = React.useState('')
    return(
        <div style={style.root}>
            <TextField label="Name" defaultValue={data.name} variant="outlined" onChange={(event)=>setName(event.target.value)}/><br/>
            <TextField label="Enrollment" defaultValue={data.enrollment_id} variant="outlined" onChange={(event)=>setEnrollment(event.target.value)}/><br/>
            <TextField label="Phone" defaultValue={data.phone} variant="outlined" onChange={(event)=>setPhone(event.target.value)}/><br/>
            <TextField label="Year" defaultValue={data.year_of_study} variant="outlined" onChange={(event)=>setYear(event.target.value)}/><br/>

            <Box style={style.submitButton} component={Button} onClick={()=> callback({
                name:name,
                enrollment_id:enrollment,
                phone:phone,
                year_of_study:year
            })} >
                <Typography>
                    Submit
                </Typography>
            </Box>
        </div>
    )
}

const DisplayViewHolder = (props)=>{
    const theme= useTheme();
    const style = {
        root:{
            backgroundColor:"#FFFFFF",
            borderRadius:20,
            display:"flex",
            flexDirection:"column",
            flexWrap:"wrap",
            padding:30,
            flexGrow:1
        },

        textView:{
            borderRadius:10,
            borderColor:theme.palette.primary.main,
            borderStyle:"solid",
            padding:10,
            margin:10,
        }
    }

    const {data} = props;

    console.log("Data",data);


    return(
        <div style={style.root}>
            <div style={style.textView}>Name: {data.name}</div>
            <div style={style.textView}>Enrollment: {data.enrollment_id}</div>
            <div style={style.textView}>Year: {data.year_of_study}</div>
            <div style={style.textView}>Email: {data.email}</div>
            <div style={style.textView}>Phone: {data.phone}</div>
        </div>
    )
}

class ProfileComp extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            editMode:false,
            profile:Profile.getData(),
        }


        this.setEditMode = this.setEditMode.bind(this);
        this.editProfile = this.editProfile.bind(this);
    }

    setEditMode(){
        this.setState({editMode:true});
    }

    editProfile(profile){
        updateProfile(profile).then((res)=>(res.json()))
        .then((res)=>{
            if(res.success){
                Profile.setData(res.profile);
                this.setState({profile:Profile.getData()})
            }else{

            }
        })
    }

    render(){
        const {classes} =  this.props;
        

        return(
            <div className={classes.root}>
                <Box display="flex" >
                    <Typography className={classes.title}>
                        Profile
                    </Typography>
                    {this.state.editMode?
                    <div/>:
                    <Box display="flex" flexGrow={1} justifyContent="flex-end">
                        <Button onClick={this.setEditMode}>
                            <img style={{height:30, width:30}} src={EditIcon} />
                        </Button>
                    </Box>
                    }
                    
                </Box>
                <Box display="flex" minWidth={500} justifyContent="center">
                    {this.state.editMode? 
                    <EditViewHolder callback={this.editProfile} data = {Profile.getData()}/>:
                    <DisplayViewHolder data={Profile.getData()}/>}
                </Box>
                
            </div>
        )
    }
}

export default withStyles(style, {withTheme:true})(ProfileComp)