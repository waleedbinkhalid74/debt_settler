import './App.css'
import User from './components/AddUser'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="bg-dark min-vh-100 flex-column justify-content-center align-items-center text-white py-5">
      <div>
        <h1 className="text-center text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 drop-shadow-lg">
          Debt Settler
        </h1>
        <User></User>

      </div>
    </div>
  )
}

export default App
