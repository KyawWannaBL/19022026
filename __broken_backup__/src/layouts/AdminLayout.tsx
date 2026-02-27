        <hr />
        <Link to="/admin" className="d-block text-white mb-2">Dashboard</Link>
        <Link to="/admin/users" className="d-block text-white mb-2">Users</Link>
        <Link to="/admin/settings" className="d-block text-white">Settings</Link>
      </div>

      <div className="flex-grow-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;