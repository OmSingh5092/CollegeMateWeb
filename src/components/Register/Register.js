import React from 'react'

import {withStyles} from '@material-ui/styles'

//Components
import Header from './Header'
import Body from './Body'

const style = (theme)=>({
    root:{
        display:"flex",
        flexGrow:1,
        flexDirection:"column",
        backgroundColor:theme.palette.primary.main,
        height:"100vh"
    }
})

class Register extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){

    }

    render(){

        const {classes} = this.props;
        return(
            <div className={classes.root}>
                <Header/>
                <br/>
                <Body/>
            </div>
        )

    }
}

export default withStyles(style)(Register);