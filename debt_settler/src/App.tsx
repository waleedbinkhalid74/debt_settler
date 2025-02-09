import { useState } from "react";
import './App.css'
import AddUser from './components/AddUser'
import Settle from './components/Settle'
import Graph from './components/Graph'
import Transaction from './Types'

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [users, setUsers] = useState<string[]>([]);
  const [simplifiedTransactions, setSimplifiedTransactions] = useState<Transaction[]>([]);

  // Function to handle transaction updates from a User component
  const addTransaction = (userName: string, amount: number, otherUsers: string[]) => {
    setTransactions((prevTransactions) => [
      ...prevTransactions,
      [userName, amount, otherUsers],
    ]);
  }
  const handleSettle = (newTransactions: Transaction[]) => {
    setSimplifiedTransactions(newTransactions); // Update the state with the optimized transactions
  };

  return (
    <div className="bg-dark min-vh-100 flex flex-col items-center text-white py-5">
      <h1 className="text-center text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 drop-shadow-lg">
        Debt Settler
      </h1>
      <AddUser users={users} setUsers={setUsers} addTransaction={addTransaction} />

      <div className="flex justify-center py-5 w-full">
        <Settle transactions={transactions} users={users} onSettle={handleSettle} />
      </div>

      <div className="flex flex-row justify-center items-start gap-10 w-full px-5">
        <div className="w-1/2 min-w-[350px]">
          <h3 className="text-center text-white">Original Transactions</h3>
          <Graph users={users} transactions={transactions} immediateRender={true} />
        </div>

        <div className="w-1/2 min-w-[350px]">
          <h3 className="text-center text-white">Simplified Transactions</h3>
          <Graph users={users} transactions={simplifiedTransactions} immediateRender={false} />
        </div>
      </div>
    </div>


  )
}

export default App
