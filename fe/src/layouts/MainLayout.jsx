import React from 'react'
import NavigationBar from '../components/navigationBar/NavigationBar'

const MainLayout = ({ children }) => {
    return (
        <>
            <NavigationBar />
            {children}
        </>
    )
}

export default MainLayout
