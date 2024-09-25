import {Link, useNavigate} from "react-router-dom"
import Cookies from 'js-cookie'
//import './index.css'

const Header = () =>{ 
    const navigator = useNavigate()

    const handlelogout = () => {
        Cookies.remove("jwt")
        Cookies.remove("username")
        navigator("/sing-in")
    }
    
    return (
    <header className="px-5 py-3 bg-primary-subtle text-primary-emphasis d-flex justify-content-between align-items-center">
        <h1 className="m-0">TODO</h1>      
        <div className="m-auto">
            <Link to="/" className="border border-primary rounded px-4 py-2 me-3 text-primary-emphasis text-decoration-none">Home</Link>
            <Link to="/add-todo-list" className="border border-primary rounded px-4 py-2 ms-3 me-3 text-primary-emphasis text-decoration-none">New TODO</Link>
            <Link to="/todo-items" className="border border-primary rounded px-4 py-2 ms-3 text-primary-emphasis text-decoration-none">Your TODOs</Link>
        </div>
        <button onClick={handlelogout} className="btn btn-primary px-3 fs-5">Log Out</button>
    </header>
)}
export default Header