import React, { createContext, useContext, useState } from 'react';
import TaskList from './Tasklist';

// Creating a context for the task list
const TaskListContext = createContext<{
  taskList: {
    title: string;
    tasks: string[];
    id: number;
  }[];
  setTaskList: React.Dispatch<React.SetStateAction<{
    title: string;
    tasks: string[];
    id: number;
  }[]>>;
} | undefined>(undefined);

const initialTaskList = [
  {
    title: 'Humber',
    tasks: ['Task 1', 'Task 2', 'Task 3'],
    id: 1,
  },
  {
    title: 'MERN',
    tasks: ['Lab', 'Project', 'Quiz'],
    id: 2,
  },
  {
    title: 'Java',
    tasks: ['Group Discussion', 'Exam', 'Assignment'],
    id: 3,
  },
];

const App: React.FC = () => {
  const [taskList, setTaskList] = useState(initialTaskList);

  return (
    // Providing the context value
    <TaskListContext.Provider value={{ taskList, setTaskList }}>
      <div>
        <TaskList />
      </div>
    </TaskListContext.Provider>
  );
};

// Creating a custom hook to access the context
const useTaskListContext = () => {
  const context = useContext(TaskListContext);
  if (!context) {
    throw new Error('useTaskListContext must be used within a TaskListProvider');
  }
  return context;
};

export { useTaskListContext, TaskListContext }; // Exporting for use in other components
export default App;
