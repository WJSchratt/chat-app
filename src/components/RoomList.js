import React, { Component } from 'react';
import * as firebase from 'firebase';
import './RoomList.css';
import { Container, Section, Heading } from 'react-bulma-components';

class RoomList extends Component {
  constructor(props) {
    super(props);


    this.state = { //store list of rooms in array to be rendered
      rooms:[],
      name:''
    };

    this.roomsRef = this.props.firebase.database().ref('rooms'); ///firebase reference, 'rooms' used to mainuplate data
    this.createRoom = this.createRoom.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.selectRoom = this.selectRoom.bind(this)
    this.deleteRooms = this.deleteRooms.bind(this)
  }

  componentDidMount() {
     this.roomsRef.on('child_added', snapshot => { //calls upon every object from firebase reference
       const room = snapshot.val();  //stores those objects
       room.key = snapshot.key; //  need key for rendering
       this.setState({ rooms: this.state.rooms.concat( room ) })
      // set state to new array with concat
     });
   }

  createRoom (e) {
    e.preventDefault();
    this.roomsRef.push({
    name: this.state.name
  });
  this.seState({ name : "" })
  }

  handleChange (e) {
  this.setState({ name: e.target.value })
  }

  deleteRooms(index) {

    this.roomsRef.filter({

    })

   }


  selectRoom(room) {
    this.props.activeRoom(room);
  }

   render() {
      return(
        <div>
          <Section size="large">
            <Container>
              <p className="bd-notification is-success">
          <Heading size={5} renderAs="p">
        <div className="test">
          <p className="roomlist">{this.state.rooms.map((room, index) =>( // map data to name and key on to constant to be rendered
            <li key={room.key} index={index} onClick={() => this.selectRoom(room)}>{room.name}  </li>))}
          </p>
            <h1>Well Hello</h1>
          <div>
              <form onSubmit= {this.createRoom}>
                <input type="text" value={this.state.name} placeholder="Please type a Word" onChange={this.handleChange}/>
                <input type="submit" value="Add A Room" />
              </form>
            </div>
        </div>
        </Heading>
          <Heading subtitle renderAs="p">
            Container
          </Heading>
        </p>
      </Container>
      </Section>
      </div>

      );
  }
}


export default RoomList;
