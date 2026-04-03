import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const TaskForm = ({ tasks, setTasks, editingTask, setEditingTask,onClose }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ projectname:'', company:'', contactmember:'', email:'', phone:'',description:'', startdate:'' , deadline:'', priority:'' });
  


  useEffect(() => {
    if (editingTask) {
      setFormData({
        projectname: editingTask.projectname,
        company: editingTask.company,
        contactmember: editingTask.contactmember,
        email: editingTask.email,
        phone: editingTask.phone,
        startdate: editingTask.startdate ? editingTask.startdate.substring(0, 10) : '',
        priority: editingTask.priority,
        
        description: editingTask.description  ,
        deadline: editingTask.deadline ? editingTask.deadline.substring(0, 10) : '',
      });
    } else {
      setFormData({ projectname:'', company:'', contactmember:'', email:'', phone:'',description:'', startdate:'' , deadline:'', priority:'' });
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTask) {
        const response = await axiosInstance.put(`/api/tasks/${editingTask._id}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTasks(tasks.map((task) => (task._id === response.data._id ? response.data : task)));
      } else {
        const response = await axiosInstance.post('/api/tasks', formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTasks([...tasks, response.data]);
      }
      setEditingTask(null);
      setFormData({ projectname:'', company:'', contactmember:'', email:'', phone:'',description:'', startdate:'' , deadline:'', priority:'' });
      onClose?.();
    } catch (error) {
      alert('Failed to save task.');
    }
  };
   //# 加入必填的標示,及錯誤視窗彈出(cus 也要做)
  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
      <h1 className="text-2xl font-bold mb-4">{editingTask ? 'Edit Task' : 'Add Task'}</h1>
      <label className="block text-sm font-medium mb-1">Project Name :</label>
      <input
        type="text"
        placeholder="projectname"
        value={formData.projectname}
        onChange={(e) => setFormData({ ...formData, projectname: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      required />
      <label className="block text-sm font-medium mb-1">Company :</label>
      <input
        type="text"
        placeholder="company"
        value={formData.company}
        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      required />
      <label className="block text-sm font-medium mb-1">Project owner :</label>
      <input
        type="text"
        placeholder="Project owner"
        value={formData.contactmember}
        onChange={(e) => setFormData({ ...formData, contactmember: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      required />
      <label className="block text-sm font-medium mb-1">Email :</label>
      
      
      <input
        type="email"
        placeholder="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      required />
      <label className="block text-sm font-medium mb-1">Phone :</label>
      <input
        type="text"
        placeholder="phone"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      


      {/* //#加入選項 */}
      <label className="block text-sm font-medium mb-1">Priority :</label>
      <select
        value={formData.priority}
        onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
        className="w-full mb-4 p-2 border rounded">
          <option value="">Select Priority</option>
          <option value="High">🔴 High</option>
          <option value="Medium">🟡 Medium</option>
          <option value="Low">🟢 Low</option>
        </select>
      


      <label className="block text-sm font-medium mb-1"> Description :</label>
      <input
        type="text"
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />

      <label className="block text-sm font-medium mb-1">Start Date :</label>
      <input
        type="date"
        placeholder="startdate"
        value={formData.startdate}
        onChange={(e) => setFormData({ ...formData, startdate: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      required/>   
      
      {/* # 加入due date 不可早於start date */}
      <label className="block text-sm font-medium mb-1"> Due Date :</label>
      <input
        type="date"
        value={formData.deadline}
        min={formData.startdate}
        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      required/>
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        {editingTask ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;
