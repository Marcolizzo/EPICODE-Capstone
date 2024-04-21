import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "../src/middlewares/ProtectedRoute";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
