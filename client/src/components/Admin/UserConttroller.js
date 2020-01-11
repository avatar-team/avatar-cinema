import React , {useState} from 'react'
import { Table } from 'reactstrap';
import { Button, Card, CardTitle } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons'


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
        deleteUser : "" 
       };
     };
    
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
                            <td><button style={transparent} onClick={()=>{  this.setState({delete : !this.state.delete , deleteUser : user.userName })
                             }}><FontAwesomeIcon color='red' icon={faTrashAlt}/></button></td>
                        </tr>
                          
                     }): null}   
                </tbody>
                </Table>
                {this.state.delete?
                        <Card style={{width: '50%', margin: 'auto'}} body inverse color="danger">
                           <CardTitle>do you want to delete {this.state.deleteUser}  </CardTitle>
                           <div style={{display: 'block-inline', margin: 'auto'}}>
                           <Button  style={{margin: '10px'}}>Cancel</Button><Button  color="secondary">Delete</Button>
                            </div> 
                        </Card>: null}
            </div>
        )
    }
}

export default UserController



