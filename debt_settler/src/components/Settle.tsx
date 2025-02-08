import { runOptimization } from "../utils/optimizer";
import Transaction from "../Types";

interface SettleProps {
    transactions: Transaction[];
}

function Settle({ transactions }: SettleProps) {

    return (
        <div className="bg-dark d-flex flex-column justify-content-center align-items-center text-white py-5">
            <button
                className="btn btn-primary mb-3"
                onClick={() => runOptimization(transactions)} >
                Settle
            </button>

        </div>
    );
}

export default Settle;
