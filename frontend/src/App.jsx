import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import './App.css'
import Election from "./pages/Election";

function App() {

  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/election/:id" element={<Election />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </div>
  )
}

export default App
