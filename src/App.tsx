import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login'
import Home from './pages/Home';
import "./index.css"



function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
     
    </Routes>
  );
}
export default App