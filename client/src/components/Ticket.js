// import './Admin/Test2.scss'
import React from 'react'

/**
 * @function Ticket Accept object of movie data , assign them to a Ticket and return it
 * @param ticket Object contains movie data to be assigned to Ticket
 */

const Ticket = ({ ticket }) => (
  <div class="popup-container" >
    <input type="checkbox" id="login-popup" />
    <div class="popup">
        <label for="login-popup" class="transparent-label"></label>
          <div class="popup-content" style={{borderRadius: '.6rem', fontSize: '16pt', color: 'black', padding: '30px', backgroundColor: 'white', margin: 'auto', width: '750px',position: 'relative', top: '320px' ,height: '360px', textAlign: 'left'}}>
            <h3 className='text-center'> <span className='logo-ticket'>Avatar</span> Cinema </h3>
            <div className=' text-center present'> <span className='present'>Presents </span>... </div>
            <div className='titles my-3'>Movie Name : {ticket.title}</div>
            <div className='titles my-3'>Time : {ticket.playDate}</div>
            <div className='titles my-3'>Price : {ticket.price}</div>
            <div className='titles my-3'>Customer : {ticket.firstName + " " + ticket.lastName}</div>
            <div className='titles my-3'>Serial Number : {ticket._id}</div>
          </div>
      </div>
  </div>
)

export default Ticket