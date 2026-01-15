import React from 'react'

const FailedTask = ({task}) => {
  if (!task) return null;

  const { title, description, date, category } = task;

  return (
    <div className=' flex-shrink-0 h-full p-5 w-[300px] bg-red-300 rounded'>
      <div className='flex justify-between items-center'>
        <h3 className='bg-red-600 px-3 text-sm py-1 rounded'>{category}</h3>
        <h4 className='text-sm'>{date}</h4>
      </div>
      <h2 className='mt-5 text-2xl font-semibold'>{title}</h2>
      <p className='text-sm mt-2'>{description} </p>
      <div className=' mt-5'>
        <button className='bg-blue-500 w-full text-white px-5 py-3 rounded'>Failed</button>
      </div>
    </div>
  )
}

export default FailedTask
