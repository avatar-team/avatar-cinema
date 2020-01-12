import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Alert } from 'reactstrap'

const axios = require('axios')

const main = {
  textAlign: 'center',
  borderRadius: '1.2rem',
  padding: '10px',
  fontFamily:'Trebuchet MS',
  color: 'white',
  fontSize: '14pt',
  marginTop: '90px'
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
  backgroundColor: '#ca3e47', /* Green */
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
    if (!this.state.userName || !this.state.password || !this.state.userEmail) {
      document.getElementById('alert').style.visibility = 'visible'
      document.getElementById('alert').textContent = 'Fill The Fields'
      return
    }
    axios.post('/signup', this.state)
      .then(result => {
        if (result.data.status) {
          localStorage.setItem('x-auth-token', result.data.token)
          document.getElementById('alert').style.visibility = 'hidden'
          document.getElementById('alert').textContent = ''
          console.log(result)
          this.props.changeUserState(true, result.data.user)
          return 
        }
        // if user exist , show something
        if ( !result.data.status ) {
          if (result.data.data.error.message.includes('Fill the Fields')) {
            document.getElementById('alert').style.visibility = 'visible'
            document.getElementById('alert').textContent = 'Fill The Fields'
            return;
          }
          if (result.data.data.error.message.includes('username')) {
            document.getElementById('alert').style.visibility = 'visible'
            document.getElementById('alert').textContent = 'Username is Duplicated';
            return;
          }
          if (result.data.data.error.message.includes('email')) {
            document.getElementById('alert').style.visibility = 'visible'
            document.getElementById('alert').textContent = 'Email is Duplicated'
            return
          }
        }
      })
      .catch(err => {
        console.log(err)
      })
  }


  render() {
    if(this.props.isUserLoggedIn) return <Redirect/>
    return (
      <div style={main} >
      <form onSubmit={this.handleSubmit.bind(this)}>
        <h2 className='mb-4'>Welcome to Signup Page</h2>
        Username <br />
        <input
        className='my-3'
        style={input}
        type="text"
        name="userName"
        value={this.state.userName}
        onChange={(e) => {this.onChange(e)}}/>
        <br />

        Password <br />
        <input
        className='my-3'
        style={input}
        type="password"
        name="password"
        value={this.state.password}
        onChange={(e) => {this.onChange(e)}}/>
        <br />

        First Name <br />
        <input
        className='my-3'
        style={input}
        type="text"
        name="firstName"
        value={this.state.firstName}
        onChange={(e) => {this.onChange(e)}}/>
        <br />

        Last Name <br />
        <input
        className='my-3'
        style={input}
        type="text"
        name="lastName"
        value={this.state.lastName}
        onChange={(e) => {this.onChange(e)}}/>
        <br />

        Email <br />
        <input
        className='my-3'
        style={input}
        type="text"
        name="userEmail"
        value={this.state.userEmail}
        onChange={(e) => {this.onChange(e)}}/>
        <br />

        <input className='mt-3' style={button} type="submit" value='Signup'/>

          <Alert style={{visibility: 'hidden', padding: '8px', width: '500px', margin: 'auto', marginTop: '12px'}} color="danger" id="alert"></Alert>
        </form>
      </div>
    )
  }
}
export default Signup;