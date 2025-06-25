import React, { ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { FiUser, FiLogOut } from 'react-icons/fi';

const menuItems = [
  { label: 'Dashboard', path: '/candidate/dashboard' },
  { label: 'Facility Finder', path: '/candidate/facility-finder' },
  { label: 'Uitdagingen', path: '/candidate/uitdagingen' },
  { label: 'Richtingen', path: '/candidate/richtingen' },
  { label: 'Drijfveren', path: '/candidate/drijfveren' },
];

const statusOptions = [
  'Studeren',
  'Werk zoeken',
  'Werkend',
  'Stage zoeken',
];

export default function Layout({ children, user }: { children: ReactNode; user?: { name: string } }) {
  const router = useRouter();
  const pathname = usePathname();

  // Als er geen user is, toon dan alleen de content zonder navigatie
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main>{children}</main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#F9FAFB]">
      {/* Sidebar */}
      <aside className="w-72 min-h-screen bg-white rounded-tl-3xl rounded-bl-3xl shadow-lg flex flex-col justify-between py-10 px-8 mr-8" style={{ borderTopLeftRadius: '2rem', borderBottomLeftRadius: '2rem' }}>
        <div>
          <div className="mb-10">
            <span className="text-2xl font-extrabold tracking-tight text-gray-800">UNDSQVRD</span>
          </div>
          <div className="mb-8">
            <div className="text-gray-500 text-sm mb-1">Welkom!</div>
            <div className="font-semibold text-lg text-gray-800">{user?.name || 'Demo'}</div>
          </div>
          <nav className="flex flex-col gap-1">
            {menuItems.map(item => (
              <button
                key={item.label}
                className={`text-left px-4 py-2 rounded-lg font-medium transition-all duration-150 ${pathname === item.path ? 'text-gray-900 font-bold bg-gray-100' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
                onClick={() => router.push(item.path)}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex flex-col gap-2 mb-2">
          <button
            className="flex items-center gap-2 text-left px-4 py-2 rounded-lg font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition"
            onClick={() => router.push('/profiel')}
          >
            <FiUser className="w-5 h-5" /> Mijn profiel
          </button>
          <button
            className="flex items-center gap-2 text-left px-4 py-2 rounded-lg font-medium text-red-500 hover:bg-red-50 hover:text-red-700 transition"
            onClick={() => {/* Uitlog functionaliteit */}}
          >
            <FiLogOut className="w-5 h-5" /> Uitloggen
          </button>
        </div>
      </aside>
      {/* Main content */}
      <main className="flex-1 flex flex-col py-10 pr-10">
        {/* Topbar */}
        <header className="flex items-center justify-between bg-white shadow px-8 py-4">
          <div className="text-lg font-semibold">Welkom! {user.name.split(' ')[0]}</div>
          <div>
            <select
              className="border rounded px-3 py-1"
              value={statusOptions[0]}
              onChange={e => {/* Handle status change */}}
            >
              {statusOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </header>

        {/* Dashboard placeholders */}
        <div className="mt-8">
          {pathname === "/candidate/dashboard" && (
            <div className="grid grid-cols-2 gap-8">
              {/* Radar chart placeholder */}
              <div className="bg-white rounded shadow p-6 flex flex-col items-center justify-center min-h-[300px]">
                <span className="text-gray-400">[Radar Chart Placeholder]</span>
              </div>
              {/* Kaart placeholder */}
              <div className="bg-white rounded shadow p-6 flex flex-col items-center justify-center min-h-[300px]">
                <span className="text-gray-400">[Kaart Placeholder]</span>
              </div>
            </div>
          )}
          {children}
        </div>
      </main>
    </div>
  );
} 