import { runOptimization } from "../utils/optimizer";
import Transaction from "../Types";

interface SettleProps {
    transactions: Transaction[];
    users: string[];
    onSettle: (newTransactions: Transaction[]) => void; // Function to pass data back to parent
}

function Settle({ transactions, users, onSettle }: SettleProps) {
    const handleSettle = async () => {
        const simplifiedTransactions = await runOptimization(transactions, users); // Get the result from the optimization function
        onSettle(simplifiedTransactions); // Pass the result to the parent component via onSettle
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center text-black py-5">
            <button
                className="btn bg-button"
                onClick={handleSettle}
            >
                Simplify
            </button>

        </div>
    );
}

export default Settle;
