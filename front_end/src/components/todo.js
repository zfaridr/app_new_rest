import React from 'react'

const ToDoItem = ({todo}) => {
    return (
        <tr>
            <td>
                {todo.text}
            </td>
            <td>
                {todo.project}
            </td>
            <td>
                {todo.init_user}
            </td>
            <td>
                {todo.init_date}
            </td>
            <td>
                {todo.changes_date}
            </td>
        </tr>
    )
}

const ToDoList = ({todos}) => {
    return (
        <table>
            <th>
                text
            </th>
            <th>
                project
            </th>
            <th>
                init_user
            </th>
            <th>
                init_date
            </th>
            <th>
                changes_date
            </th>
            {todos.map((todo) => <ToDoItem todo={todo}/>)}
        </table>
    )
}
export default ToDoList