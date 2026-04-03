import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { useAuth } from '../context/AuthContext';

const Tasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosInstance.get('/api/tasks', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTasks(response.data);
      } catch (error) {
        alert('Failed to fetch tasks.');
      }
    };

    fetchTasks();
  }, [user]);
  const handleClose = () => setEditingTask(null);

  return (
    <div className="container mx-auto p-6">
      <TaskList tasks={tasks} setTasks={setTasks} setEditingTask={setEditingTask} />
      
      
      
      
      {editingTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold">Edit Task</h2>
              <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 text-2xl font-bold">X</button>
            </div>
            <div className="p-4">
              <TaskForm
                tasks={tasks}
                setTasks={setTasks}
                editingTask={editingTask}
                setEditingTask={setEditingTask}
              />
              
            </div>
          </div>
        </div>
      )}
      

      
    </div>
  );
};

export default Tasks;
