import React from 'react'
import {Link} from 'react-router-dom'

const ProjectItem = ({item}) => {
    return (
        <tr>
            <td>{item.project_id}</td>
            <td>{item.project_name}</td>
            <td><button onClick={()=>deleteProject(item.id)} type='button'>Delete</button></td>
        </tr>
    )
}

const ProjectList = ({items, deleteProject}) => {
    return (
        <div>
        <table>
            <tr>
                <th>ID</th>
                <th>NAME</th>
                <th></th>
            </tr>
            {items.map((item) => <ProjectItem item={item} deleteProject={deleteProject} />)}
        </table>
        <Link to='/projects/create'>Create</Link>
        </div>
    )
}

export default ProjectList