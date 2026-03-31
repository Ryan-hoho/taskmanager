import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Clients from './pages/Clients';
import Tasks from './pages/Tasks';
import Sidebar from './components/Sidebar';
import RightPanel from './components/Rightpanel';

function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* 左側 Sidebar */}
      <Sidebar />

      {/* 右側區域 */}
      <div className="flex-1 flex flex-col">
        {/* 右上 Navbar */}
        <Navbar />

        <div className="flex flex-1">
          {/* 右下內容 */}
          <main className="flex-1 p-6">
            {children}
          </main>

          {/* 右側 RightPanel */}
          <RightPanel />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* 不顯示 sidebar/navbar/rightpanel */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 顯示 sidebar/navbar/rightpanel */}
        <Route
          path="/profile"
          element={
            <DashboardLayout>
              <Profile />
            </DashboardLayout>
          }
        />
        <Route
          path="/clients"
          element={
            <DashboardLayout>
              <Clients />
            </DashboardLayout>
          }
        />
        <Route
          path="/tasks"
          element={
            <DashboardLayout>
              <Tasks />
            </DashboardLayout>
          }
        />
      </Routes>
    </Router>
  );
}



export default App;
