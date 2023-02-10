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
    
    deleteProject(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers, headers})
            .then(response => {
        this.setState({projects: this.state.projects.filter((item)=>item.id !== id)})
            }).catch(error => console.log(error))
    }

    createProject(project_id, project_name, start_date, finish_date, participants) {
        const headers = this.get_headers()
        const data = {project_id: project_id, project_name: project_name, start_date: start_date, finish_date: finish_date, participants: participants}
        axios.post(`http://127.0.0.1:8000/api/projects/`, data, {headers, headers})
            .then(response => {
                let new_project = response.data
                const user = this.state.users.filter((item) => item.id ===
                new_project.user)[0]
                new_project.user = user
                this.setState({projects: [...this.state.projects, new_project]})
            }).catch(error => console.log(error))
    }

    deleteToDo(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/todo/${id}`, {headers, headers})
            .then(response => {
        this.setState({todo: this.state.todo.filter((item)=>item.id !== id)})
            }).catch(error => console.log(error))
    }

    createToDo(text, init_user, init_date, change_date) {
        const headers = this.get_headers()
        const data = {text: text, init_user: init_user, init_date: init_date, change_date: change_date}
        axios.post(`http://127.0.0.1:8000/api/todo/`, data, {headers, headers})
            .then(response => {
                let new_project = response.data
                const user = this.state.users.filter((item) => item.id ===
                new_todo.user)[0]
                new_todo.user = user
                this.setState({todo: [...this.state.todo, new_todo]})
            }).catch(error => console.log(error))
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

    componentDidMount() {
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
                        <Route exact path='/users' component={componentDidMount} />
                        <Route exact path='/projects' component={componentDidMount}/>
                        <Route exact path='/todo' component={componentDidMount} />
                        <Route exact path='/login' component={() => <LoginForm get_token={(username, password) => this.get_token(username, password)} />} />
                        <Route exact path='/projects/create' component={() => <projectForm />} />
                        <Route exact path='/projects' component={() => <ProjectsList items={this.state.projects} deleteProject={(id)=>this.deleteBook(id)} />} />
                        <Route exact path='/projects/create' component={() => <projectForm createProject={(project_id, project_name, start_date, finish_date, participants) => this.createProject(project_id, project_name, start_date, finish_date, participants)} />} />
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
