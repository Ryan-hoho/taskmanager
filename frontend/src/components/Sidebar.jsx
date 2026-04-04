import { useNavigate, useLocation } from 'react-router-dom';
import {
  ClipboardList,
  Users,
  UserCircle,
  Plus,
  ShieldCheck,
  Briefcase,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const role = user?.role || 'employee';

  let navItems = [];

  if (role === 'admin') {
    navItems = [
      { label: 'User Management', icon: ShieldCheck, path: '/AdminUser' },
      
      { label: 'My Account', icon: UserCircle, path: '/Profile' },
    ];
  } else if (role === 'manager') {
    navItems = [
      
      { label: 'My Clients', icon: Briefcase, path: '/Clients' },
      { label: 'My Tasks', icon: ClipboardList, path: '/Tasks' },
      { label: 'My Account', icon: UserCircle, path: '/Profile' },
    ];
  } else {
    navItems = [
      { label: 'Task', icon: ClipboardList, path: '/Tasks' },
      { label: 'My Clients', icon: Users, path: '/Clients' },
      { label: 'My Account', icon: UserCircle, path: '/Profile' },
    ];
  }

  return (
    <aside className="w-[240px] bg-[#dfe5f7] border-r border-gray-200 flex flex-col justify-between p-6 h-screen sticky top-0">
      {/* 上半部 */}
      <div>
        {/* Logo */}
        <div className="text-2xl font-bold text-slate-800 mb-10">ABC CRM</div>

        {/* 使用者資訊 */}
        <div className="mb-10">
          <p className="font-semibold text-slate-800">
            {user?.firstname || ''}
          </p>
          <p className="text-sm text-slate-500">{user?.occupation || role}</p>
        </div>

        {/* 導覽選項 */}
        <nav className="space-y-1 text-slate-700">
          {navItems.map(({ label, icon: Icon, path }) => {
            const isActive = location.pathname === path;

            return (
              <div
                key={label}
                onClick={() => navigate(path)}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition-all
                  ${
                    isActive
                      ? 'bg-white shadow-sm font-medium text-slate-800'
                      : 'hover:bg-white/70 text-slate-700'
                  }`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </div>
            );
          })}
        </nav>
      </div>

      {/* 下半部按鈕 */}
      <div className="flex flex-col gap-4 mt-6">
        {role === 'employee' && (
          <>
            <button
              onClick={() => navigate('/AddTasks')}
              className="w-full rounded-2xl bg-[#1f4ed8] text-white py-1 font-medium shadow hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <Plus size={16} />
              New Task
            </button>
            <button
              onClick={() => navigate('/AddClients')}
              className="w-full rounded-2xl bg-[#1f4ed8] text-white py-1 font-medium shadow hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <Plus size={16} />
              New Client
            </button>
          </>
        )}

        {role === 'manager' && (
          <>
            <button
              onClick={() => navigate('/AddTasks')}
              className="w-full rounded-2xl bg-[#1f4ed8] text-white py-1 font-medium shadow hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <Plus size={16} />
              New Tasks
            </button>
            <button
              onClick={() => navigate('/AddClients')}
              className="w-full rounded-2xl bg-[#1f4ed8] text-white py-1 font-medium shadow hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <Plus size={16} />
              New Clients
            </button>
          </>
        )}

        
      </div>
    </aside>
  );
};

export default Sidebar;