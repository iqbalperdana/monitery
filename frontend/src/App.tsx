import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignInPage";
import SignUp from "./pages/SignUpPage";
import ProtectedRoute from "./ProtectedRoute";
import "./App.css";

import AdminLayout from "./pages/AdminLayout";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import InvoicesPage from "./pages/invoices/InvoicesPage";
import CreateInvoicePage from "./pages/invoices/CreateInvoicePage";
import ItemsPage from "./pages/items/ItemsPage";
import ClientsPage from "./pages/ClientsPage";
import CreateItemPage from "./pages/items/CreateItemPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="invoices" element={<InvoicesPage />} />
            <Route path="invoices/create" element={<CreateInvoicePage />} />
            <Route path="items" element={<ItemsPage />} />
            <Route path="items/create" element={<CreateItemPage />} />
            <Route path="clients" element={<ClientsPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
