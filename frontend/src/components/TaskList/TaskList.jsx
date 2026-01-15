import React from 'react';
import AcceptTask from './AcceptTask';
import NewTask from './NewTask';
import CompleteTask from './CompleteTask';
import FailedTask from './FailedTask';

const TaskList = ({ data }) => {
  // Guard clause to avoid errors
  if (!data || !Array.isArray(data.tasks)) return null;

  return (
    <div
      id="tasklist"
      className="h-[55%] overflow-x-auto flex items-center justify-start w-full py-5 rounded mt-10 gap-5 flex-nowrap"
    >
      {data.tasks.map((task, index) => {
        if (task.newTask) return <NewTask key={index} task={task} />;
        if (task.active) return <AcceptTask key={index} task={task} />;
        if (task.completed) return <CompleteTask key={index} task={task} />;
        if (task.failed) return <FailedTask key={index} task={task} />;
        return null;
      })}
    </div>
  );
};

export default TaskList;
