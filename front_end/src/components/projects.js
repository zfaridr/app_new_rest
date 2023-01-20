import React from 'react'

const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>
                {project.id}
            </td>
            <td>
                {project.project_id}
            </td>
            <td>
                {project.project_name}
            </td>
            <td>
                {project.start_date}
            </td>
            <td>
                {project.finish_date}
            </td>
            <td>
                {project.participants}
            </td>
        </tr>
    )
}

const ProjectsList = ({projects}) => {
    return (
        <table>
            <th>
                id
            </th>
            <th>
                project_id
            </th>
            <th>
                project_name
            </th>
            <th>
                start_date
            </th>
            <th>
                finish_date
            </th>
            <th>
                participants
            </th>
            {projects.map((project) => <ProjectItem project={project}/>)}
        </table>
    )
}
export default ProjectsList