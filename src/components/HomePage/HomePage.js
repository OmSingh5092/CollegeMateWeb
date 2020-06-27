import React from 'react'

import {withStyles} from '@material-ui/styles'
import {withRouter} from 'react-router-dom'

//Components
import Header from './Header'
import Body from './Body'

import {UserData} from '../../closures/UserData'

const style = (theme)=>({
    root:{
        display:"flex",
        flexGrow:1,
        flexDirection:"column",
        backgroundColor:theme.palette.primary.main,
        height:"100vh"
    }
})

class Homepage extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        //Checking Authentication of user
        if(!UserData.userExists()){
            this.props.history.push('/');
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

export default withRouter(withStyles(style)(Homepage));