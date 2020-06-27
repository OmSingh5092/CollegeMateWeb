import React from 'react'

import {withStyles} from '@material-ui/styles'

const style=(theme)=>({
    root:{
        borderRadius: "100px 0px 0px 0px",
        background:theme.palette.primary.light,
        height:"100vh",
        display:"flex",
        justifyContent:"center",
        alignContent:"center",
    }
})

class Timetable extends React.Component{

    render(){
        const {classes} = this.props;

        return(
            <div className={classes.root}>
                Timetable
            </div>
        )
    }
}

export default withStyles(style)(Timetable);