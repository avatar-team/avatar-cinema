import React from 'react';




class Reservation extends React.Component {

    constructor(props) {
        super(props)
      
      };
      
    handleSubmit = event =>{
       
        event.preventDefault()
        var clientName =  document.getElementById("clientName").value
        var clientEmail =  document.getElementById("email").value
    
        var data = { "clientName" : clientName,
                    "clientEmail" : clientEmail,
                    "movieTitle"  : "movieTitle" // movieTitle will be passed from the props 

                    }
    }
    
    render(){

        return(
            <form onSubmit={this.handleSubmit}>
                <div>
                <label>Client name:</label>
                <input id ="clientName" type="text" placeholder="pleace enter your name" />
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