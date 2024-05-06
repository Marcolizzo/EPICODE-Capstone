import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

const useAuth = () => {
    // return JSON.parse(localStorage.getItem('auth'));
    const token = JSON.parse(localStorage.getItem('auth'))
    const currentTime = Date.now() / 1000

    if (!token) {
        return false
    }

    const decodedToken = jwtDecode(token)
    return decodedToken.exp > currentTime
}

const ProtectedRoutes = () => {
    const isAuth = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuth) {
            navigate('/login')
        }
    }, [isAuth, navigate])

    return isAuth ? <Outlet /> : null
}

export default ProtectedRoutes
