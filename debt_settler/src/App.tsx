import { useState } from "react";
import './App.css'
import AddUser from './components/AddUser'
import Settle from './components/Settle'
import Graph from './components/Graph'
import Transaction from './Types'
import AddTransaction from "./components/AddTransaction";

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [users, setUsers] = useState<string[]>([]);
  const [simplifiedTransactions, setSimplifiedTransactions] = useState<Transaction[]>([]);

  // Function to handle transaction updates from a User component
  const addTransaction = (userName: string, amount: number, otherUsers: string) => {
    setTransactions((prevTransactions) => [
      ...prevTransactions,
      [userName, amount, otherUsers],
    ]);
  };
  const handleSettle = (newTransactions: Transaction[]) => {
    setSimplifiedTransactions(newTransactions); // Update the state with the optimized transactions
  };


  const handleDelete = (userName: string) => {
    if (transactions.some(transaction => transaction[0] === userName || transaction[2] === userName)) {
      alert("User has transactions!");
      return;
    }
    setUsers(users.filter(user => user !== userName));  // Remove user by name
  };

  return (
    <div className="min-vh-100 flex flex-col items-center text-white py-5 bg-base">
      <h1 className="text-center text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 drop-shadow-lg text-base">
        Debt Settler
      </h1>
      <p className="text-center text-lg">Designed by Khadija Rehman and developed By WBK</p>
      <AddUser users={users} setUsers={setUsers} />
      <AddTransaction users={users} handleDelete={handleDelete} addTransaction={addTransaction} />

      <div className="flex justify-center w-full bg-base">
        <Settle transactions={transactions} users={users} onSettle={handleSettle} />
      </div>

      <div className="flex flex-row justify-center items-start gap-10 w-full px-5">
        <div className="w-1/2 min-w-[350px]">
          <h3 className="text-center text-white text-base">Original Transactions</h3>
          <Graph users={users} transactions={transactions} immediateRender={true} />
        </div>

        <div className="w-1/2 min-w-[350px]">
          <h3 className="text-center text-white text-base">Simplified Transactions</h3>
          <Graph users={users} transactions={simplifiedTransactions} immediateRender={false} />
        </div>
      </div>
    </div >


  )
}

export default App
