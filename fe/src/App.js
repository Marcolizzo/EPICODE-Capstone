import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProtectedRoutes from '../src/middlewares/ProtectedRoute'
import './App.scss'
import Login from './pages/Login'
import Home from './pages/Home'
import Project from './pages/Project'

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<ProtectedRoutes />}>
                    <Route path="/projects/:projectId" element={<Project />} />
                    <Route path="/home" element={<Home />} />
                </Route>
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    )
}

export default App
