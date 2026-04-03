import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const Register = () => {
  const [formData, setFormData] = useState({ firstname: '', employeeID: '', password: '', role:'employee',});
  
  const[roleOpen, setRoleOpen]=useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/api/auth/register', formData);
      alert('Registration successful. Please log in.');
      navigate('/login');
    } catch (error) {
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#eef2f7] flex items-center justify-center p-6">
      <div className="w-full max-w-[1400px] min-h-[850px] bg-white rounded-[32px] overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-2">
                
          {/* Left side */}
            <div className="bg-[#dfe5f7] p-12 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-6">
                      <div className="w-40 h-40 rounded-full bg-[#cfd8fb] flex items-center justify-center">
                        <div className="text-5xl font-bold text-blue-900">A</div>
                      </div>
        
                      <div>
                        <h1 className="text-5xl font-bold text-slate-800">
                          Welcome to ABC company
                        </h1>
                        <p className="mt-3 text-2xl text-slate-600">Internal V1.0</p>
                      </div>
                    </div>
        
                    <div className="mt-12 text-center">
                      <p className="text-4xl font-bold leading-tight text-slate-900">
                        Track Opportunities.
                        <br />
                        Empowering Teams.
                        <br />
                        Managing Relationships Smarter.
                      </p>
                    </div>
                  </div>
                  <div className="h-52 flex items-center justify-center">
                      <img 
                        src="/images/undraw_all-the-data_ijgn.svg"
                        alt="data illustration"
                        className="h-full object-contain"
                      />
                    </div>
        
                 
            </div>
        
          {/* Right side */}
            <div className="bg-[#f9fafc] px-16 py-20 flex flex-col justify-center">
                    <div className="max-w-md mx-auto mt-20">
                      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded">
                        <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
                        <input
                          type="text"
                          placeholder="FirstName"
                          value={formData.firstname}
                          onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                          className="w-full mb-4 p-2 border rounded"
                        />
                        <input
                          type="text"
                          placeholder="EmployeeID"
                          value={formData.employeeID}
                          onChange={(e) => setFormData({ ...formData, employeeID: e.target.value })}
                          className="w-full mb-4 p-2 border rounded"
                        />
                        <input
                          type="email"
                          placeholder="Email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full mb-4 p-2 border rounded"
                        />
                        <input
                          type="password"
                          placeholder="Password"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          className="w-full mb-4 p-2 border rounded"
                        />
                        {/* Role 下拉選單 */}
                        <div className="relative mb-4">
                          <button
                            type="button"
                            onClick={() => setRoleOpen(!roleOpen)}
                            className="w-full p-2 border rounded text-left flex justify-between items-center bg-white"
                          >
                            {/* ✅ 修正：條件寫反 + 移除空格 */}
                            <span className="text-gray-800">
                              {formData.role === 'employee' ? '👤 Employee' : '👑 Manager'}
                            </span>
                            <span className="text-gray-400 text-xs">{roleOpen ? '▲' : '▼'}</span>
                          </button>
                          {roleOpen && (
                            <div className="absolute z-10 w-full bg-white border rounded shadow-lg mt-1">
                              <div
                                onClick={() => { setFormData({ ...formData, role: 'employee' }); setRoleOpen(false); }}
                                className={`p-2 cursor-pointer hover:bg-blue-50 ${
                                  formData.role === 'employee' ? 'bg-blue-100 font-semibold text-blue-700' : ''
                                }`}
                              >
                                👤 Employee
                              </div>
                              <div
                                onClick={() => { setFormData({ ...formData, role: 'manager' }); setRoleOpen(false); }}
                                className={`p-2 cursor-pointer hover:bg-blue-50 ${
                                  formData.role === 'manager' ? 'bg-blue-100 font-semibold text-blue-700' : ''
                                }`}
                              >
                                👑 Manager
                              </div>
                            </div>
                          )}
                        </div>
                        
                      


                        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">
                          Register
                        </button>
                      </form>
                    </div>
            </div>
        </div>
   
    </div>
  );
};

export default Register;
