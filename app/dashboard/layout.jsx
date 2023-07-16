import ProtectedRoute from '@components/ProtectedRoute';
import React from 'react';
import Navbar from '@components/Navbar';

const layout = ({children}) => {
  return (
        <ProtectedRoute>
            <Navbar/>
            {children}
        </ProtectedRoute>
  )
}

export default layout