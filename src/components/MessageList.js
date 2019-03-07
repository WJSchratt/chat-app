import React, { Component } from 'react';
import * as firebase from 'firebase';

class MessageList extends Component {
  constructor(props) {
    super(props);


    this.state = {
                messages:[],
                username: "",
                content: "",
                sentAt: "",
                roomId: ""
    };

    this.messagesRef = this.props.firebase.database().ref('messages');
  }

    componentDidMount() {
       this.messagesRef.on('child_added', snapshot => {
         const message = snapshot.val();
         message.key = snapshot.key;
         this.setState({ messages: this.state.messages.concat( message ) })
     });
   }



      render(){
        console.log(this.state.messages)
        const activeRoom = this.props.activeRoom
        return(
          <div>
          <h1>{this.state.messages.map((message) => {
            if(message.roomId === activeRoom){
              return(
                <li key={message.key}>{message.username}: {message.content}</li>);}})}
          </h1>
          </div>
        );
      }
}

export default MessageList;
