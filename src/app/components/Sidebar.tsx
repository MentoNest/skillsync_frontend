export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white h-full p-4">
      <nav>
        <ul>
          <li className="mb-2"><a href="/dashboard">Dashboard</a></li>
          <li><a href="/dashboard/settings">Settings</a></li>
        </ul>
      </nav>
    </aside>
  );
}
