import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

const STATUS_COLORS = {
  Active:   'bg-green-100 text-green-700',
  Inactive: 'bg-gray-100 text-gray-600',
};


const ClientList = ({ clients, setClients, setEditingClient }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleDelete = async (clientId) => {
    try {
      await axiosInstance.delete(`/api/clients/${clientId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setClients(clients.filter((client) => client._id !== clientId));
    } catch (error) {
      alert('Failed to delete client.');
    }
  };

  return (
    <div>
      {clients.map((client) => (
        <div key={client._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
          <h2 className="font-bold">{client.firstname} {client.middlename} {client.lastname}</h2>
          <span className={`text-xs px-2 py-1 rounded-full font-semibold ${STATUS_COLORS[client.clientStatus] || 'bg-gray-100 text-gray-600'}`}>
                {client.clientStatus}
          </span>
 
          {/* Details */}
          <div className="text-sm text-gray-600 space-y-0.5">
              {client.company    && <p>🏢 {client.company}</p>}
              {client.occupation && <p>💼 {client.occupation}</p>}
              {client.email      && <p>✉️ {client.email}</p>}
              {client.phone      && <p>📞 {client.phone}</p>}
          </div>


          
          <div className="mt-2">
            <button
              onClick={() =>  setEditingClient(client)}
              className="mr-2 bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(client._id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClientList;
