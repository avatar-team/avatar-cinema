import React , {useState} from 'react'
import { Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Delete from './Delete.js'
import axios from 'axios';


const transparent = {
  backgroundColor: 'transparent',
  borderColor: 'transparent'
}

const table = {
  borderCollapse: 'collapse',
  padding: '10px',
  backgroundColor: '#313131',
  width: '90%'
}
  
const td = {
  padding: '12px'
}

  
class UserController extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
    delete : false ,
    deleteUser : {} 
    }
  }

  handleDelete(id, i) {
    axios.delete(`api/user/${id}`)
    .then(res=> {
      this.props.handleDelete(i)
    })
    .catch(err=> {
      console.log(err)
    })
  }

  showDelete(state) {
    this.setState({
      delete: state
    })
  }

  render(){
      
      return(
          <div>
              <Table style={table} dark className="text-center m-auto" >
              <thead>
                  <tr>
                      <th style={{fontSize: '14pt'}}>Username</th>
                      <th style={{fontSize: '14pt'}}>First name</th>
                      <th style={{fontSize: '14pt'}}>Last name</th>
                      <th style={{fontSize: '14pt'}}>Email</th>
                  </tr>
              </thead>
              <tbody>
                  {this.props.users? this.props.users.map((user,i)=>{
                      return  <tr key={i}>
                          <td>{user.userName}</td>
                          <td>{user.firstName}</td>
                          <td>{user.lastName}</td>
                          <td>{user.userEmail}</td>
                          <td><label htmlFor="login-popup" style={transparent} onClick={()=>{ 
                              user.index = i
                              this.setState({delete :true , deleteUser : user})
                            }}><FontAwesomeIcon color='red' icon={faTrashAlt}/></label></td>
                      </tr>
                        
                    }): null}   
              </tbody>
              </Table>
              {console.log(this.state.delete)}
              {this.state.delete?
              <Delete currentMovie={this.state.deleteUser.firstName + " " + this.state.deleteUser.lastName} 
              showDelete={(state)=>this.showDelete(state)} handleDelete={(userId, i)=>this.handleDelete(userId, i)} 
              index={this.state.deleteUser.index} id={this.state.deleteUser._id}/>
                : null}
          </div>
      )
    }
  }
    
  export default UserController