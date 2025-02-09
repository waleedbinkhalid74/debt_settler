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
    const [involvedUsers, setInvolvedUsers] = useState<string[]>([]);

    const handleCheckboxChange = (item: string) => {
        setInvolvedUsers((prev) =>
            prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
        );
    };

    const handleSelectAll = () => {
        setInvolvedUsers(involvedUsers.length === users.length ? [] : users);
    };

    const handleDivideEqually = () => {
        let numericAmount = parseFloat(amount);
        if (isNaN(numericAmount) || numericAmount <= 0) {
            // incorrect amount
            setError("Amount must be greater than zero you silly goose!");
            return;
        }
        if (involvedUsers.length === 0) {
            // no users selected
            setError("Please select at least one user");
            return;
        }
        // if involved Users involves self then remove self and devide numeric amount by length + 1
        let targetUsers = [...involvedUsers]; // Create a shallow copy
        if (targetUsers.includes(userName)) {
            targetUsers.splice(targetUsers.indexOf(userName), 1);
            addTransaction(userName, numericAmount / (targetUsers.length + 1), targetUsers);  // Pass the transaction up to the parent 
        }
        else {
            addTransaction(userName, numericAmount / targetUsers.length, targetUsers);  // Pass the transaction up to the parent
        }
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
            <label className="btn btn-primary w-25">
                <input
                    type="checkbox"
                    className="btn-check"
                    checked={involvedUsers.length === users.length}
                    onChange={handleSelectAll}
                />
                Select All
            </label>
            {users.map((item) => (
                <label key={item} className="flex items-center mb-1">
                    <input
                        type="checkbox"
                        checked={involvedUsers.includes(item)}
                        onChange={() => handleCheckboxChange(item)}
                        className="mr-2"
                    />
                    {item}
                </label>
            ))}
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
