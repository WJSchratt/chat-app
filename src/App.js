import React, { Component } from 'react';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';


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
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <RoomList firebase={ firebase }>
        </RoomList>
        </header>
      </div>
    );
  }
}

export default App;