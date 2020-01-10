import React, {Component} from 'react';
import { Redirect } from 'react-router-dom'
const axios = require('axios')

const main = {
  textAlign: 'center',
  borderRadius: '1.2rem',
  padding: '10px',
  fontFamily:'Trebuchet MS'
}

const input = {
  width: '30%',
  border: '2px solid #aaa',
  borderRadius: '4px',
  margin: '8px 0',
  outline: 'none',
  padding: '8px',
  boxSizing: 'border-box',
  transition: '0.3s'
}


const button = {
  backgroundColor: '#4CAF50', /* Green */
  borderRadius: '8px',
  borderColor: 'transparent',
  color: 'white',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '16px',
  margin:' 4px 2px',
  cursor: 'pointer',
  padding: '8px 28px'
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: ''
    }
  }


  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    var token = localStorage.getItem('x-auth-token')
    if (!this.state.username || !this.state.password) {
      // TODO: show something Red!
    }
    axios.post('/login', this.state)
    .then(result => {
      // TODO: we need to redirect him
      window.localStorage.setItem('x-auth-token', result.data.token)
      console.log('I am in')
      localStorage.setItem('x-auth-token', result.data.token)
      this.props.changeUserState(true)
      this.props.history.replace('/')
    })
    .catch(err => {
      // TODO: show something
    })
  }

  render() {
    console.log(this.state)
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div style={main}>
          <h2>Welcome to Signin Page</h2>

          Username: <br />
          <input
          style={input}
          type="text"
          name="userName"
          value={this.state.userName}
          onChange={(e) => {this.onChange(e)}}/>
          <br />

          Password: <br />
          <input
          style={input}
          type="password"
          name="password"
          value={this.state.password}
          onChange={(e) => {this.onChange(e)}}
          />
          <br />

          <input
          style={button}
          type="submit"/>
        </div>
      </form>
    
    )
  }
}


export default Login;
