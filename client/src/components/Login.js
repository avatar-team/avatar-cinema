import React, {Component} from 'react';
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
  backgroundColor: '#ca3e47',
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
    axios.post('/login', this.state)
    .then(result => {
      if ( !result.data.status ) {
        if (result.data.error.includes('MUST PROVIDE')) {
          document.getElementById('alert').style.visibility = 'visible'
          document.getElementById('alert').textContent = 'Fill the Fields'
          return;
        }
        if (result.data.error.includes('Incorrect Password')) {
          document.getElementById('alert').style.visibility = 'visible'
          document.getElementById('alert').textContent = 'Your Data is incorrect'
          return;
        }
      } else if (result.data.status) {
        // TODO: we need to redirect him
        window.localStorage.setItem('x-auth-token', result.data.token)
        localStorage.setItem('x-auth-token', result.data.token)
        this.props.changeUserState(true, result.data.user)
        this.props.history.replace('/')
      }

    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {
    console.log(this.state)
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div style={main}>
          <h2 className='mb-4'>Welcome to Login Page</h2>

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
          onChange={(e) => {this.onChange(e)}}
          />
          <br />

          <input
          style={button}
          type="submit"
          value='Login'/>

          <Alert style={{visibility: 'hidden', padding: '10px', width: '400px', margin: '12px auto'}} color="danger" id="alert"></Alert>
        </div>

      </form>
    
    )
  }
}


export default Login;
