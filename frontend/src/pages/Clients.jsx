import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import ClientForm from '../components/ClientForm';
import ClientList from '../components/ClientList';
import { useAuth } from '../context/AuthContext';


const Clients = () => {
  const { user } = useAuth();
  const [clients, setClients] = useState([]);
  const [editingClient, setEditingClient] = useState(null);
 

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axiosInstance.get('/api/clients', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setClients(response.data);
      } catch (error) {
        alert('Failed to fetch clients.');
      }
    };

    fetchClients();
  }, [user]);

  const handleClose = () => setEditingClient(null);

  return (
    
    <div className="container mx-auto p-6">
      <h1>My Clients</h1>
      <ClientList clients={clients} setClients={setClients} setEditingClient={setEditingClient} />
      {editingClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold">Edit Clients</h2>
              <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 text-2xl font-bold">X</button>
            </div>
            <div className="p-4">
              
              <ClientForm
                clients={clients}
                setClients={setClients}
                editingClient={editingClient}
                setEditingClient={setEditingClient}
                onClose={handleClose} 
              />
            </div>
          </div>
        </div>
      )}
      
    
      
    </div>
  );
};

export default Clients;
