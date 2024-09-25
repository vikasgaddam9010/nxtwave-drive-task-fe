import Cookies from "js-cookie"

import { useEffect, useState } from "react"
import {Navigate, useNavigate} from "react-router-dom"

import Header from "../Header"
import './index.css'

const TodoListItems = () => {    
    const navigator = useNavigate()
    const [apiLoading, setApiLoading] = useState(false)
    const [todos, setTodos] = useState([])

    useEffect(() => {
        getTodos()
    })

    const getTodos = async () => {
        setApiLoading(true)
        const jwtToken = Cookies.get("jwt")
        const url = 'http://localhost:3001/get-todos-list'
        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                "Content-Type":"application/json"
            }
        }
        const serverRes = await fetch(url, options)
        const {list} = await serverRes.json()
        setTodos(list)
    }   

    const jwtToken = Cookies.get("jwt")
    if(jwtToken === undefined){
        return <Navigate to="/sing-in"/>
    }
    
    const getTodosView = () => {
        return(
        todos.map((task, index) => {
            const handleEdit = () => {
                navigator(`/eidt-todo-list/${task.id}`)
            }

            const handleDelete = async () => {
                const jwtToken = Cookies.get("jwt")
                console.log(jwtToken)
                const urlToDeleteTODOItem = `http://localhost:3001/delete-todo-by-id/${task.id}`
                const options = {
                    method:"DELETE",
                    headers:{
                        Authorization: `Bearer ${jwtToken}`,
                        "Content-Type":"application/json"
                    }
                }
                await fetch(urlToDeleteTODOItem, options)

            }
            
            return (
            <li key={index} className="taskItem">
                <div style={{width:"200px"}}>
                    <h3 className="taskTitle">{task.title}</h3>
                </div>
                <div>
                    <p className="m-0">{task.priority} </p>
                </div>
                <div className="d-flex align-items-center">
                    <div >                          
                        <p className="m-0">Due Date: {task.due_date}</p>
                    </div>                
                    <div  className="ms-5 text-center">
                        <button onClick={handleEdit} className="m-0 mb-1 btn btn-success">Edit</button><br/>
                        <button onClick={handleDelete} className="m-0 mt-1 btn btn-danger">Delete</button>
                    </div>
                </div>  
                             
            </li>
        )}) )
    }
    
    return (
        <>
            <Header/>            
            <ul className="mx-5 taskList">
                {apiLoading && (  
                    getTodosView()   
                )}
            </ul>
        </>
    )
}

export default TodoListItems