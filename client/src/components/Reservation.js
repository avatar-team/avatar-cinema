import React from 'react';

class Reservation extends React.Component {

    handleSubmit = event =>{
       
        event.preventDefault()
        var username =  document.getElementById("username").value
        var email =  document.getElementById("email").value
        console.log(username + "###" + email)
    }
    
    
    render(){

        return(
            <form onSubmit={this.handleSubmit}>
                <div>
                <label>Client name:</label>
                <input id ="username" type="text" placeholder="pleace enter your name" />
                <br/>
                <label>Email:</label>
                <input id ="email" type="text"  placeholder="pleace enter your eamil" />
                <br/>
                <button type="submit">Book Ticket</button>
                </div>
            </form> 
            

        )
    }

}

export default Reservation