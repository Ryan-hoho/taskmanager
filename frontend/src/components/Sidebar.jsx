import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, ClipboardList, FileText, Users, UserCircle, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const NAV_ITEMS = [

  { label: 'Task',       icon: ClipboardList,   path: '/Tasks' },
  { label: 'My Clients', icon: Users,           path: '/Clients' },
  { label: 'My Account', icon: UserCircle,      path: '/Profile' },
];

const Sidebar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

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
          <p className="text-sm text-slate-500">{user?.oppcupation || ''}</p>
        </div>

        {/* 導覽選項 */}
        <nav className="space-y-1 text-slate-700">
          {NAV_ITEMS.map(({ label, icon: Icon, path }) => {
            const isActive = location.pathname === path;
            return (
              <div
                key={label}
                onClick={() => navigate(path)}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition-all
                  ${isActive
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

      {/* 下半部：New Task 按鈕 */}
      <div className="flex flex-col gap-4 mt-6">
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
      </div>
  
    
    
    
    
    
    </aside>
  );
};

export default Sidebar;