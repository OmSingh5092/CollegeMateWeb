import React from 'react'
import {withStyles} from '@material-ui/styles'

import Header from './Header'
import Body from './Body'

//Localdata
import {UserData} from '../../closures/LocalData'

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

    componentDidMount(){
        if(UserData.tokenExists() && !UserData.userExists()){
            this.props.history.push('/register');
        }
        if(UserData.tokenExists() && UserData.userExists()){
            this.props.history.push('/homepage');
        }
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