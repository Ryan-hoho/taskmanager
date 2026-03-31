import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const GENDER_OPTIONS=[ 'Male', 'Female', 'Non-binary'];
// const OCCUPATION_OPIONS=['Manager','Coordinator','Senior Sales','Junior Sales'];

const Profile = () => {
  const { user } = useAuth(); // Access user token from context
  const [formData, setFormData] = useState({
    firstname: '',
    middlename: '',
    lastname: '',
    employeeID: '',
    email: '',
    occupation: '',
    gender: '',
    address: '',
    manager: '',
  });
  const [loading, setLoading] = useState(false);
  const [genderOpen, setGenderOpen ]=useState(false);

  // 從 user 取得 role，預設為 'employee'
  const role = user?.role || 'employee';
  const isEmployee = role === 'employee';
 
  // 員工帳號鎖定的欄位
  const lockedFields = isEmployee
    ? ['employeeID', 'occupation', 'gender', 'manager']
    : [];
 
  const isLocked = (field) => lockedFields.includes(field);

  useEffect(() => {
    // Fetch profile data from the backend
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/api/auth/profile', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setFormData({
          firstname: response.data.firstname,
          middlename: response.data.middlename,
          lastname: response.data.lastname,
          employeeID: response.data.employeeID,
          email: response.data.email || '',
          occupation: response.data.occupation || '',
          gender: response.data.gender || '',
          address: response.data.address || '',
          manager: response.data.manager || '',

        });
      } catch (error) {
        alert('Failed to fetch profile. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchProfile();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.put('/api/auth/profile', formData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-20">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded">
        <h1 className="text-2xl font-bold mb-4 text-center">Your Profile</h1>
        
        {/* 員工提示 */}
        {isEmployee && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-300 rounded text-sm text-yellow-800">
            🔒 Some fields are managed by admin and cannot be edited.
          </div>
        )}

        <input
          type="text"
          placeholder="FirstName"
          value={formData.firstname}
          onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="MiddletName"
          value={formData.middlename}
          onChange={(e) => setFormData({ ...formData, middlename: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="LastName"
          value={formData.lastname}
          onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
      

         {/* EmployeeID - 員工鎖定 */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="EmployeeID"
            value={formData.employeeID}
            onChange={(e) => setFormData({ ...formData, employeeID: e.target.value })}
            readOnly={isLocked('employeeID')}
            className={`w-full p-2 border rounded ${
              isLocked('employeeID') ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''
            }`}
          />
          {isLocked('employeeID') && (
            <span className="absolute right-2 top-2 text-gray-400 text-sm">🔒</span>
          )}
        </div>





        <input
          type="text"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />


        {/* Occupation - 員工鎖定 */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Occupation"
            value={formData.occupation}
            onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
            readOnly={isLocked('occupation')}
            className={`w-full p-2 border rounded ${
              isLocked('occupation') ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''
            }`}
          />
          {isLocked('occupation') && (
            <span className="absolute right-2 top-2 text-gray-400 text-sm">🔒</span>
          )}
        </div>

        {/* <input
          type="text"
          placeholder="Gender"
          value={formData.gender}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        /> */}
                {/* Gender - 下拉選單，員工鎖定 */}
        <div className="relative mb-4">
          {isLocked('gender') ? (
            // 員工：顯示唯讀
            <div className="relative">
              <input
                type="text"
                value={formData.gender}
                readOnly
                className="w-full p-2 border rounded bg-gray-100 text-gray-400 cursor-not-allowed"
                placeholder="Gender"
              />
              <span className="absolute right-2 top-2 text-gray-400 text-sm">🔒</span>
            </div>
          ) : (
            // 管理員：下拉選單
            <div className="relative">
              <button
                type="button"
                onClick={() => setGenderOpen(!genderOpen)}
                className="w-full p-2 border rounded text-left flex justify-between items-center bg-white"
              >
                <span className={formData.gender ? 'text-gray-800' : 'text-gray-400'}>
                  {formData.gender || 'Select Gender'}
                </span>
                <span className="text-gray-400 text-xs">{genderOpen ? '▲' : '▼'}</span>
              </button>
              {genderOpen && (
                <div className="absolute z-10 w-full bg-white border rounded shadow-lg mt-1">
                  {GENDER_OPTIONS.map((opt) => (
                    <div
                      key={opt}
                      onClick={() => {
                        setFormData({ ...formData, gender: opt });
                        setGenderOpen(false);
                      }}
                      className={`p-2 cursor-pointer hover:bg-blue-50 ${
                        formData.gender === opt ? 'bg-blue-100 font-semibold text-blue-700' : ''
                      }`}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>





        <input
          type="text"
          placeholder="Address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        {/* <input
          type="text"
          placeholder="Manager"
          value={formData.manager}
          onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        /> */}
        {/* Manager - 員工鎖定 */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Manager"
            value={formData.manager}
            onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
            readOnly={isLocked('manager')}
            className={`w-full p-2 border rounded ${
              isLocked('manager') ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''
            }`}
          />
          {isLocked('manager') && (
            <span className="absolute right-2 top-2 text-gray-400 text-sm">🔒</span>
          )}
        </div>






        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          {loading ? 'Updating...' : 'Update Profile'}
        </button>








      </form>
    </div>
  );
};

export default Profile;
