import {BrowserRouter, Routes,Route} from 'react-router-dom'

import Home from "./components/Home"
import AddTodoForm from './components/AddTodoForm'
import SingUp from './components/SingUp'
import SingIn from './components/SingIn'
import TodoListItems from './components/TodoListItems'
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>        
        <Route excat path='/sing-up' element={<SingUp/>}/>
        <Route excat path='/sing-in' element={<SingIn/>}/>
        <Route excat path='/add-todo-list/' element={<AddTodoForm/>}/>
        <Route excat path='/eidt-todo-list/:id' element={<AddTodoForm/>}/>
        <Route excat path='/todo-items' element={<TodoListItems/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
