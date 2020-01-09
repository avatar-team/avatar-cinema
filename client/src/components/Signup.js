import React, { Component } from 'react';
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


class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      firstName: '',
      lastName: '',
      userEmail: ''
    }
  }

  // renderRedirect () {
  //   if (this.state.redirect) {
  //     return <Redirect to='/login' />
  //   }
  // }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('/signup', this.state)
      .then(result => {
        // console.log(result.data.token)
        if (result.data.status) {
          window.localStorage.setItem('x-auth-token', result.data.token)
          document.getElementById('alert').textContent = 'Success'
          // TODO: signup success, Redirect him
        }
        // if user exist , show something
        if (!result.data.status && result.data.data.error.message.includes('username')) {
          document.getElementById('alert').textContent = 'Username is Duplicated'
        }
        if (!result.data.status && result.data.data.error.message.includes('email')) {
          document.getElementById('alert').textContent = 'Email is Duplicated'
        }
      })
      .catch(err => {
        console.log(err)
      })
  }


  render() {
    return (
      <div style={main}>
      <form onSubmit={this.handleSubmit.bind(this)}>
        <h2>Welcome to Signup Page</h2>
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
        onChange={(e) => {this.onChange(e)}}/>
        <br />

        First Name: <br />
        <input
        style={input}
        type="text"
        name="firstName"
        value={this.state.firstName}
        onChange={(e) => {this.onChange(e)}}/>
        <br />

        Last Name: <br />
        <input
        style={input}
        type="text"
        name="lastName"
        value={this.state.lastName}
        onChange={(e) => {this.onChange(e)}}/>
        <br />

        Email: <br />
        <input
        style={input}
        type="text"
        name="userEmail"
        value={this.state.userEmail}
        onChange={(e) => {this.onChange(e)}}/>
        <br />

        <div id="alert"></div>

        <input style={button} type="submit"/>
        </form>
      </div>
    )
  }
}

export default Signup;