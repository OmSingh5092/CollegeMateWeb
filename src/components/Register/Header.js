import React from 'react'

import {withStyles} from '@material-ui/styles'
import { Typography } from '@material-ui/core';

const style = (theme)=>({
    root:{

    },
    headerText:{
        color:"#FFFFFF",
        fontSize:"72px",
        margin:theme.spacing(5)
    }
})

class Header extends React.Component{

    constructor(props){
        super(props);
    }
    

    render(){
        const {classes} = this.props;
        return(
            <div className={classes.root}>
                <Typography className={classes.headerText}>
                    Register
                </Typography>
            </div>
        )
    }

}

export default withStyles(style)(Header);

