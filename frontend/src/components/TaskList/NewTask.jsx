import React from 'react'

const NewTask = ({task}) => {
  if (!task) return null;

  const { title, description, date, category, _id } = task;

  // Function to handle Accept or Decline
  const updateStatus = async (status) => {
    
    // Get the logged-in user's ID from local storage
    const userData = JSON.parse(localStorage.getItem('loggedInUser'));
    const employeeId = userData.data.id; 

    try {
        const res = await fetch('https://e-m-s-backend.onrender.com/api/v1/update-task', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                employeeId: employeeId, 
                taskId: _id, 
                status: status 
            })
        });

        const data = await res.json();
        
        if (data.success) {
            // Reload page to show the task moved to "Active"
            window.location.reload(); 
        } else {
            alert("Failed to update task");
        }

    } catch (error) {
        console.log(error);
    }
  }

  return (
     <div className='flex-shrink-0 h-full p-5 w-[300px] bg-blue-400 rounded'>
           <div className='flex justify-between items-center'>
            <h3 className='bg-red-600 px-3 text-sm py-1 rounded'>{category}</h3>
            <h4 className='text-sm'>{date}</h4>
           </div>
           <h2 className='mt-5 text-2xl font-semibold'>{title}</h2>
           <p className='text-sm mt-2'>{description}</p>
           
           <div className='flex justify-between mt-5 gap-2'>
            {/* Call the function with 'accepted' */}
            <button 
                onClick={() => updateStatus('accepted')}
                className='bg-green-500 text-white px-2 py-1 rounded w-full'
            >
                Accept Task
            </button>
            
            {/* Call the function with 'failed' (Decline) */}
            <button 
                onClick={() => updateStatus('failed')}
                className='bg-red-500 text-white px-2 py-1 rounded w-full'
            >
                Decline
            </button>
             </div>
        </div>
  )
}

export default NewTask
