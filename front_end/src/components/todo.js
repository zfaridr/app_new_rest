import React from 'react'
import {Link} from 'react-router-dom'

const todoItem = ({item}) => {
    return (
        <tr>
            <td>{item.text}</td>
            <td>{item.project}</td>
            <td><button onClick={()=>deleteToDo(item.id)} type='button'>Delete</button></td>
        </tr>
    )
}

const todoList = ({items, deleteToDo}) => {
    return (
        <div>
        <table>
            <tr>
                <th>text</th>
                <th>PROJECT</th>
                <th></th>
            </tr>
            {items.map((item) => <todoItem item={item} deleteToDo={deleteToDo} />)}
        </table>
        <Link to='/todo/create'>Create</Link>
        </div>
    )
}

export default todoList