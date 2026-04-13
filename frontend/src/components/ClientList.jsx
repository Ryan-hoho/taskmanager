import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';


const STATUS_COLORS = {
    Active:   'bg-green-100 text-green-700 border border-green-300',
  Inactive: 'bg-gray-800 text-white border border-gray-700',
};

const formatClientId = (index) => `C-${String(index + 1).padStart(3, '0')}`;

const ClientList = ({ clients, setClients, setEditingClient }) => {
  const { user } = useAuth();
 

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
    
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full bg-white text-sm">

        {/*  新增：藍紫色表頭 */}
        <thead>
          <tr className="bg-indigo-200 text-gray-700 text-center">
            <th className="px-4 py-3 font-medium">Client ID</th>
            <th className="px-4 py-3 font-medium">Contact Name</th>
            <th className="px-4 py-3 font-medium">Company</th>
            <th className="px-4 py-3 font-medium">Occupation</th>
            <th className="px-4 py-3 font-medium">Email</th>
            <th className="px-6 py-3 font-medium">Actions</th>
            <th className="px-4 py-3 font-medium">Status</th>
          </tr>
        </thead>

        {/* 修改：原本 div.map 改成 tbody > tr */}
        <tbody>
          {clients.map((client, index) => (
            <tr
              key={client._id}
              className="border-b border-gray-100 text-center hover:bg-gray-50"
            >
              {/* 新增：Client ID 欄 */}
              <td className="px-4 py-3 text-gray-500">
                {formatClientId(index)}
              </td>

              {/* 修改：原本 <h2> 改成 <td> */}
              <td className="px-4 py-3 font-medium text-gray-800">
                {client.firstname} {client.middlename} {client.lastname}
              </td>

              {/* 修改：原本在 Details div 裡，現在各自獨立成 <td> */}
              <td className="px-4 py-3 text-gray-600">{client.company || '—'}</td>
              <td className="px-4 py-3 text-gray-600">{client.occupation || '—'}</td>
              <td className="px-4 py-3 text-gray-600">{client.email || '—'}</td>

              {/* 修改：原本 Edit + Delete 分開，現在改成 Update + Delete 並排圓角按鈕 */}
              <td className="px-4 py-3">
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => setEditingClient(client)}
                    className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-1.5 rounded-full text-xs font-semibold transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(client._id)}
                    className="bg-red-400 hover:bg-red-500 text-white px-4 py-1.5 rounded-full text-xs font-semibold transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </td>

              {/* 修改：原本獨立 <span>，現在放進 <td> 並置中 */}
              <td className="px-4 py-3">
                <span className={`px-4 py-1.5 rounded-full text-xs font-semibold ${STATUS_COLORS[client.clientStatus] || 'bg-gray-100 text-gray-600'}`}>
                  {client.clientStatus}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientList;
