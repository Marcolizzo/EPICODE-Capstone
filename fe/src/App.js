import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "../src/middlewares/ProtectedRoute";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Success from "./pages/Success";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/success" element={<Success />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
