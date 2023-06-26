import React, {useEffect, useState} from 'react'
import FormAdd from './FormAdd';
import axios from 'axios';
import ListItemTodo from './ListItemTodo';

const TodoList = () => {
    
    const url = 'http://localhost:5000/data';

    const [todos, setTodos] = useState([]);
    //get all todos
    useEffect(() => {
        axios.get(url).then((res) => {
            try {
                // console.log(res.data);
                setTodos(res.data);
            } catch (err) {
                console.log(err);
            }
        });
    });
    //add todo
    function addTodo(todo){
       return axios.post(url, todo);
    }
    //delete
    function deleteTodo(id) {
        return axios.delete(`${url}/${id}`)
    }

    //update data
    function updateTodo(id, todo){
        return axios.put(`${url}/${id}`, todo)
    }

  return (
    <>
    <FormAdd addData={addTodo}/>
    <ul>
        {todos.map((todo) => ( 
            <ListItemTodo updateData={updateTodo} deleteData={deleteTodo} todo={todo.todo} key={todo.id} id={todo.id} />
        ))
        .reverse()
        }
    </ul>
  </>
  );
  
}

export default TodoList