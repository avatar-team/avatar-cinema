import React from 'react'
import { Button, Card, CardTitle } from 'reactstrap'

const Delete = (props) => {
    console.log(props.index)
    return (
        <div className="popup-container">
            <input type="checkbox" id="login-popup" />
                <div className="popup">
                    <label htmlFor="login-popup" className="transparent-label"></label>
                    <div className="popup-content" style={{borderRadius: '.6rem', fontSize: '16pt', color: 'black', padding: '40px', backgroundColor: 'white', margin: 'auto', width: '450px',position: 'relative', top: '360px' ,height: '300px', textAlign: 'center'}}>
                        <div style={{ marginTop: '60px', }}>
                            <CardTitle>Do you want to delete {props.currentMovie} ? </CardTitle>
                        </div>
                        <div >
                            <div style={{display: 'block-inline', margin: 'auto', marginTop: '28px'}}>
                                <Button style={{padding: '7px 9px', border: '2px solid #ca3e47', backgroundColor: 'transparent', color: '#ca3e47', borderRadius: '.4rem'}} onClick={()=> { props.showDelete(false) }} >
                                Cancel</Button>
                                <Button style={{padding: '8px 10px', marginLeft: '22px', borderColor: 'transparent', backgroundColor: '#ca3e47', color: 'white', borderRadius: '.4rem'}} onClick={()=> { props.handleDelete(props.id, props.index) }} color="secondary">Delete</Button>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Delete;

