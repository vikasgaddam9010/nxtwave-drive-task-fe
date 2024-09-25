import React, { useState } from 'react';
import {useNavigate} from "react-router-dom" 
import { MdVisibilityOff, MdVisibility  } from "react-icons/md";

import './index.css'

const SignUp = () => {
    const navigator = useNavigate()
    const [isPassVisible, setVisibility] = useState(false)
    const [isCPassVisible, setCVisibility] = useState(false)
    const [userDetails, setUserDetails] = useState({firstName:"", lastName:"", gender:"Male", userName:"", password:"", confirmePassword:""})

    const handleChange = (e) => {
        const {name, value} = e.target
        setUserDetails({...userDetails, [name]: value})
    }

    const handleSubmit = async (e)=> {
        e.preventDefault()
        if(userDetails.firstName !== "" && userDetails.lastName !== "" && userDetails.gender !== "", userDetails.userName !== "" && userDetails.password !== "" && userDetails.confirmePassword !== ""){
            if(userDetails.password === userDetails.confirmePassword){
                console.log(userDetails)
                const url1 = 'http://localhost:3001/register'
                const options = {
                    method:"POST",
                    headers: {
                        "Content-type":"application/json",
                    },
                    body: JSON.stringify(userDetails)
                }     
                const serverRes =  await fetch(url1, options)
                console.log("vikas")
                console.log(await serverRes.json())
                if(serverRes.ok){
                    navigator("/sing-in")
                }
            }else{
                return alert("Both Passwords are Not matching!!!")
            }
        }else{
            return alert("All Fields are mandatory")            
        }

    }



    return (
        <div className='signin-container'>
            <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
                <h1 className="head mb-5 text-primary">Registration Form</h1>
                <form onSubmit={handleSubmit} className="form-container shadow p-4 rounded">
                    <div className="mb-3 row">
                        <div className="col-6">
                            <label htmlFor="firstName" className="form-label">First Name</label>
                            <input onChange={handleChange} id="firstName" name="firstName" className="form-control" placeholder="First Name" type="text" />
                        </div>
                        <div className="col-6">
                            <label htmlFor="lastName" className="form-label">Last Name</label>
                            <input onChange={handleChange} id="lastName" name="lastName" className="form-control" placeholder="Last Name" type="text" />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="gender" className="form-label">Gender</label>
                        <div className="col-12">
                            <select onChange={handleChange} name="gender" className="form-select" id="gender">
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="username" className="form-label">User Name</label>
                        <div className="col-12">
                            <input  
                                onChange={handleChange}
                                name="userName"
                                className="form-control" 
                                id="username" 
                                placeholder="User Name" 
                                type="text" 
                            />
                            <p className="fs-6 fw-normal m-0 text-danger">*Should be unique</p>
                        </div>
                    </div>                   
                    
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <div className="d-flex justify-content-around align-items-center form-control">
                            <input onChange={handleChange} className='col-10 border border-0' name="password" id="password" placeholder="Password" type={isPassVisible ? "text" :"password" }/>
                            {isPassVisible ? <MdVisibility  onClick={() => setVisibility(!isPassVisible)} className='fs-4 col-2'/> : <MdVisibilityOff  onClick={() => setVisibility(!isPassVisible)} className='fs-4 col-2'/>}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <div className="d-flex justify-content-around align-items-center form-control" >
                            <input onChange={handleChange} id="confirmPassword" name="confirmePassword" className='col-10 border border-0' placeholder="Confirm Password" type={isCPassVisible ? "text" :"password" }/> 
                            {isCPassVisible ? <MdVisibility onClick={() => setCVisibility(!isCPassVisible)} className='fs-4 col-2'/> : <MdVisibilityOff  onClick={() => setCVisibility(!isCPassVisible)} className='fs-4 col-2'/>}
                        </div> 
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
