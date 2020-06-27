import React from 'react'

import {withStyles} from '@material-ui/styles'
import {withRouter} from 'react-router-dom'

//Components
import Header from './Header'
import Body from './Body'

//Importing Stored Data
import {UserData} from '../../closures/LocalData'

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
        const {history} = this.props;
        if(!UserData.userExists()){
            history.push('/');
        }
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

export default withRouter(withStyles(style)(Register));