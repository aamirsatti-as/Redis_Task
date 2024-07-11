// import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './auth/login';
import SignUp from './auth/signup';
import Dashboard from './pages/dashboard'
import Users from './pages/users';
import Charts from './pages/charts';
import { AuthProvider, AuthContext } from './authContext';
import React from 'react';
function App() {

  return (
    <AuthProvider>
      <Router>
        <AuthContext.Consumer>
          {({ isAuthenticated }: any) => (
            <Routes>
              {isAuthenticated ? (
                <>
                  <Route path="/dashboard/*" element={<Dashboard />}>
                    <Route path="users" element={<Users />} />
                    <Route path="charts" element={<Charts />} />
                    <Route path="*" element={<Navigate to="/dashboard/users" replace />} />
                  </Route>
                  <Route path="*" element={<Navigate to="/dashboard/users" replace />} />
                </>
              ) : (
                <>
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="*" element={<Navigate to="/login" replace />} />
                </>
              )}
            </Routes>
          )}
        </AuthContext.Consumer>
      </Router>
    </AuthProvider >
  );
}

export default App;
