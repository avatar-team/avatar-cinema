import '../App.css'
import React from 'react'

const Ticket = ({ticket}) => (
  <div className="commercial-ticket" >
    {console.log(ticket)}
    <h3 className='text-center'> <span className='logo-ticket'>Avatar</span> Cinema </h3>
    <div className=' text-center present'> <span className='temp'>...</span> Presents</div>
    <div className='titles my-3'>Movie Name : {ticket.title}</div>
    <div className='titles my-3'>Time : {ticket.playDate}</div>
    <div className='titles my-3'>Price : {ticket.price}</div>
    <div className='titles my-3'>Customer : {ticket.firstName + " " + ticket.lastName}</div>
    <div className='titles my-3'>Serial Number : {ticket._id}</div>
  </div>
)

export default Ticket