import React from 'react'
import {withStyles} from '@material-ui/styles'

import Header from './Header'
import Body from './Body'

const style = (theme)=>({
    root:{
        display:"flex",
        flexGrow:1,
        flexDirection:"column",
        backgroundColor:theme.palette.primary.main,
        height:"100vh"

    },
    header:{
        margin:theme.spacing(3),
    },
    body:{
        display:"flex",
        flexDirection:"row",
        flexGrow:1,
        height:"100vh"
    }
})


class Login extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const {classes} = this.props;

        return(
            <div className={classes.root}>
                <Header className={classes.header}/>
                <br/>
                <Body/>
            </div>
        )
    }

}

export default withStyles(style)(Login);