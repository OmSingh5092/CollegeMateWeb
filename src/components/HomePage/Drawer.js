import React from 'react'
import {Button, Drawer,ListItem, List,ListItemIcon,ListItemText, Dialog} from '@material-ui/core'

import {withRouter} from 'react-router-dom'

import {withStyles} from '@material-ui/styles'
//Image Icons
import MenuIcon from '../../res/images/ic_menu.png'

//Menu icons

import ProfileIcon from '../../res/images/ic_profile.png'
import PollsIcon from '../../res/images/ic_polls.png'
import AboutUsIcon from '../../res/images/ic_about_us.png'
import Logout from '../../res/images/ic_logout.png'

//Closures

import {UserData} from '../../closures/LocalData'
import { GoogleLogout } from 'react-google-login'

//Config
import {googleConfig} from '../../config'

//PopOvers
import ProfileComp from './Popovers/ProfilePop'


const menuList = [
    {
        title: "My Profile",
        icon: ProfileIcon ,
        dialog:<ProfileComp/>
    },
    {
        title: "About Us",
        icon: AboutUsIcon,
        dialog:null
    },
]

const style = (theme)=>({
    drawer:{
        background:theme.palette.primary.main,
        color:"#FFFFFF"
    },
    list:{
        marginLeft:theme.spacing(4),
        marginRight:theme.spacing(4),
    },
    listitem:{
        margin:theme.spacing(5),
    },
})

class LeftDrawer extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            drawerOpen: false,
            showPopOver:false,
            dialog:null
        }

        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.handleItemClick = this.handleItemClick.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.showDialog= this.showDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
    }

    toggleDrawer(){
        this.setState({drawerOpen: !this.state.drawerOpen});
    }

    showDialog(dialog){
        this.setState({dialog:dialog})
    }
    closeDialog(){
        this.setState({dialog:null});
    }

    handleItemClick(item){
        this.props.history.push(item.routePath);
        this.toggleDrawer()
        this.showDialog(item.dialog);
    }

    handleLogout(response){
        const {logout} = this.props;
        logout();
    }

    render(){
        const {classes} = this.props;
        return(
            <div>
                <Button onClick={this.toggleDrawer}>
                    <img src = {MenuIcon} style={{width:60, height:50}}/>
                </Button>
                <Drawer anchor="left" open ={this.state.drawerOpen} onClose={this.toggleDrawer} classes={{paper:classes.drawer}}>
                    <List className={classes.drawer} className={classes.list}>
                        {menuList.map((item,index)=>(
                            <ListItem button className={classes.listitem} onClick={()=>{this.handleItemClick(item)}}>
                                <ListItemIcon><img src={item.icon} style={{width:30, height:30}}/></ListItemIcon>
                                <ListItemText> {item.title}</ListItemText>
                            </ListItem>
                            
                        ))}

                        <GoogleLogout
                            clientId={googleConfig.clientId}
                            render={
                                (renderProps)=>(

                                <ListItem button className={classes.listitem} onClick={renderProps.onClick} disabled ={renderProps.disabled}>
                                    <ListItemIcon><img src={Logout} style={{width:30, height:30}} /></ListItemIcon>
                                    <ListItemText>Logout</ListItemText>
                                </ListItem>
                                )
                            }
                            onLogoutSuccess={this.handleLogout}
                        >

                        </GoogleLogout>

                    </List>
                </Drawer>

                <Dialog open={this.state.dialog}
                    onClose={this.closeDialog}>
                    {this.state.dialog}
                </Dialog>
            </div>
        )
    }
}

export default withRouter(withStyles(style)(LeftDrawer));