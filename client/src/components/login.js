import '../App.css'
import React, {Component} from 'react';
import { Redirect } from 'react-router-dom'

const axios = require('axios')

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      redirect: false,
    }
  }


  renderRedirect () {
    if (this.state.redirect) {
      return <Redirect to='/home' />
    }
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit() {
    if (!this.state.username || !this.state.password) {
      // TODO: show something Red!
    }
    axios.post('/signin', this.state)
      .then(result => {
        if (result.data.match) {
          this.setState({
            redirect: true
          })
        }
      })
      .catch(err => {
        // TODO: show something
      })
  }

  render() {
    console.log(this.state)
    return (
    <div className="main">
        <h2>Welcome to Signin Page</h2>

        Username: <br />
        <input
        className="input"
        type="text"
        name="username"
        value={this.state.username}
        onChange={(e) => {this.onChange(e)}}/>
        <br />

        Password: <br />
        <input
        className="input"
        type="password"
        name="password"
        value={this.state.password}
        onChange={(e) => {this.onChange(e)}}
        />
        <br />

        <input
        className="btn"
        type="submit"
        onClick={this.handleSubmit.bind(this)}/>
        {this.renderRedirect()}
    </div>
    )
  }
}


export default Login;