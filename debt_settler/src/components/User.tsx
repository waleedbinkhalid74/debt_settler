// UserCard.tsx
import React, { useState } from "react";

interface UserProps {
    userName: string;
    handleDelete: (userName: string) => void;  // Pass handleDelete from the parent
}

const User: React.FC<UserProps> = ({ userName, handleDelete }) => {
    const [amount, setAmount] = useState("");

    const handleAdd = () => { };


    return (
        <div className="container card w-25 p-4 mt-2 shadow bg-dark text-white border border-light">
            <div className="card-header bg-secondary border-0">
                <h5 className="card-title text-white text-center">{userName}</h5>
            </div>
            <div className="card-body d-flex"></div>
            <input
                type="text"
                className="form-control bg-secondary text-white border-0"
                placeholder="Paid Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <div className="d-flex gap-2">
                <button className="btn btn-primary" onClick={handleAdd}>
                    Add
                </button>
                <button
                    className="btn btn-danger"  // Changed color to indicate deletion
                    onClick={() => handleDelete(userName)}  // Call the passed delete function
                >
                    Delete User
                </button>

            </div>
        </div>
    );
};

export default User;
