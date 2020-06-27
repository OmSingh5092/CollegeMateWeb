import React from 'react'
import {withStyles} from '@material-ui/styles'

import {Box,Typography} from '@material-ui/core'

//Component
import Drawer from './Drawer.js'

const style = (theme)=>({
    root:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"right",
        margin:theme.spacing(5),

    },
    titleText:{
        
        color:"#FFFFFF",  
        fontSize:72,
        fontFamily:"Raleway-Black",


    }
})

class Header extends React.Component{

    

    render(){
        const {classes} = this.props;

        return(
            <div className={classes.root}>
                <Box display="flex" flexDirection="row" alignContent="center">
                    <Drawer/>
                    <Typography className={classes.titleText}>
                        CollegeMate
                    </Typography>



                </Box>
            </div>
        )
    }
}

export default withStyles(style)(Header);