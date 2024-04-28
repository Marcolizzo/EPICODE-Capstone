import React from 'react'
import NavPanel from '../components/sidebar/Sidebar'

const MainLayout = ({ children }) => {
    return (
        <>
            <NavPanel/>
            {children}
        </>
    )
}

export default MainLayout
