const RightPanel = () => {
  return (
    <aside className="w-[300px] bg-white border-l border-gray-200 p-6 hidden xl:block">
      
      {/* Notifications */}
      <h2 className="text-lg font-semibold text-slate-800 mb-6">
        Notifications
      </h2>

      <div className="space-y-5 text-sm">
        <div>
          <p className="font-medium text-slate-700">
            You export an annual report.
          </p>
          <p className="text-gray-400">Just now</p>
        </div>

        <div>
          <p className="font-medium text-slate-700">
            New client registered.
          </p>
          <p className="text-gray-400">59 minutes ago</p>
        </div>

        <div>
          <p className="font-medium text-slate-700">
            You updated client detail.
          </p>
          <p className="text-gray-400">12 hours ago</p>
        </div>
      </div>

      {/* Contacts */}
      <h2 className="text-lg font-semibold text-slate-800 mt-10 mb-5">
        Contacts
      </h2>

      <div className="space-y-4 text-slate-700">
        <p>Natali Craig</p>
        <p>Drew Cano</p>
        <p>Lancy Chung</p>
        <p>Steve Okumus</p>
        <p>Kate Tsao</p>
      </div>
    </aside>
  );
};

export default RightPanel;