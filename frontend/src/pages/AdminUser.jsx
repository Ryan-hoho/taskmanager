import { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';

const AdminUser = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
  try {
    const res = await axiosInstance.get('/api/users/all');
    console.log('users response:', res.data);
    setUsers(res.data);
  } catch (error) {
    console.error('fetch users error:', error);
    console.log('status:', error.response?.status);
    console.log('data:', error.response?.data);
    alert(error.response?.data?.message || 'Failed to fetch users');
  }
};

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await axiosInstance.put(`/api/users/${userId}/role`, {
        role: newRole,
      });
      fetchUsers();
    } catch (error) {
      console.error(error);
      alert('Failed to update role');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin - User Management</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">EmployeeID</th>
            <th className="p-2 border">Role</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="p-2 border">{user.firstname}</td>
              <td className="p-2 border">{user.employeeID}</td>
              <td className="p-2 border">
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  className="border p-1 rounded"
                >
                  <option value="employee">Employee</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUser;