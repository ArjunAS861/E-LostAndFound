import axios from '../axios'
import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'
import { connect } from 'react-redux'
import { Alert } from "reactstrap"
function VerifyUser(props) {

    const [otp, setOTP] = useState()
    const [msg, setMsg] = useState()
    const history = useHistory()

    function handleSubmit(event){
        event.preventDefault()
        console.log(props.id)
        axios.post('/verifyOTP', {OTP: otp, user_id: props.id})
          .then(res => {
            history.push('/')  
            console.log(res)})
          .catch(err => {
              setMsg(err.response.data.msg)
              console.log(err.response)
          })
          
    }

    function handleChange(event){
        setOTP(event.target.value)
    }

    return (
        <div align = "center">
            { msg? <Alert color="danger">{ msg }</Alert>: null}
            <form >
                <h1 style = {{color: "blue"}}>Enter otp</h1>
                <input value = {otp} onChange = {handleChange} type = "text" placeholder = "OTP"/>
                <button onClick = {handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

function mapStateToProps(state){
    console.log(state.auth.user)
    if(state.auth.user){
        return {id: state.auth.user.id}
    }
    return {}
}


export default connect(mapStateToProps, {})(VerifyUser);

