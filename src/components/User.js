import React, { Component } from 'react';
import * as firebase from 'firebase';

class User extends Component{
  constructor(props) {
    super(props);

      this.state = {
        userName:"",
      };

    }
    componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
      var user = firebase.auth().currentUser;
      if (user) {
        this.setState({ userName : this.props.user.displayName})
      } else {
        this.setState({ userName: "Guest" })
      }
    });}

  signOut = () => {
    this.props.firebase.auth().signOut();
  }

  signIn = () => {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }


    render(){
      return(
        <div>
        <button onClick={() => this.signIn()}>Sign in</button>
        <button onClick={() => this.signOut()}>Sign out</button>
        <h2>{this.state.userName}</h2>
        </div>
      )
    }
  }













export default User;
