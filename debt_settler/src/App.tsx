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
    <div className="bg-dark min-vh-100 flex-column justify-content-center align-items-center text-white py-5">
      <div>
        <h1 className="text-center text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 drop-shadow-lg">
          Debt Settler
        </h1>
        <AddUser users={users} setUsers={setUsers} addTransaction={addTransaction}></AddUser>
        <div className="py-3"></div>
        <h3 className="text-center text-white">Original Transactions</h3>
        <div className="py-3"></div>
        <Graph users={users} transactions={transactions} immediateRender={true}></Graph>
        <Settle transactions={transactions} users={users} onSettle={handleSettle}></Settle>
        <h3 className="text-center text-white">Simplified Transactions</h3>
        <Graph users={users} transactions={simplifiedTransactions} immediateRender={false}></Graph>
      </div>
    </div >
  )
}

export default App
