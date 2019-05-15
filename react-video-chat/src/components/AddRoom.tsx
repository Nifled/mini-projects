import React from 'react';

export interface AddRoomProps {
  roomName: string,
  onSubmit: (event: React.SyntheticEvent) => void,
  onChange: (event: React.SyntheticEvent) => void
}
 
const AddRoom: React.SFC<AddRoomProps> = ({ roomName, onSubmit, onChange }) => {
  return (
    <div className="row roomForm">
      <form className="form-inline" onSubmit={onSubmit}>
        <div className="form-group mb-2">
          <input 
            type="text" 
            className="form-control" 
            name="roomName"
            onChange={onChange}
            value={roomName}
          />
        </div>
        <button type="submit" className="btn btn-primary mb-2 createRoomBotton">
          Create Room
        </button>
      </form>
    </div>
  );
}
 
export default AddRoom;
