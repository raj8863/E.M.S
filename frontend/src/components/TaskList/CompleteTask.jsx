import React from 'react'

const CompleteTask = ({task}) => {
  if(!task) return null;      // guard clause to avoid errors

  const {title, description, date, category}=task; // destructure props
  return (
    <div className=' flex-shrink-0 h-full p-5 w-[300px] bg-green-300 rounded'>
      <div className='flex justify-between items-center'>
        <h3 className='bg-red-600 px-3 text-sm py-1 rounded'>{category}</h3>
        <h4 className='text-sm'>{date}</h4>
      </div>
      <h2 className='mt-5 text-2xl font-semibold'>{title}</h2>
      <p className='text-sm mt-2'>{description}</p>
      <div className='flex justify-between mt-5 gap-2'>
        <button className='bg-blue-500 text-white px-3 py-2  rounded'>Mark as Completed</button>
        <button className='bg-red-500 text-white px-3 py-2 rounded'>Mark as Failed</button>

      </div>
    </div>
  )
}

export default CompleteTask
