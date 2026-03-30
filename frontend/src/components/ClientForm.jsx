import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const STATUS_OPTIONS = ['Active', 'Inactive' ];


const ClientForm = ({ clients, setClients, editingClient, setEditingClient }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ 
    firstname: '', middlename: '', lastname: '', company: '', occupation: '', email: '', phone: '', clientStatus: 'Active'});
  const [statusOpen, setStatusOpen] = useState(false);


  useEffect(() => {
    if (editingClient) {
      setFormData({
        firstname:    editingClient.firstname    || '',
        middlename:   editingClient.middlename   || '',
        lastname:     editingClient.lastname     || '',
        company:      editingClient.company      || '',
        occupation:   editingClient.occupation   || '',
        email:        editingClient.email        || '',
        phone:        editingClient.phone        || '',
        clientStatus: editingClient.clientStatus || 'Active',


      });
    } else {
      setFormData({ firstname: '', middlename: '', lastname: '', company: '', occupation: '', email: '', phone: '', clientStatus: 'Active' });
    }
  }, [editingClient]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingClient) {
        const response = await axiosInstance.put(`/api/clients/${editingClient._id}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setClients(clients.map((client) => (client._id === response.data._id ? response.data : client)));
      } else {
        const response = await axiosInstance.post('/api/clients', formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setClients([...clients, response.data]);
      }
      setEditingClient(null);
      setFormData({ firstname: '', middlename: '', lastname: '', company: '', occupation: '', email: '', phone: '', clientStatus: 'Active' });
    } catch (error) {
      alert('Failed to save client.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
      <h1 className="text-2xl font-bold mb-4">{editingClient ? 'Edit Client' : 'Add Client'}</h1>
      
      <label className="block text-sm font-medium mb-1">First Name :</label>
      <input
        type="text"
        placeholder="Firstname"
        value={formData.firstname}
        onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      
      <label className="block text-sm font-medium mb-1">Middle Name :</label>
      <input
        type="text"
        placeholder="Middlename"
        value={formData.middlename}
        onChange={(e) => setFormData({ ...formData, middlename: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      
      <label className="block text-sm font-medium mb-1">Last Name :</label>
      <input
        type="text"
        placeholder="Lastname"
        value={formData.lastname}
        onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      
      <label className="block text-sm font-medium mb-1">Company :</label>
      <input
        type="text"
        placeholder="Company"
        value={formData.company}
        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      
      <label className="block text-sm font-medium mb-1">Occupation :</label>
      <input
        type="text"
        placeholder="Occupation"
        value={formData.occupation}
        onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />

      <label className="block text-sm font-medium mb-1">Email :</label>
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />


      <label className="block text-sm font-medium mb-1">Phone :</label>
      <input
        type="tel"
        placeholder="Phone"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />

      <div className="relative mb-4">
        <label className="block text-sm font-medium mb-1">Client Status :</label>
        <button
          type="button"
          onClick={() => setStatusOpen(!statusOpen)}
          className="w-full p-2 border rounded text-left flex justify-between items-center bg-white"
          >
          <span className={formData.clientStatus ? 'text-gray-800' : 'text-gray-400'}>
            {formData.clientStatus || 'Select Status'}
          </span>
          <span className="text-gray-400 text-xs">{statusOpen ? '▲' : '▼'}</span>
        </button>
        {statusOpen && (
          <div className="absolute z-10 w-full bg-white border rounded shadow-lg mt-1">
            {STATUS_OPTIONS.map((opt) => (
              <div
                key={opt}
                onClick={() => { setFormData({ ...formData, clientStatus: opt }); setStatusOpen(false); }}
                className={`p-2 cursor-pointer hover:bg-blue-50 ${
                  formData.clientStatus === opt ? 'bg-blue-100 font-semibold text-blue-700' : ''
                }`}
                >
                  {opt}
                </div>
              ))}
            </div>
          )}
      </div>





      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        {editingClient ? 'Update Client' : 'Add Client'}
      </button>
    </form>
  );
};

export default ClientForm;
