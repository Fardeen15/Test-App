import React from 'react'
import { auth, db } from '../firebaseConfig'
class Signin extends React.Component {
    state = {
        signUp: false
    }
    signin = (event) => {
        event.preventDefault()

        if (this.state.email && this.state.password) {
            auth.signInWithEmailAndPassword(this.state.email, this.state.password)
        }
    }
    signUp = (event) => {
        event.preventDefault()
        if (this.state.email && this.state.password) {
            var obj = {
                email: this.state.email,
                password: this.state.password,
                name: this.state.name,
                person: 'user'
            }
            auth.createUserWithEmailAndPassword(this.state.email, this.state.password).then((user) => {
                db.ref().child('data').child(user.user.uid).set(obj)
            })
        }
    }
    Change = (name, ev) => {
        console.log(name, ev.target.value)
        this.setState({
            [name]: ev.target.value
        })
    }
    render() {
        return (
            <div>
                <div>
                    {this.state.signUp ?
                        <form className='form'>
                            <h2>sign Up</h2>
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Full name</label>
                                <input type="text" class="form-control" id="exampleFormControlInput1" onChange={(ev) => this.Change('name', ev)} placeholder="FullName" />
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Email address</label>
                                <input type="email" class="form-control" id="exampleFormControlInput1" onChange={(ev) => this.Change('email', ev)} placeholder="Email" />
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Password</label>
                                <input type="password" class="form-control" id="exampleFormControlInput1" onChange={(ev) => this.Change('password', ev)} placeholder="passWord" />
                            </div>
                            <button class="btn btn-primary btn-lg btn-block" onClick={(ev) => this.signUp(ev)}>SignUp</button> 
                            <button class="btn btn-secondary btn-lg btn-block" onClick={(event) => {
                                event.preventDefault()
                                this.setState({
                                    signUp: false
                                })
                            }}>SignIn</button>
                        </form>
                        : <form className='form'>
                            <h2>sign In</h2>
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Email address</label>
                                <input type="email" class="form-control" id="exampleFormControlInput1" onChange={(ev) => this.Change('email', ev)} placeholder="Email" />
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Password</label>
                                <input type="password" class="form-control" id="exampleFormControlInput1" onChange={(ev) => this.Change('password', ev)} placeholder="passWord" />
                            </div>
                            <button class="btn btn-primary btn-lg btn-block" onClick={(ev) => this.signin(ev)}>Sign in</button>
                            <button class="btn btn-secondary btn-lg btn-block" onClick={(event) => {
                                event.preventDefault()
                                this.setState({
                                    signUp: true
                                })
                            }}>SignUp</button>
                        </form>}
                </div>
            </div>
        )
    }
}
export default Signin