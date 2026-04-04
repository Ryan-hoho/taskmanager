import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ employeeID: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/api/auth/login', formData);
      login(response.data);

      if (response.data.role === 'admin') {
      navigate('/AdminUser');
    } else {
      navigate('/clients'); }

    
    } catch (error) {
      alert('Login failed. Please try again.');
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
          <div className="max-w-[520px] mx-auto w-full">
            <h4 className="text-4xl font-bold text-slate-900 leading-tight">
              Log In ABC CRM
              <br />
              Enterprise Portal
            </h4>

            <p className="mt-4 text-2xl text-slate-600">Welcome Back!</p>

            <form onSubmit={handleSubmit} className="mt-12 space-y-8">
              <div>
                <input
                  type="text"
                  name="employeeID"
                  value={formData.employeeID}
                  onChange={handleChange}
                  placeholder="Enter your Employee ID"
                  className="w-full h-16 rounded-2xl border border-slate-300 px-6 text-2xl outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full h-16 rounded-2xl border border-slate-300 px-6 text-2xl outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="text-right">
                <button
                  type="button"
                  className="text-xl text-slate-600 hover:text-blue-600"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full h-16 rounded-2xl bg-blue-500 text-white text-2xl font-semibold hover:bg-blue-600 transition"
              >
                Sign In
              </button>
            </form>

            <div className="mt-10 text-center text-lg text-slate-500">
              Don’t have an account?{' '}
              <Link to="/register" className="text-blue-600 font-semibold hover:underline">
                Register
              </Link>
            </div>

            <div className="mt-20 text-center text-slate-500 text-xl">
              ABC CRM Enterprise Portal - Secure Access for Authorized Employee
            </div>
          </div>
        </div>
      </div>
  </div>
    
   

  );
};

export default Login;
