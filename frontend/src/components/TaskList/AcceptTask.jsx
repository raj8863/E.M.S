import React from "react";

const AcceptTask = ({ task }) => {
  if (!task) return null; 

  const { title, description, date, category, _id } = task; 

  // Function to handle Complete or Fail
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
            // Reload page to move task to "Completed" or "Failed" section
            window.location.reload(); 
        } else {
            alert("Failed to update task");
        }

    } catch (error) {
        console.log(error);
    }
  }

  return (
    <div className="flex-shrink-0 h-full p-5 w-[300px] bg-yellow-300 rounded">
      <div className="flex justify-between items-center">
        <h3 className="bg-red-600 px-3 text-sm py-1 rounded">{category}</h3>
        <h4 className="text-sm">{date}</h4>
      </div>

      <h2 className="mt-5 text-2xl font-semibold">{title}</h2>
      <p className="text-sm mt-2">{description}</p>

      <div className="flex justify-between mt-5 gap-2">
        {/* Mark as Completed */}
        <button 
            onClick={() => updateStatus('completed')}
            className="bg-green-500 text-white px-2 py-1 w-full rounded"
        >
          Mark as Completed
        </button>

        {/* Mark as Failed */}
        <button 
            onClick={() => updateStatus('failed')}
            className="bg-red-500 text-white px-2 py-1 w-full rounded"
        >
          Mark as Failed
        </button>
      </div>
    </div>
  );
};

export default AcceptTask;
