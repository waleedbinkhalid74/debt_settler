import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function AddUser() {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    console.log("Message sent:", message);
    setMessage(""); // Clear input after sending
  };

  return (
    <div className="card w-25 p-3 shadow bg-dark text-white border border-light">
      <div className="card-header bg-secondary border-0">
        <h5 className="card-title text-white text-center">Add User</h5>
      </div>
      <div className="card-body d-flex gap-2">
        <input
          type="text"
          className="form-control bg-secondary text-white border-0"
          placeholder="User Name"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
  
}

export default AddUser