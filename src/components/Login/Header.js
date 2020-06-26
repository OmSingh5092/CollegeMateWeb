import React from 'react'

import {Typography,Box} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'

const style = (theme)=>({
    root:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"right",

    },
    titleText:{
        color:"#FFFFFF",
        fontFamily:"Raleway",   
        fontSize:72,


    },
    subtitleText:{
        color:"#FFFFFF",
        fontFamily:"Raleway",   
        fontSize:64,

    }
})

class Header extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        const {classes} = this.props;
        return(
            <div className = {classes.root}>
                <Box display="flex">
                    <Typography className={classes.titleText}>
                        CollegeMate
                    </Typography>
                </Box>
                <br/>
                <Box display="flex">
                    <Typography className={classes.subtitleText}>
                        An all in one app to manage your 
                            academics.
                    </Typography>
                </Box>
            </div>
        )
    }
}

export default withStyles(style)(Header);