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
        <h1>{this.state.activeRoom.name || "Select A Room"}</h1>
        <header className="App-header">
        <RoomList firebase={ firebase } activeRoom={this.activeRoom}>
        </RoomList>
        <MessageList firebase={ firebase } activeRoomKey={this.state.activeRoom.key} user={this.state.user}>
        </MessageList>
        <User firebase={ firebase } setUser={this.setUser} user={this.state.user}>
        </User>
        </header>
      </div>
    );
  }
}

export default App;
