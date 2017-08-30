import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './common.css';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import LinearLoading from './loading';
import { browserHistory } from 'react-router';
import SnackBar from './snackbar'

const style = {
  height: 100,
  width: 100,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
  checkbox: {
    marginTop: 25,
    color: 'red'
  },
  button: {
  	marginTop: 25
  }
};

class Login extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
    	disabled: false,
      	username: '',
      	password: '',
      	message: "Something went wrong! Please try again",
      	showMsg: false
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
   }
  
   onChange(event){
    console.log(event.target.name)
    this.setState({[event.target.name]: event.target.value});
  }
  onSubmit(e){
    e.preventDefault();
    this.setState({disabled: true});
    const { username, password } = this.state;
    const data = {'userName' : username, 'password' : password, 'notificationToken': 'test'};
    console.log(data);

    axios.post('http://www.shinewebservices.com/bezel/public/signin', data)
      .then((response) => {
      	console.log(response)
      	this.setState({disabled: false});
      	if (response.data.success) {
      		console.log('init');
      		localStorage.setItem('user_auth', JSON.stringify(response.data));
      		browserHistory.push('/dashboard');
      	}
      	else{
      		console.log('wrong detail');
      		this.setState({showMsg: true});
      		setTimeout(function() { this.setState({showMsg: false}); }.bind(this), 3000);
      	}
      });
  }


   render() {
   	const { username, password } = this.state;
      return (
        <div>
        	<MuiThemeProvider>
	    		<div className="formCon">
		           	<TextField
				      hintText="Username Field"
				      floatingLabelText="Username"
				      fullWidth={true}
				      name="username" 
				      value={username} 
				      onChange={this.onChange}
				    /><br />
				    <TextField
				      hintText="Password Field"
				      floatingLabelText="Password"
				      type="password"
				      fullWidth={true}
				      name="password" 
				      value={password}
				      onChange={this.onChange}
				    />
				    <Checkbox
			          label="Remmeber me"
			          style={style.checkbox}
			        />
			        <RaisedButton disabled={this.state.disabled} onClick={this.onSubmit} label="Login" primary={true} style={style.button} fullWidth={true}/>
		       		<SnackBar message={this.state.message} open={this.state.showMsg}></SnackBar>
		       	</div>
           </MuiThemeProvider>
        </div>
      );
   }
}
export default Login;