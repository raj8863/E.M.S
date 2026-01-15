import React, { use, useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider';

const AllTask = ({}) => {
    const authData = useContext(AuthContext);
    
    return (
        
        <div className='bg-[#1c1c1c] p-5 rounded mt-5 h-60 '>
            <div className=' bg-amber-200 flex justify-between items-center text-black mb-5'>
                <h2 className='text-lg font-medium w-1/5'>Employee Name</h2>
                <h3 className='text-lg font-medium w-1/5'>New Task</h3>
                <h5 className='text-lg font-medium w-1/5'>Active Task</h5>
                <h5 className='text-lg font-medium w-1/5'>Completed</h5>
                <h5 className='text-lg font-medium w-1/5'>Failed</h5>
            </div>
           <div className=' overflow-auto  '> 

            {authData.employees.map(function(employee, index){
                return   <div  key={index} className='bg-emerald-300 mb-2 rounded py-2 px-4  flex justify-between'>
                <h2 className='w-1/5  text-lg font-medium bg-blue-300'> {employee.name} </h2>
                <h3 className='w-1/5  text-lg font-medium bg-green-500'> {employee.taskCount.newTask} </h3>
                <h5 className='w-1/5  text-lg font-medium bg-yellow-300'>{employee.taskCount.active}</h5>
                <h5 className='w-1/5  text-lg font-medium bg-orange-300'>{employee.taskCount.completed}</h5>
                <h5 className='w-1/5  text-lg font-medium bg-red-300'>{employee.taskCount.failed}</h5>
            </div>})}
           </div>
           
           
        </div>
    )
}

export default AllTask
