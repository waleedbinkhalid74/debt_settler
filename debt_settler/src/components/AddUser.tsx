import { useState } from "react";

interface AddUserProps {
  users: string[];  // Pass users array from the parent
  setUsers: (userName: string[]) => void;  // Pass setUsers function from the parent
}

function AddUser({ users, setUsers }: AddUserProps) {
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


  return (
    <div className="p-3">
      <div className="container card p-3 text-white bg-card">
        <div className="card-header bg-cardHeader">
          <h5 className="card-title text-black text-center">Add User</h5>
        </div>
        <div className="card-body d-flex gap-2">
          <input
            type="text"
            className="form-control bg-inputFields text-black border-0"
            placeholder="User Name"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="btn bg-button" onClick={handleAdd}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
