import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserPage from './Component/user';
import AdminPage from './Component/admin';
import Signin from './Component/Signin';
import { auth, db } from './firebaseConfig';

class App extends React.Component {
  state = {
    person: ''
  }
  componentWillMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.ref().child('data').child(user.uid).on('value', (snap) => {
          if (snap.val()) {
            this.setState({
              person: snap.val().person
            })
          }
        })
      }
    })
  }
  signout = ()=>{
    auth.signOut().then(()=>{
      this.setState({
        person : ''
      })
    })
  }
  render() {
    return (
      <div className="App">
        {this.state.person == 'user' && <UserPage signOut = {this.signout}/>}
        {this.state.person == 'admin' && <AdminPage signOut = {this.signout}/>}
        {this.state.person == '' && <Signin />}

      </div>
    )
  }
}

export default App;
