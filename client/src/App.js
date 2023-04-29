import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register } from "./components/register";
import { Login } from "./components/login";
import { Protected } from "./components/protected";

function App() {
  <BrowserRouter>
    <Routes>
      <Route element={<Register />} exact path="/register" />
      <Route element={<Login />} exact path="/login" />
      <Route element={<Protected />} exact path="/protected" />
    </Routes>
  </BrowserRouter>;
}

export default App;
