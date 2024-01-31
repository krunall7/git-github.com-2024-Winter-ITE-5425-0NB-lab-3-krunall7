import React, { useState } from 'react';
import { useTaskListContext } from './App';

type Task = {
  title: string;
  tasks: string[];
  id: number;
};

type TaskListProps = {
  taskList: Task[];
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
};

const TaskList: React.FC = () => {
  const { taskList, setTaskList } = useTaskListContext();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(-1);
  const [subTaskInputs, setSubTaskInputs] = useState<string[]>(Array(taskList.length).fill(''));
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddTask = () => {
    if (newTaskTitle) {
      const newTask = {
        title: newTaskTitle,
        tasks: [],
        id: taskList.length + 1,
      };
      setTaskList([...taskList, newTask]);
      setNewTaskTitle('');
      setSubTaskInputs([...subTaskInputs, '']);
    }
  };

  const handleAddSubTask = (index: number) => {
    if (subTaskInputs[index] && index !== -1) {
      const updatedTaskList = taskList.map((task, i) => {
        if (i === index) {
          return {
            ...task,
            tasks: [...task.tasks, subTaskInputs[index]],
          };
        }
        return task;
      });
      setTaskList(updatedTaskList);
      const newSubTaskInputs = [...subTaskInputs];
      newSubTaskInputs[index] = '';
      setSubTaskInputs(newSubTaskInputs);
      setSelectedTaskIndex(-1); // Reset selectedTaskIndex after adding subtask
    }
  };

  const handleSubTaskInputChange = (index: number, value: string) => {
    const newSubTaskInputs = [...subTaskInputs];
    newSubTaskInputs[index] = value;
    setSubTaskInputs(newSubTaskInputs);
  };

  const handleDeleteTaskList = (index: number) => {
    const updatedTaskList = taskList.filter((task, i) => i !== index);
    setTaskList(updatedTaskList);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <h2>Task List</h2>
      <div>
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Enter new task title"
        />
        <button onClick={handleAddTask}>Add Title</button>
      </div>
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search tasks"
        />
      </div>
      {taskList
        .filter((task) =>
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.tasks.some((subTask) => subTask.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        .map((taskGroup, index) => (
          <div key={taskGroup.id}>
            <h3>{taskGroup.title}</h3>
            <button onClick={() => handleDeleteTaskList(index)}>Delete Task List</button>
            <ul>
              {taskGroup.tasks.map((task, subIndex) => (
                <li key={subIndex}>{task}</li>
              ))}
            </ul>
            <div>
              <input
                type="text"
                value={subTaskInputs[index]}
                onChange={(e) => handleSubTaskInputChange(index, e.target.value)}
                placeholder="Enter sub task"
              />
              {selectedTaskIndex === index && (
                <button onClick={() => handleAddSubTask(index)}>Confirm</button>
              )}
              <button onClick={() => setSelectedTaskIndex(index)}>Add New Sub Task</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default TaskList;