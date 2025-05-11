import { useState } from "react";

interface AddTransactionProps {
    users: string[];  // Pass users array from the parent
    addTransaction: (userName: string, amount: number, otherUsers: string) => void;  // New prop to handle transaction updates
    handleDelete: (userName: string) => void;  // Pass handleDelete from the parent
}


const AddTransaction: React.FC<AddTransactionProps> = ({ users, handleDelete, addTransaction }) => {
    const [amount, setAmount] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [involvedUsers, setInvolvedUsers] = useState<string[]>([]);
    const [individualAmount, setIndividualAmount] = useState<Record<string, number>>({});
    const [selectedPayee, setSelectedPayee] = useState<string>("");

    const handleDropdownChange = (payee: string) => {
        setSelectedPayee(payee);
        console.log("Selected Payee: ", selectedPayee);
    };

    const handleCheckboxChange = (item: string) => {
        setInvolvedUsers((prev) =>
            prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
        );
        // remove individual amount if user is unchecked
        if (individualAmount[item]) {
            const newIndividualAmount = { ...individualAmount };
            delete newIndividualAmount[item];
            setIndividualAmount(newIndividualAmount);
        }
    };

    const handleSelectAll = () => {
        setInvolvedUsers(involvedUsers.length === users.length ? [] : users);
    };

    const handleSplit = () => {
        let numericAmount = parseFloat(amount);
        let totalindividualAmount = Object.values(individualAmount).reduce((a, b) => a + b, 0);
        if ((isNaN(numericAmount) && totalindividualAmount <= 0) || (numericAmount <= 0 && totalindividualAmount <= 0)) {
            // incorrect amount
            alert("Amount must be greater than zero you silly goose!");
            return;
        }
        if (involvedUsers.length === 0) {
            // no users selected
            alert("Please select at least one user");
            return;
        }
        // if payee is not in users then raise alert
        if (!users.includes(selectedPayee)) {
            alert("Payee not in users list");
            return;
        }

        // if individual amounts contain anything then their sum should match the total amount
        let targetUsers = [...involvedUsers]; // Create a shallow copy
        let unequalSplit: boolean = Object.keys(individualAmount).length > 0;
        if (unequalSplit) {
            if (!isNaN(numericAmount) && totalindividualAmount !== numericAmount) {
                alert("Amounts don't match!");
                return;
            }
            for (let [user, amount] of Object.entries(individualAmount)) {
                addTransaction(selectedPayee, amount, user);  // Pass the transaction up to the parent
            }
        }
        else {
            // if involved Users involves self then remove self and devide numeric amount by length + 1
            if (targetUsers.includes(selectedPayee)) {
                targetUsers.splice(targetUsers.indexOf(selectedPayee), 1);
                for (let user of targetUsers) {
                    addTransaction(selectedPayee, numericAmount / (targetUsers.length + 1), user);  // Pass the transaction up to the parent
                }
            }
            else {
                for (let user of targetUsers) {
                    addTransaction(selectedPayee, numericAmount / targetUsers.length, user);  // Pass the transaction up to the parent
                }
            }
        }
        setAmount("Paid Amount"); // Clear amount after successful transfer
        setInvolvedUsers([]); // Clear involved users after successful transfer
        setIndividualAmount({}); // Clear individual amounts after successful transfer
        setError(null); // Clear error when successful
    };

    return (
        <div className="p-3">

            <div className="bg-card container card p-4 mt-2 text-white">
                <div className="bg-cardHeader card-header">
                    <h5 className="card-title text-black text-center">Add Transaction</h5>
                </div>
                <div className="card-body d-flex"></div>
                <div className="row">
                    <div className="col">
                        <div className="text-black">
                            <select
                                value={selectedPayee}  // Bind to state
                                onChange={(e) => handleDropdownChange(e.target.value)}
                                className="w-40 p-2 rounded bg-inputFields border-0"
                            >
                                <option value="" disabled>Select Payee</option>  {/* Placeholder option */}
                                {users.map((user) => (
                                    <option key={user} value={user}>
                                        {user}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col">
                        <input
                            type="number"
                            className="form-control text-black border-0"
                            placeholder="Paid Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                        {error && <p style={{ color: "red" }}>{error}</p>}
                    </div>
                </div>
                <div className="card-body d-flex"></div>
                <label className="btn bg-button">
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
                            <div className="col text-black">
                                <input
                                    type="checkbox"
                                    checked={involvedUsers.includes(item)}
                                    onChange={() => handleCheckboxChange(item)}
                                    className="w-5 h-15"
                                />
                                <span className="w-32 gap-x-2">{item}</span>
                            </div>
                            <div className="col">
                                <input
                                    type="number"
                                    className="text-black rounded bg-inputFieldsWrapped border-0"
                                    placeholder="Amount"
                                    disabled={!involvedUsers.includes(item)}
                                    onChange={(e) => {
                                        const value = parseFloat(e.target.value); // Make sure the value is a number
                                        setIndividualAmount((prevState) => ({
                                            ...prevState,
                                            [item]: value, // Update the amount for this specific item
                                        }));
                                    }}
                                    value={individualAmount[item] || ""}
                                />
                            </div>
                            <div className="col">
                                <button
                                    className="btn bg-buttonDanger" // Changed color to indicate deletion
                                    onClick={() => handleDelete(item)} // Call the passed delete function
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                        <div style={{ marginBottom: "4px" }}></div>
                    </div>
                ))
                }
                <div className="card-body d-flex"></div>
                <div className="d-flex gap-2">
                    <button className="btn bg-button" onClick={handleSplit}>
                        Split
                    </button>
                </div>
            </div >
        </div >
    );
};

export default AddTransaction;
