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
        <div className="bg-card container card w-25 p-4 mt-2 text-white">
            <div className="bg-cardHeader card-header">
                <h5 className="card-title text-black text-center">{userName}</h5>
            </div>
            <div className="card-body d-flex"></div>
            <input
                type="number"
                className="form-control text-black border-0"
                placeholder="Paid Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div className="card-body d-flex"></div>
            <label className="btn bg-button w-30">
                <input
                    type="checkbox"
                    className="btn-check"
                    checked={involvedUsers.length === users.length}
                    onChange={handleSelectAll}
                />
                Select All
            </label>
            <div className="card-body d-flex"></div>
            {users.map((item) => (
                <div key={item} className="container">
                    <div className="row">
                        <div className="col-sm text-black">
                            <input
                                type="checkbox"
                                checked={involvedUsers.includes(item)}
                                onChange={() => handleCheckboxChange(item)}
                                className="w-5 h-5"
                            />
                            <span className="w-32 gap-x-4">{item}</span>
                        </div>
                        <div className="col-sm">
                            <input
                                type="number"
                                className="text-black rounded bg-inputFields border-0"
                                placeholder="Amount"
                            />
                        </div>
                    </div>
                    <div style={{ marginBottom: "4px" }}></div>
                </div>
            ))
            }
            <div className="card-body d-flex"></div>
            <div className="d-flex gap-2">
                <button className="btn bg-button" onClick={handleDivideEqually}>
                    Divide Equally
                </button>
                <button
                    className="btn bg-buttonDanger"  // Changed color to indicate deletion
                    onClick={() => handleDelete(userName)}  // Call the passed delete function
                >
                    Delete User
                </button>
            </div>
        </div >
    );
};

export default User;
