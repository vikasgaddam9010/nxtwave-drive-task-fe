import React, { useState } from 'react';
import {useNavigate} from "react-router-dom" 
import Cookies from 'js-cookie'

import './index.css';

const SingIn = () => {
    const navigator = useNavigate()
    const [userDetails, setUserDetails] = useState({username:"", password:""})
    const [error, setError] = useState("")
    
    const onChnageHandle = e => {
        const {name, value} = e.target
        setUserDetails({...userDetails, [name] : value})
    }

    const handleSubmit = async e => {
        e.preventDefault()
        console.log(userDetails)
        if(userDetails.username !== "" && userDetails.password !== "" ){
            console.log(userDetails)
            const url1 = 'http://localhost:3001/login'
            const options = {
                method:"POST",
                headers: {
                    "Content-type":"application/json",
                },
                body: JSON.stringify(userDetails)
            }     
            const serverRes =  await fetch(url1, options)
            const r = await serverRes.json()
            console.log(r)

            if(serverRes.ok){
                Cookies.set("jwt", r.jwtToken, {expires:1})
                Cookies.set("username", r.userName, {expires:1})
                navigator("/")   
            }else{
                setError(r.message)
            }
        }else{
            return alert("All Fields are mandatory")            
        }
    }
    return (
        <div style={{height:"100vh"}} className="signin-container">
            <h1 className="mb-5 text-emphasis">Log In Here</h1>
            <form onSubmit={handleSubmit} style={{width:"350px"}}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">User Name</label>
                    <input 
                        className="form-control" 
                        id="username" 
                        name="username"
                        placeholder="User Name" 
                        value={userDetails.value}
                        type="text" 
                        onChange={onChnageHandle}
                    />
                </div>                   
                
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input value={userDetails.password} className="form-control" onChange={onChnageHandle} name="password" id="password" placeholder="Password" type="password"/>
                </div>
                <button style={{width:"100%"}} className="btn btn-primary mt-3" type="submit">Log In</button>
                <p className='m-0 text-danger'>{error}</p>
            </form>
        </div>
    )
}

export default SingIn;
