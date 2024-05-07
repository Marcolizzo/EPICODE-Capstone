import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProtectedRoutes from '../src/middlewares/ProtectedRoute'
import './App.scss'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from './pages/Login'
import Home from './pages/Home'
import Project from './pages/Project'

function App() {
    return (
        <Router>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />

            <Routes>
                <Route path="/" element={<ProtectedRoutes />}>
                    <Route path="" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/projects/:projectId" element={<Project />} />
                </Route>
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    )
}

export default App
