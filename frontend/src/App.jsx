import React, { useContext, useEffect, useState } from 'react'
import Login from './components/Auth/Login'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import { AuthContext } from './context/AuthProvider'

const App = () => {

  const [user, setUser] = useState(null)
  const [loggedInUserData, setLoggedInUserData] = useState(null)
  const authData = useContext(AuthContext)

  // Check if user is already logged in (Persistent Login)
  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser')
    
    if(loggedInUser){
      const userData = JSON.parse(loggedInUser)
      setUser(userData.role)
      setLoggedInUserData(userData.data)
    }
  }, [])


  const handleLogin = async (email, password) => {
    try {
        const res = await fetch('http://localhost:5000/api/v1/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const result = await res.json();

        if (result.success) {
            const userData = result.data;

            // --- ADMIN LOGIN ---
            if (userData.role === 'admin') {
                setUser('admin');
                setLoggedInUserData(userData);
                localStorage.setItem('loggedInUser', JSON.stringify({ role: 'admin', data: userData }));
            } 
            // --- EMPLOYEE LOGIN ---
            else if (userData.role === 'employee') {
                
                // ⚠️ CRITICAL FIX: Calculate Task Counts here! ⚠️
                // The backend gives us tasks, but not the counts. We calculate them now:
                const tasks = userData.tasks || [];
                userData.taskCount = {
                    newTask: tasks.filter(t => t.newTask).length,
                    completed: tasks.filter(t => t.completed).length,
                    active: tasks.filter(t => t.active).length,
                    failed: tasks.filter(t => t.failed).length,
                };

                setUser('employee');
                setLoggedInUserData(userData);
                localStorage.setItem('loggedInUser', JSON.stringify({ role: 'employee', data: userData }));
            }
        } else {
            alert("Invalid Credentials");
        }
    } catch (error) {
        console.error("Login Error:", error);
        alert("Server Error. Is Backend running?");
    }
  }

  return (
    <>
      {!user ? <Login handleLogin={handleLogin} /> : ''}
      
      {user === 'admin' ? <AdminDashboard changeUser={setUser} user={loggedInUserData} /> : (user === 'employee' ? <EmployeeDashboard changeUser={setUser} data={loggedInUserData} /> : null) }
    </>
  )
}

export default App