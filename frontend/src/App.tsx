import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignInPage";
import SignUp from "./pages/SignUpPage";
import Dashboard from "./pages/DashboardPage";
import ProtectedRoute from "./ProtectedRoute";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
