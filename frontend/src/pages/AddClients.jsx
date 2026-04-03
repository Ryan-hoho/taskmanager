import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import ClientForm from '../components/ClientForm';
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

  return (
    <div className="container mx-auto p-6">
      <ClientForm
        clients={clients}
        setClients={setClients}
        editingClient={editingClient}
        setEditingClient={setEditingClient}
      />
      
    </div>
  );
};

export default Clients;
