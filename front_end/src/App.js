import React from 'react';
import 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import UserList from './components/Users.js'
import ToDoList from './components/todo.js'
import ProjectsList from './components/projects.js'
import axios from 'axios'
import { HashRouter, Link } from 'react-router-dom'
import LoginForm from './components/Auth.js'
import Cookies from 'universal-cookie';


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
            'todo': [],
            'token': ''
        }
    }
    
    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, ()=>this.load_data())
    }

    is_authenticated() {
        return this.state.token != ''
    }

    logout() {
        this.set_token('')
    }
        
    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, ()=>this.load_data())
    }

    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
        .then(response => {
            this.set_token(response.data['token'])
        }).catch(error => alert('Неверный логин или пароль'))
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated())
            {
                headers['Authorization'] = 'Token ' + this.state.token
            }
            return headers
        }

    load_data() {
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/Users/', {headers})
            .then(response => {
                this.setState({users: response.data})
            }).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/todo/', {headers})
            .then(response => {
                this.setState({todo: response.data})
            }).catch(error => {console.log(error)
                this.setState({todo: []})
            })
        axios.get('http://127.0.0.1:8000/api/projects/', {headers})
            .then(response => {
                this.setState({projects: response.data})
            }).catch(error => console.log(error))
    }
    
    componentDidMount() {
        this.get_token_from_storage()
        this.load_data()
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
                            <li>
                                <Link to='/login'>Login</Link>
                            </li>
                            <li>
                                {this.is_authenticated() ? <button onClick={()=>this.logout()}>Logout</button> : <Link to='/login'>Login</Link>}
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route exact path='/users' component={componentDidMountU} />
                        <Route exact path='/projects' component={componentDidMountP}/>
                        <Route exact path='/todo' component={componentDidMountT} />
                        <Route exact path='/login' component={() => <LoginForm get_token={(username, password) => this.get_token(username, password)} />} />
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
