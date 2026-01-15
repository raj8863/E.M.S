import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const CreateTask = () => {
  const { employees, setEmployees } = useContext(AuthContext);

  const [taskTitle, setTaskTitle] = useState("");
  const [date, setDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    const payload = {
      taskTitle,
      date,
      assignedTo,
      category,
      description
    };

    try {
        const res = await fetch('http://localhost:5000/api/v1/create-task', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        const data = await res.json();
        
        if(data.success){
            alert("Task Assigned Successfully");
            
            // Clear the form fields
            setTaskTitle("");
            setDate("");
            setAssignedTo("");
            setCategory("");
            setDescription("");

            // ⬇️ THIS IS THE FIX: Uncomment this line to reload the page
            window.location.reload(); 
            
        } else {
            alert("Failed: " + data.message);
        }

    } catch (error) {
        console.log(error);
        alert("Something went wrong");
    }
  };

  return (
    <div className="mt-10">
      <form
        className="flex w-full items-start p-6 rounded-lg gap-6"
        onSubmit={submitHandler}
      >
        {/* Left side */}
        <div className="w-1/2 space-y-4">
          <div>
            <h3 className="font-semibold">Task Title</h3>
            <input
              type="text"
              placeholder="Make a UI design"
              className="w-full border border-gray-400 rounded-md px-3 py-2 mt-2"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <h3 className="font-semibold">Date</h3>
            <input
              type="date"
              className="w-full border border-gray-400 rounded-md px-3 py-2 mt-2"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div>
            <h3 className="font-semibold">Assign to</h3>
            <input
              type="text"
              placeholder="employee name"
              className="w-full border border-gray-400 rounded-md px-3 py-2 mt-2"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              required
            />
          </div>
          <div>
            <h3 className="font-semibold">Category</h3>
            <input
              type="text"
              placeholder="design, dev, etc"
              className="w-full border border-gray-400 rounded-md px-3 py-2 mt-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
        </div>

        {/* Right side */}
        <div className="w-1/2 space-y-4">
          <h3 className="font-semibold">Description</h3>
          <textarea
            cols="30"
            rows="10"
            className="w-full border border-gray-400 rounded-md px-3 py-2 mt-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 mt-4"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;