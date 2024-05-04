import React from 'react'
import NavPanel from '../components/navPanel/NavPanel'

const MainLayout = ({ children }) => {
    return (
        <div className="d-flex">
            <NavPanel />
            {children}
        </div>
    )
}

export default MainLayout
