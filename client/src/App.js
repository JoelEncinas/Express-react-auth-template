import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Protected from "./components/Protected";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} exact path="/" />
        <Route element={<Register />} exact path="/register" />
        <Route element={<Login />} exact path="/login" />
        <Route element={<Protected />} exact path="/protected" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
