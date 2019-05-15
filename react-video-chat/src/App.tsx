import React from 'react';

import Logs from './components/Logs';
import Rooms from './components/Rooms';
import Video from './components/Video';

class App extends React.Component {
  state = {
    username: '',
    authenticated: false,
    roomName: '',
    rooms: [
      {id: 1, name: 'JavaScript Room'},
      {id: 2, name: 'Python Room'},
      {id: 3, name: 'Daily standup'}
    ],
    roomCount: 3, // number of rooms present
    loading: false, // indicate when tracks in a room is being loaded
    activeRoom: '',
    identity: null,
    previewTracks: null,
    localMediaAvailable: false, /* Represents the availability of a LocalAudioTrack(microphone) and a LocalVideoTrack(camera) */
    hasJoinedRoom: false,
  }

  submitUsername = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if(!this.state.username) {
      return alert('please provide a username');
    }

    this.setState({ authenticated: true });
  }

  handleChange = (event: React.SyntheticEvent) => {
    const target = (event.target as HTMLInputElement);

    this.setState({ 
      [target.name]: target.value 
    });
  }

  createNewRoom = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const { roomName, roomCount } = this.state;
    const newCount = roomCount + 1;

    if(!roomName) {
      return alert("please provide a room name");
    }

    this.setState({ 
      roomName,
      roomCount: newCount,
      rooms: [...this.state.rooms, {id: newCount, name: roomName}]
    });
  }

  showRoom = (name: string) => {
    this.setState({ activeRoom: name })
  }

  render() {
    const { username, authenticated, roomName, rooms, roomCount, loading, activeRoom } = this.state;

    return (
      <div className="app">
        <div className="container-fluid chat_container" id="app">
            {authenticated 
              ? (
                <div className="row">
                  <Rooms
                    rooms={rooms}
                    roomCount={roomCount}
                    loading={loading}
                    roomName={roomName}
                    onChange={this.handleChange} 
                    onSubmit={this.createNewRoom}
                    showRoom={this.showRoom}
                  />
                  <Video username={username} loading={loading} activeRoom={activeRoom} />
                  <Logs />
                </div>
              ) 
              : (
                <div className="row">
                  <div className="username">
                      <form className="form-inline" onSubmit={this.submitUsername}>
                        <div className="form-group mb-2">
                            <input 
                              type="text" 
                              className="form-control" 
                              name="username"
                              onChange={this.handleChange}
                              value={username}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary mb-2 Botton">
                          Submit
                        </button>
                    </form>
                  </div>
                </div>
              )}
        </div>
      </div>
    );
  }
}

export default App;
