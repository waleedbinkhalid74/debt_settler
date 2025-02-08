// UserCard.tsx
import React, { useState } from "react";

interface UserProps {
    userName: string;
    handleDelete: (userName: string) => void;  // Pass handleDelete from the parent
    users: string[];  // Pass users array from the parent
    addTransaction: (userName: string, amount: number, otherUsers: string[]) => void;  // New prop to handle transaction updates
}

const User: React.FC<UserProps> = ({ userName, handleDelete, users, addTransaction }) => {
    const [amount, setAmount] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const handleDivideEqually = () => {
        let numericAmount = parseFloat(amount);
        if (isNaN(numericAmount) || numericAmount <= 0) {
            // incorrect amount
            setError("Amount must be greater than zero you silly goose!");
            return;
        }
        let otherUsers = users.filter(user => user !== userName);
        addTransaction(userName, numericAmount / otherUsers.length, otherUsers);  // Pass the transaction up to the parent 
        setAmount("Paid Amount"); // Clear amount after successful transfer
        setError(null); // Clear error when successful
    };


    return (
        <div className="container card w-25 p-4 mt-2 shadow bg-dark text-white border border-light">
            <div className="card-header bg-secondary border-0">
                <h5 className="card-title text-white text-center">{userName}</h5>
            </div>
            <div className="card-body d-flex"></div>
            <input
                type="number"
                className="form-control bg-secondary text-white border-0"
                placeholder="Paid Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div className="card-body d-flex"></div>
            <div className="d-flex gap-2">
                <button className="btn btn-primary" onClick={handleDivideEqually}>
                    Divide Equally
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
