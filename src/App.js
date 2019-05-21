import React, { Component } from 'react';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';


var config = {
    apiKey: "AIzaSyBYOa8WG1_eSHyzAsiUkLKz_BU56_SgEVM",
    authDomain: "chat-room-9d740.firebaseapp.com",
    databaseURL: "https://chat-room-9d740.firebaseio.com",
    projectId: "chat-room-9d740",
    storageBucket: "chat-room-9d740.appspot.com",
    messagingSenderId: "954743297420"
  };
firebase.initializeApp(config);


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { activeRoom: "",
                   user: ""
                                  };
    this.activeRoom = this.activeRoom.bind(this)
    this.setUser = this.setUser.bind(this)
  }

  activeRoom(room) {
      this.setState({ activeRoom: room });
    }

    setUser(user) {
      this.setState({ user: user })
    }

  render() {
    return (
      <div className="App">
      <section class="hero is-primary">
      <div class="hero-body">
      <div class="container">
      <p class="title">Chat-App</p>
      <p class="subtitle">Responsive chat-app demo powered through react and using firebase as the database.</p>
      </div>
      </div>
      </section>
        <section className="Container">
        <div class="columns is-gapless ">
        <div class="column is-one-quarter">
        <RoomList firebase={ firebase } activeRoom={this.activeRoom} name={this.state.activeRoom.name}>
        </RoomList>
        </div>
        <div class="column is-three-quarters">
        <MessageList firebase={ firebase } name={this.state.activeRoom.name} activeRoomKey={this.state.activeRoom.key} user={this.state.user}>
        </MessageList>
        </div>
        </div>
        <div class="columns">
        <div class="column">
        <User firebase={ firebase } setUser={this.setUser} user={this.state.user}>
        </User>
        </div>
        </div>
        </section>
      </div>
    );
  }
}

export default App;
