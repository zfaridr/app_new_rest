import React from 'react'

const UserItem = ({user}) => {
    return (
        <tr>
            <td>
                {user.first_name}
            </td>
            <td>
                {user.last_name}
            </td>
            <td>
                {user.birthday_year}
            </td>
        </tr>
    )
}

const UserList = ({users}) => {
    return (
        <table>
            <th>
                first_name
            </th>
            <th>
                last_Name
            </th>
            <th>
                birthday_year
            </th>
            {users.map((user) => <UserItem user={user}/>)}
        </table>
    )
}
export default UserList