import React from 'react'
import { Typography,Box,Button } from '@material-ui/core';

import {withStyles} from '@material-ui/styles'

//Icons
import GithubIcon from '../../../res/images/ic_github.png'




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

class AboutUs extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        const{classes} = this.props;

        return(
            <div className={classes.root}>

            <Box display="flex" >
                <Typography className={classes.title}>
                    About Us
                </Typography>
            </Box>
            <Box>
                <Typography>
                    Collegemate is an all in one application developed by college students considering
                    every aspect of college academics, helping students to always be up to date with 
                    college curriculum.
                </Typography>
                <Typography>
                    This is an open source project, contributions by developers are highly 
                    encouraged.
                </Typography>
                <Button style={{margin:20}} onClick={()=>window.open("https://github.com/OmSingh5092/CollegeMateWeb",'_blank')}>
                    <img src = {GithubIcon} style={{width:30, height:30}} />
                </Button>
            </Box>

            <Box>               
                <Typography className={classes.title} style={{marginTop:10}}>
                    Developers
                </Typography>
            </Box>

            <Box>
                <Typography>
                    Arjun Bajpayi
                </Typography>
                <Typography>
                    Om Singh
                </Typography>
            </Box>
            </div>
        )
    }
}

export default withStyles(style)(AboutUs)