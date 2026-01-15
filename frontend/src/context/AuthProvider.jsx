import React, { createContext, useEffect, useState } from "react";
// Remove localStorage import
// import { getLocalStorage, setLocalStorage } from "../utils/localStorage"; 

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({ employees: [], admin: [] });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        // Fetch employees from your new Backend
        const response = await fetch('https://e-m-s-backend.onrender.com/api/v1/employees');
        const data = await response.json();
        
        if(data.success) {
            const employees = data.data;
            
            // Re-calculate task counts (Logic preserved from your original code)
            employees.forEach(emp => {
                const total = emp.tasks.length;
                const active = emp.tasks.filter(t => t.active).length;
                const completed = emp.tasks.filter(t => t.completed).length;
                const newTask = emp.tasks.filter(t => t.newTask).length;
                const failed = emp.tasks.filter(t => t.failed).length;

                emp.taskCount = { total, active, completed, newTask, failed };
            });

            setUserData(prev => ({ ...prev, employees: employees }));
        }
      } catch (error) {
        console.error("Failed to fetch employees", error);
      }
    };

    fetchEmployees();
  }, []); // Runs once on mount

  return (
    <AuthContext.Provider value={userData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
