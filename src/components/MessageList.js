import React, { Component } from 'react';
import * as firebase from 'firebase';
import './MessageList.css';

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
      if (this.props.activeRoomKey == null){
        window.alert("pls choose a room")
      }
      else {
      this.messagesRef.push({
      username: this.state.username,
      content: this.state.content,
      sentAt: this.state.sentAt,
      roomId: this.state.roomId
      });
      this.setState({ username: "", content: "", sentAt: "", roomId: ""});
   }}


    messageHandle (e) {
      if(this.props.user == null){
        this.setState({
        username: "guest",
        content: e.target.value,
        sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
        roomId: this.props.activeRoomKey});
      }
      else {
      this.setState({
      username: this.props.user.displayName,
      content: e.target.value,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoomKey });
    }
    }


      render(){
        const activeRoomKey = this.props.activeRoomKey

        return(
              <div className="message">
              <article class="message is-dark">
                <h1 class="message-header is-size-4">
                {this.props.name}
                </h1>
              <div class="message-body">
                <ul>{this.state.messages.map((message) => {
                  if(message.roomId === activeRoomKey){
                    return(
                      <tr key={message.key}>{message.username}: {message.content}</tr>);}})}
                </ul>
                  <span>
                    <form onSubmit= {this.createMessage} >
                      <input type="text" value={this.state.content} placeholder="message" onChange={this.messageHandle}/>
                      <input type="submit" value="Lets do it " />
                    </form>
                  </span>
                </div>
                </article>
                </div>

        );
      }
}

export default MessageList;
