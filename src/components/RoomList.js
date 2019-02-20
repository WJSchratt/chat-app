import React, { Component } from 'react';
import * as firebase from 'firebase';

class RoomList extends Component {
  constructor(props) {
    super(props);


    this.state = { //store list of rooms in array to be rendered
      rooms:[]
    };

    this.roomsRef = this.props.firebase.database().ref('rooms'); //firebase reference, 'rooms' used to mainuplate data
  }

  componentDidMount() {
     this.roomsRef.on('child_added', snapshot => { //calls upon every object from firebase reference
       const room = snapshot.val();  //stores those objects
       room.key = snapshot.key; //  need key for rendering
       this.setState({ rooms: this.state.rooms.concat( room ) }) // set state to new array with concat
     });
   }


   render() {
      const roomList = this.state.rooms.map((room) => // map data to name and key on to constant to be rendered
        <li key={room.key}>{room.name}</li>
      );

      return(
        <h1>{roomList}</h1> // render constant
      );
  }
}


export default RoomList;
