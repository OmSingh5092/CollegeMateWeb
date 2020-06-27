import React from 'react'
import {withStyles} from '@material-ui/styles'

import {withRouter} from 'react-router-dom'

import {Box,Typography, Grid, Tabs, Tab, Button, Menu,MenuItem} from '@material-ui/core'

//Component
import Drawer from './Drawer.js'

//Icons
import MoreVert from '../../res/images/ic_more_vert.png'

const style = (theme)=>({
    root:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"right",
        margin:theme.spacing(5),
        color:"#FFFFFF"

    },
    titleText:{
        marginLeft:theme.spacing(10),
        color:"#FFFFFF",  
        fontSize:72,
        fontFamily:"Raleway-Black",

    },
    selectionDesktop:{
        marginTop:"auto",
        marginBottom:"auto",
        display:"none",
        [theme.breakpoints.up('lg')]:{
            display:"flex"
        }
    },
    selectionMobile:{
        marginTop:"auto",
        marginBottom:"auto",
        display:"flex",
        [theme.breakpoints.up('lg')]:{
            display:"none"
        }
    },
    drawer:{
        marginTop:"auto",
        marginBottom:"auto"
    }
})


const paths = ['dashboard','timetable','reminder'];

class Header extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            menuAnchor: null,
            selectedTab:0,
        }

        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
        this.changeMenuTab = this.changeMenuTab.bind(this);
    }
    
    handleMenuClick(event){
        this.setState({menuAnchor: this.state.menuAnchor? null: event.target})
    }

    handleTabChange(event, newValue){
        this.setState({selectedTab: newValue});
        this.props.history.push(paths[newValue]);
    }

    changeMenuTab(index){
        this.setState({selectedTab: index});
        this.props.history.push(paths[index]);
    }

    render(){
        const {classes} = this.props;
        const {theme} = this.props;
        return(
            <div className={classes.root}>
                <Box display="flex" flexDirection="row">
                    <Drawer className={classes.drawer}/>
                    <Typography className={classes.titleText}>
                        CollegeMate
                    </Typography>
                    
                    <Box display="flex" flexDirection="row-reverse" flexGrow={1} alignContent="center">
                        <Box className={classes.selectionDesktop}>
                            <Tabs value={this.state.selectedTab} onChange={this.handleTabChange} selectionFollowsFocus={true}>
                                <Tab label="Dashboard" tabIndex={0}/>
                                <Tab label="Timetable"tabIndex={1}/>
                                <Tab label="Reminders" tabIndex={2}/>
                            </Tabs>
                        </Box>
                        <Box className={classes.selectionMobile}>
                            <Button onClick={this.handleMenuClick}>
                                <img src={MoreVert} style={{width:20, height:20}}/>
                            </Button>

                            <Menu 
                                open={Boolean(this.state.menuAnchor)}
                                keepMounted
                                onClick={this.handleMenuClick}
                                anchorEl={this.state.menuAnchor}
                                onClose={this.handleMenuClick}>

                                <MenuItem onClick={()=>{this.changeMenuTab(0)}}>DashBoard</MenuItem>
                                <MenuItem onClick={()=>{this.changeMenuTab(1)}}>TimeTable</MenuItem>
                                <MenuItem onClick={()=>{this.changeMenuTab(2)}}>Reminder</MenuItem>
                                
                            </Menu>
                        </Box>
                    </Box>



                </Box>
            </div>
        )
    }
}

export default withRouter(withStyles(style)(Header));