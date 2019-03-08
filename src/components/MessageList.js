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
    this.messageHandle = this.messageHandle.bind(this);
    this.createMessage = this.createMessage.bind(this);
  }

    componentDidMount() {
       this.messagesRef.on('child_added', snapshot => {
         const message = snapshot.val();
         message.key = snapshot.key;
         this.setState({ messages: this.state.messages.concat( message ) })
     });
   }

    createMessage (e) {
      e.preventDefault();
      this.messagesRef.push({
      username: this.state.username,
      content: this.state.content,
      sentAt: this.state.sentAt,
      roomId: this.state.roomId
      });
      this.setState({ username: "", content: "", sentAt: "", roomId: ""});
   }

    messageHandle (e) {
      this.setState({ username: this.props.user.displayName,
      content: e.target.value,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoomKey });
    }


      render(){
        const activeRoomKey = this.props.activeRoomKey

        return(
          <div>
          <h1>{this.state.messages.map((message) => {
            if(message.roomId === activeRoomKey){
              return(
                <li key={message.key}>{message.username}: {message.content}</li>);}})}
          </h1>
          <h2>
          <form onSubmit= {this.createMessage} >
          <input type="text" value={this.state.content} placeholder="message" onChange={this.messageHandle}/>
          <input type="submit" value="Lets do it " />
          </form>
          </h2>
          </div>
        );
      }
}

export default MessageList;
