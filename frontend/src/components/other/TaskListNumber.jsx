import React from 'react'

const TaskListNumber = ({ data }) => {

  // 🛡️ GUARD CLAUSE: Prevent Crash if data is not ready
  if (!data || !data.taskCount) {
     return null; 
  }

  return (
    <div className='flex justify-between gap-5 mt-10' >
      <div className='p-10 w-[47%] bg-green-300 rounded'>
        <h2 className='text-3xl font-semibold'>{data.taskCount.newTask}</h2>
        <h3 className='text-xl font-medium'>New Task</h3>
      </div>

      <div className='p-10 w-[47%] bg-red-300 rounded'>
        <h2 className='text-3xl font-semibold'>{data.taskCount.completed}</h2>
        <h3 className='text-xl font-medium'>Completed Task</h3>
      </div>
      
      <div className='p-10 w-[47%] bg-yellow-300 rounded'>
        <h2 className='text-3xl font-semibold'>{data.taskCount.active}</h2>
        <h3 className='text-xl font-medium'>Active Task</h3>
      </div>
      
      <div className='p-10 w-[47%] bg-blue-300 rounded'>
        <h2 className='text-3xl font-semibold'>{data.taskCount.failed}</h2>
        <h3 className='text-xl font-medium'>Failed Task</h3>
      </div>
    </div>
  )
}

export default TaskListNumber