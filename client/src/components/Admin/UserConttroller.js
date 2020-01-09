import React , {useState} from 'react'
import { Table } from 'reactstrap';
import { Button, Card, CardTitle } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons'


class UserController extends React.Component{
    constructor({users}) {
      super({users})
 
    };
    
    render(){
        return(
            <div>
                <Table>
                <thead>
                    <tr>
                        <th>first name</th>
                        <th>last name</th>
                        <th>email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user,i)=>{
                        <tr key={i}>
                            <th>user.fistname</th>
                            <th>user.lastname</th>
                            <th>user.email</th>
                            <th><button><FontAwesomeIcon color='red' icon={faTrashAlt}/></button></th>
                        </tr>
                    })}   
                </tbody>
                </Table>
            </div>
        )
    }
}



export default UserController



