import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const AdminLayout = () => (
  <div className="flex min-h-screen">
    <aside className="w-64 bg-gray-200 p-4 space-y-2">
      <h2 className="font-bold text-lg">Admin</h2>
      <nav className="space-y-1">
        <Link to="/admin" className="block">Dashboard</Link>
        <Link to="/admin/users" className="block">Users</Link>
      </nav>
    </aside>
    <main className="flex-1 p-4">
      <Outlet />
    </main>
  </div>
);

export default AdminLayout;
