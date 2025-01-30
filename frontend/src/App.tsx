import { Route, Routes } from "react-router-dom";
import "./App.css";
import SignupForm from "./Pages/Signup";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Routes>
        {/* <Header /> */}
        <Route path="/" element={<SignupForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
