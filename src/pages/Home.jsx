import React from 'react'
import { Todo } from '../components/Todo'
import "../components/todo.css"

export const Home = () => {
  return (
    <div>
    <div id='head'>
      <h1>Lista de Afazeres</h1>
      
    </div>
    <Todo/>
    </div>
  )
}
