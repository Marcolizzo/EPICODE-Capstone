import React from 'react'
import MainLayout from '../layouts/MainLayout'
import HomePage from '../components/homePage/HomePage'
import { jwtDecode } from "jwt-decode";

const Home = () => {
    const session = JSON.parse(localStorage.getItem('auth'))
    const decodedSession = jwtDecode(session)

    return (
        <MainLayout>
            <HomePage />
        </MainLayout>
    )
}

export default Home
