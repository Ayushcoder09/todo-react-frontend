import { useEffect, useState } from "react"
import { deleteTodoApi, retrieveAllTodosForUsernameApi, } from "./api/TodoApiService"
import { useAuth } from "./security/AuthContext"
import { useNavigate } from "react-router-dom"
import React from "react"

function ListTodosComponent() {
    const today = new Date()
    const targetDate = new Date()
    targetDate.setFullYear(today.getFullYear() + 5)
    targetDate.setMonth(today.getMonth())
    targetDate.setDate(today.getDate())

    const [todos, setTodos] = useState([])

    const [message, setMessage] = useState(null)

    const AuthContext = useAuth()

    const username = AuthContext.username

    const Navigate = useNavigate()

    useEffect(() => refreshTodos(), [])

    function refreshTodos() {
        retrieveAllTodosForUsernameApi(username)
            .then((response) => {
                console.log(response.data);
                setTodos(response.data);
            })
            .catch((error) => console.log(error));
    }

    function deleteTodo(id) {
        console.log(`Delete todo with id: ${id}`)
        deleteTodoApi(username, id)
            .then((response) => {
                refreshTodos();
                setMessage(`Delete of todo id ${id} is successful`)

            })
            .catch((error) => console.log(error));
    }

    function updateTodo(id) {
        Navigate(`/todo/${id}`)
    }

    function addNewTodo() {
        Navigate(`/todo/-1`)
    }

    return (
        <div className="container">
            <h1>Things that you want to do</h1>
            {message && <div className="alert alert-warning">{message}</div>}
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Target Date</th>
                            <th>Is Done?</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map(
                                todo => (
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{todo.targetDate.toString()}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td><button className="btn btn-warning" onClick={() => deleteTodo(todo.id)}>Delete</button></td>
                                        <td><button className="btn btn-success" onClick={() => updateTodo(todo.id)}>Update</button></td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>

                <button className="btn btn-success" onClick={addNewTodo}>Add New Todo</button>
            </div>
        </div>
    )
}

export default ListTodosComponent