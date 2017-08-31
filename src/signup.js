import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './common.css';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import LinearLoading from './loading';
import { browserHistory } from 'react-router';
import SnackBar from './snackbar';

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

class Signup extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      fullname: '',
      email: '',
      number: '',
      password: '',
      message: "",
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
    // get our form data out of state
    const { fullname, email, number, password } = this.state;

    const data = {'name' : fullname, 'email': email, 'number': number, 'password' : password, 'notificationToken': 'test', 'deviceId' : 'testDeviceID'};

    axios.post('http://www.shinewebservices.com/bezel/public/registration', data)
      .then((result) => {
        console.log(result)
        if (result.data.success) {
          browserHistory.push('/login');
        }
        else{
          this.setState({message: result.data.error_msg});
          this.setState({showMsg: true});
          setTimeout(function() { this.setState({showMsg: false}); }.bind(this), 3000);
        }
        this.setState({disabled: false});
      });
  }


   render() {
    const { fullname, email, number, password } = this.state;
      return (
        <div>
          <MuiThemeProvider>
          <div className="formCon">
                <TextField
              hintText="Full Name Field"
              floatingLabelText="Full Name"
              fullWidth={true}
              name="fullname" 
              value={fullname} 
              onChange={this.onChange}
            /><br />
            <TextField
              hintText="Email Field"
              floatingLabelText="Email"
              fullWidth={true}
              name="email" 
              value={email}
              type="email" 
              onChange={this.onChange}
            /><br />
            <TextField
              hintText="Mobile Number Field"
              floatingLabelText="Mobile Number"
              fullWidth={true}
              name="number" 
              value={number}
              type="number" 
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
              <RaisedButton disabled={this.state.disabled} onClick={this.onSubmit} label="Signup" primary={true} style={style.button} fullWidth={true}/>
              <SnackBar message={this.state.message} open={this.state.showMsg}></SnackBar>
            </div>
           </MuiThemeProvider>
        </div>
      );
   }
}
export default Signup;