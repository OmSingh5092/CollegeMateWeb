import React from 'react'
import {Button, Drawer,ListItem, List,ListItemIcon,ListItemText} from '@material-ui/core'

import {withStyles} from '@material-ui/styles'
//Image Icons
import MenuIcon from '../../res/images/ic_menu.png'

//Menu icons

import ProfileIcon from '../../res/images/ic_profile.png'
import PollsIcon from '../../res/images/ic_polls.png'
import AboutUsIcon from '../../res/images/ic_about_us.png'
import Logout from '../../res/images/ic_logout.png'


const menuList = [
    {
        title: "My Profile",
        icon: ProfileIcon 
    },
    {
        title: "Polls",
        icon: PollsIcon
    },
    {
        title: "About Us",
        icon: AboutUsIcon
    },
    {
        title: "Logout",
        icon: Logout
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
    }
})


class LeftDrawer extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            drawerOpen: false,
        }

        this.toggleDrawer = this.toggleDrawer.bind(this);
    }

    toggleDrawer(){
        this.setState({drawerOpen: !this.state.drawerOpen});
    }



    render(){
        const {classes} = this.props;
        return(
            <div>
                <Button onClick={this.toggleDrawer}>
                    <img src = {MenuIcon} style={{width:60, height:50, margin:10}}/>
                </Button>
                <Drawer anchor="left" open ={this.state.drawerOpen} onClose={this.toggleDrawer} classes={{paper:classes.drawer}}>
                    <List className={classes.drawer} className={classes.list}>
                        {menuList.map((item,index)=>(
                            <ListItem button className={classes.listitem}>
                                <ListItemIcon><img src={item.icon} style={{width:30, height:30}}/></ListItemIcon>
                                <ListItemText> {item.title}</ListItemText>
                            </ListItem>
                            
                        ))}

                    </List>
                   

                </Drawer>
            </div>
        )
    }
}

export default withStyles(style)(LeftDrawer);