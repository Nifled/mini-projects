import React from 'react';
import AddRoom from "./AddRoom";

export interface RoomsProps {
  rooms: any[],
  roomCount: number,
  loading: boolean,
  roomName: string,
  onSubmit: (event: React.SyntheticEvent) => void,
  onChange: (event: React.SyntheticEvent) => void,
  showRoom: (name: string) => void
}
 
export interface RoomsState {
  //
}
 
class Rooms extends React.Component<RoomsProps, RoomsState> {
  showRoom = (name: string) => {
    // something
    console.log('erick')
  }

  render() { 
    const { rooms, loading, roomName, onChange, onSubmit, showRoom } = this.props;

    return (
      <div className="col-md-5 rooms">
        {rooms.map(room => (
          <div className="room" key={room.id} onClick={() => showRoom(room.name)}>
            {room.name}
          </div>  
        ))}

        <AddRoom
          roomName={roomName}
          onChange={onChange} 
          onSubmit={onSubmit}
        />
      </div>
    );
  }
}
 
export default Rooms;