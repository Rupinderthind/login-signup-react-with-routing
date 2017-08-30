import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AppBar from 'material-ui/AppBar';

import { browserHistory } from 'react-router';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';



class Login extends Component {
  static muiName = 'FlatButton';
  constructor(props) {
    super(props);
    this.goto = this.goto.bind(this);
  }

  goto(link){
    console.log(link);
    browserHistory.push('/'+link);
  }
  render() {
    return (
    	<div>
      		<FlatButton {...this.props} label="home" onClick={() => this.goto('home')}/>
      		<FlatButton {...this.props} label="Login" onClick={() => this.goto('login')}/>
      		<FlatButton {...this.props} label="Signup" onClick={() => this.goto('signup')} />
      	</div>
    );
  }
}

class Logged extends React.Component{
	constructor(props) {
      super(props);
      this.logout = this.logout.bind(this);
    }

    logout(){
    	console.log('test');
    	localStorage.removeItem('user_auth');
    	browserHistory.push('/home');
    	this.forceUpdate();
    }
    render() {
      	return (
		  <IconMenu
		    iconButtonElement={
		      <IconButton><MoreVertIcon /></IconButton>
		    }
		    targetOrigin={{horizontal: 'right', vertical: 'top'}}
		    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
		  >
		    <MenuItem primaryText="Refresh" />
		    <MenuItem primaryText="Help" />
		    <MenuItem primaryText="Sign out" onClick={this.logout}/>
		  </IconMenu>
	  	);
	 }
}


class Header extends React.Component {

   	constructor(props) {
      super(props);
      this.state = {
      	open: false,
      	logged: false
      };
      this.logOut = this.logOut.bind(this);
    }
    handleToggle = () => this.setState({open: !this.state.open});
    handleClose = () => this.setState({open: false});

    logOut(){
    	console.log('test');
    	localStorage.removeItem('user_auth');
    	browserHistory.push('/home');
    	this.forceUpdate();
    }



    componentDidMount() {
    	var userData = JSON.parse(localStorage.getItem('user_auth'));
    	console.log(userData)
    	if (userData != null && userData.success) {
    		this.setState({'logged': true});
    	}
    	else{
    		this.setState({'logged': false});
    	}
      console.log(userData)
   }

   render() {
      return (
        <div>
           <AppBar
              title=""
              onLeftIconButtonTouchTap={this.handleToggle}
              iconElementRight={this.state.logged ? <Logged></Logged> : <Login />}
            />
            <Drawer 
            	open={this.state.open}
            	docked={false}
            	onRequestChange={(open) => this.setState({open})}
            >
              <MenuItem onClick={this.handleClose}>Menu Item</MenuItem>
              <MenuItem onClick={this.handleClose}>Menu Item 2</MenuItem>
            </Drawer>
        </div>
      );
   }
}
export default Header;