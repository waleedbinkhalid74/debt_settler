import { useState } from "react";
import User from './User'

function AddUser() {
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);

  const handleAdd = () => {
    if (message.trim()) {
      setUsers([...users, message]);  // Add new user to the array
      setMessage("");  // Clear the input field
    }
  };

  const handleDelete = (userName: string) => {
    setUsers(users.filter(user => user !== userName));  // Remove user by name
  };

  return (
    <div>
      <div className="container card w-25 p-3 shadow bg-dark text-white border border-light">
        <div className="card-header bg-secondary border-0">
          <h5 className="card-title text-white text-center">Add User</h5>
        </div>
        <div className="card-body d-flex gap-2">
          <input
            type="text"
            className="form-control bg-secondary text-white border-0 w-75"
            placeholder="User Name"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="btn btn-primary w-auto" onClick={handleAdd}>
            Add
          </button>
        </div>
      </div>

      <div className="mt-4 d-flex flex-wrap gap-3">
        {users.map((user, index) => (
          <User key={index} userName={user} handleDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}

export default AddUser;
