import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import './App.css'
import Election from "./pages/Election";
import Layout from './pages/Layout'
import CreateElection from "./pages/CreateElection";
import Elections from "./pages/Elections";
import Results from "./pages/Results";

function App() {

  return (
    <div className="App">
      <Layout />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/elections" element={<Elections />} />
          <Route path="/election/:id" element={<Election />} />
          <Route path="/create" element={<CreateElection />} />
          <Route path="/results" element={<Results />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </div>
  )
}

export default App
