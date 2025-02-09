import { useState } from "react";
import User from './User'

interface AddUserProps {
  users: string[];  // Pass users array from the parent
  setUsers: (userName: string[]) => void;  // Pass setUsers function from the parent
  addTransaction: (userName: string, amount: number, otherUsers: string[]) => void;  // New prop to handle transaction updates
}

function AddUser({ users, setUsers, addTransaction }: AddUserProps) {
  const [message, setMessage] = useState("");

  const handleAdd = () => {
    if (message.trim()) {
      let userExists = users.find(user => user === message);
      if (userExists) {
        alert("User already exists!");
        return;
      }
      setUsers([...users, message]);  // Add new user to the array
      setMessage("");  // Clear the input field
    }
  };

  const handleDelete = (userName: string) => {
    setUsers(users.filter(user => user !== userName));  // Remove user by name
  };

  return (
    <div>
      <div className="container card w-25 p-3 shadow text-white bg-card">
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
          <User
            key={index}
            userName={user}
            handleDelete={handleDelete}
            users={users}
            addTransaction={addTransaction} />
        ))}
      </div>
    </div>
  );
}

export default AddUser;
