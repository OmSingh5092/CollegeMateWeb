import React from 'react'
import { ThemeProvider } from '@material-ui/core';
import {withStyles} from '@material-ui/styles'

import Theme from './res/Theme'
import Main from './components/Main/Main'


const style = (theme)=>({
  main:{
  }
})

class App extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    const {classes} = this.props;
    return(
      <div className={classes.main}>

        <ThemeProvider theme={Theme}>
          <Main/>
        </ThemeProvider>

      </div>
      
    )
  }
}

export default withStyles(style)(App);