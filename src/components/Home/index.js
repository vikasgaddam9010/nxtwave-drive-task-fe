import {Link} from 'react-router-dom'
import Cookies from "js-cookie"

import './index.css'
import Header from '../Header';

const Home = () => {
    const username = Cookies.get("username")
    console.log(username)
    return (
        <div>
            <Header/>
            <div style={{height:"85vh"}} class="text-body-emphasis d-flex flex-column justify-content-center align-items-center">
                <h1 className='mb-4 '>Welcome, {username ? username : "Guest"}!</h1>
                <h4>What to add Your TODO List Here?</h4>
                <Link to="/add-todo-list/">
                    <button className='btn btn-primary mt-4'>Click Here To Add</button>
                </Link>                
            </div>
        </div>
    )
}

export default Home

