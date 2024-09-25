import { useEffect, useState } from "react";
import {json, Navigate, useParams } from 'react-router-dom'
import {v4 } from 'uuid'

import Cookies  from "js-cookie";
import Header from "../Header"
import './index.css'



const AddTodoForm = () => {
    const params = useParams()
    const {id} = params    
    const [todo, setTodo] = useState({title:"", description:"", due_date:"", priority:"Medium"})
    useEffect(() => {
        if(id){
            makeAPIcallToEditTODOItem()
        }
    },[])

    const makeAPIcallToEditTODOItem = async () => {        
        const jwtToken = Cookies.get("jwt")
        const username = Cookies.get("username")
        const url = `http://localhost:3001/get-todo-by-id/${id}`
        const options = {
            method:"GET",
            headers:{
                Authorization: `Bearer ${jwtToken}`,
                "Content-Type":"application/json" 
            },
        }
        const serverRes = await fetch(url, options)
        const r =await serverRes.json()
        setTodo({...r})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const jwtToken = Cookies.get("jwt")
        const username = Cookies.get("username")
        const url = 'http://localhost:3001/new-todo-lists'
        const options = {
            method: "POST",
            headers:{
                Authorization: `Bearer ${jwtToken}`,
                "Content-Type":"application/json"
            },
            body: JSON.stringify({...todo,username, id: v4()})
        }
        const serverRes = await fetch(url, options)
    
        const r = await serverRes.json()
        if(serverRes.ok){
            return alert("Success")
        }else{
            return alert(r.message)
        }
      }   
    
      const handleEdit = async (e) => {
        e.preventDefault()
        const urlToEdit = `http://localhost:3001/edit-todo-by-id/${id}`
        const options = {
            method: "PUT",
            headers:{
                Authorization: `Bearer ${jwtToken}`,
                "Content-Type":"application/json"
            },
            body: JSON.stringify({todo})
        }
        const serverRes = await fetch(urlToEdit, options)
        const r = await serverRes.json()
        if(serverRes.ok){
            return alert("Success")
        }else{
            return alert(r.message)
        }

      }

    const onChnageTodo = (e) => {
        const {name, value} = e.target
        setTodo({...todo, [name]: value})
    }

    const jwtToken = Cookies.get("jwt")

     if(jwtToken === undefined){
         return <Navigate to="/sing-in"/>
     }    
     
     const d = todo.due_date

    return (
        <>
            <Header/>
                <div className="app">
                    <h1 className="mb-4 mt-2 text-decoration-underline text-center">{id === undefined ? "Add New TODO Here":"Edit Old TODO Here"}</h1>
                    <form onSubmit={id === undefined ?  handleSubmit : handleEdit} className="task-form">
                        <label htmlFor="title" className="fs-5">{id === undefined ?  "TODO Name" : "Edit Todo"}</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="TODO Title"
                            value={todo.title}
                            onChange={onChnageTodo}
                            required
                        />
                        <label htmlFor="description"  className="mt-2 fs-5">{id === undefined ?  "TODO Description" : "Edit Description"}</label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="TODO Description"
                            value={todo.description}
                            onChange={onChnageTodo}
                            required
                        />
                        <label htmlFor="dueDate" className="mt-2 fs-5">{id === undefined ?  "Due Date" : "Change Due Date"}</label>
                        <input
                            id="dueDate"
                            name="due_date"
                            type="date"
                            value={todo.due_date}
                            onChange={onChnageTodo}
                            required
                        />
                        <label htmlFor="priority" className="mt-2 fs-5">{id === undefined ?  "Priority" : "Change Priority"}</label>
                        <select name="priority" id="priority" value={todo.priority} onChange={onChnageTodo}>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                        {id === undefined ?  <button type="submit">Add Task</button> : <button type="submit">Edit Task</button> }
                        
                    </form>
                    
                </div>               
                
            
        </>
        

    )

}
export default AddTodoForm