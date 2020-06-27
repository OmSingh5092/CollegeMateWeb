import React from 'react'
import {withStyles} from '@material-ui/styles'

import {Box,FormControl,InputLabel, OutlinedInput ,Button, TableBody, Typography, FormHelperText} from '@material-ui/core'

//Api Handler
import {updateProfile} from '../../api/profileCtrl'

//Closures
import {UserData} from '../../closures/UserData'

const style = (theme)=>({
    root:{
        display:"flex",
        flexDirection:"row",
        flexGrow:1,
        backgroundColor:theme.palette.primary.light,
        borderRadius: "100px 0px 0px 0px",
        alignContent:"center",
        justifyContent:"center",
        flexWrap:"wrap"
    },
    formControl:{
        margin: theme.spacing(1),
    },
    submit:{
        margin:theme.spacing(4),
        borderRadius:"15px 15px 0px 15px",
        color:"#FFFFFF",
        backgroundColor:theme.palette.primary.main,
        width:300,
        height: 100,
        "&:hover":{
            background: theme.palette.primary.main
        }

    }
})

class Body extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            name:"",
            enrollment:"",
            year:"",
            phone:""
            
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({[event.target.name]:event.target.value})
    }

    handleSubmit(){
        console.log("token", UserData.getToken());
        console.log(this.state);
        var data={
            name:this.state.name,
            enrollment_id:this.state.enrollment,
            email: UserData.getEmail(),
            phone:this.state.phone,
            year_of_study: this.state.year
        }
        updateProfile(data).then((res)=>(res.json()))
        .then((res)=>{
            if(res.success){
                UserData.setUserData(res.user);
                console.log(UserData.getUserData());
            }else{
                console.log(res.error);
            }
        }).catch((err)=>{
            console.log(err);
        })
    }

    componentDidMount(){
        //Checking User availability
    }



    render(){
        const {classes} = this.props;
        const {theme} = this.props;

        return(
            <div className={classes.root}>
                <Box display="flex" flexDirection="column" flexWrap="wrap">

                    <div>
                        <FormControl fullWidth  className={classes.formControl} variant="outlined">
                            <InputLabel>Name</InputLabel>
                            <OutlinedInput name="name" onChange={this.handleChange}/>
                        </FormControl>
                        <br/>
                        <FormControl fullWidth variant="outlined" className={classes.formControl}>
                            <InputLabel>Enrollment Id</InputLabel>
                            <OutlinedInput name="enrollment" onChange={this.handleChange}/>
                        </FormControl>
                        <br/>
                        <FormControl fullWidth variant="outlined" className={classes.formControl}>
                            <InputLabel name="year" inputMode="numeric">Year Of Study</InputLabel>
                            <OutlinedInput name="year" onChange={this.handleChange}/>
                        </FormControl>
                        <br/>
                        <FormControl fullWidth variant="outlined" className={classes.formControl}>
                            <InputLabel name="phone" >Phone Number</InputLabel>
                            <OutlinedInput name="phone" onChange={this.handleChange}/>
                        </FormControl>
                        
                        
                        
                    </div>
                    <Box display="flex" flexGrow={1} justifyContent="right">

                        <Box className={classes.submit} component={Button} onClick={this.handleSubmit}>
                            <Typography>
                                Submit
                            </Typography>
                        </Box>

                    </Box>
                   
                </Box>

            </div>
        )
    }

}

export default withStyles(style, {withTheme:true})(Body);

