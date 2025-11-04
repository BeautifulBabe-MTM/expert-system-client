import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddSoftwareForm from "./components/AddSoftwareForm";
import Navbar from "./components/Navbar";
import ManageSoftware from "./pages/ManageSoftware";
import EditSoftware from "./pages/EditSoftware";
import SoftwareCatalog from "./pages/SoftwareCatalog";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add" element={<AddSoftwareForm />} />
        <Route path="/manage" element={<ManageSoftware />} />
        <Route path="/edit/:id" element={<EditSoftware />} />
        <Route path="/catalog" element={<SoftwareCatalog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
