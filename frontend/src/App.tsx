import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignInPage";
import SignUp from "./pages/SignUpPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
