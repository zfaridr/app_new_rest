import React from 'react';
import 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import UserList from './components/Users.js'
import ToDoList from './components/todo.js'
import ProjectsList from './components/projects.js'
import axios from 'axios'
import { HashRouter, Link } from 'react-router-dom';


const NotFound = ({location}) => {
    return (
        <div>
            <h1>
                Page '{location.pathname}' does not exist
            </h1>
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todo': []
        }
    }
    
    componentDidMountU() {
        axios.get('http://127.0.0.1:8000/api/users')
            .then(response => {
                const users = response.data
                    this.setState(
                        {
                            'users': users
                        }
                )
            }).catch(error => console.log(error))
    }

    componentDidMountP() {
        axios.get('http://127.0.0.1:8000/api/projects')
            .then(response => {
                const projects = response.data
                    this.setState(
                        {
                            'projects': projects
                        }
                )
            }).catch(error => console.log(error))
    }

    componentDidMountT() {
        axios.get('http://127.0.0.1:8000/api/todo')
            .then(response => {
                const todo = response.data
                    this.setState(
                        {
                            'todo': todo
                        }
                )
            }).catch(error => console.log(error))
    }

    render () {
        return (
            <div class='Wrapper'>
                <HashRouter>
                    <nav>
                        <ul>
                            <li>
                                <Link to='/users'>Users</Link>
                            </li>
                            <li>
                                <Link to='/projects'>Projects</Link>
                            </li>
                            <li>
                                <Link to='/todo'>ToDo_List</Link>
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route exact path='/users' component={componentDidMountU} />
                        <Route exact path='/projects' component={componentDidMountP}/>
                        <Route exact path='/todo' component={componentDidMountT} />
                        <Route component={NotFound}/>
                    </Switch>                      
                    
                </HashRouter>
                
                <div class='MainMenu'>
                    <div>
                        <UserList users={this.state.users} />
                        <ProjectsList projects={this.state.projects} />
                        <ToDoList todos={this.state.todo} />
                    </div>
                </div>
            
                <div class='MainFooter'>
                    <p>
                    Info on main page of the app_new
                    </p>
                </div>
            </div>
                    
        )
    }

       
}

export default App;
