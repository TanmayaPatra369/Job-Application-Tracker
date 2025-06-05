import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Briefcase, 
  ListTodo, 
  PieChart, 
  Settings, 
  CalendarDays,
  LayoutDashboard,
  X
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <Home className="w-5 h-5" /> },
    { name: 'Job Board', path: '/jobs', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Applications', path: '/applications', icon: <Briefcase className="w-5 h-5" /> },
    { name: 'Tasks', path: '/tasks', icon: <ListTodo className="w-5 h-5" /> },
    { name: 'Calendar', path: '/calendar', icon: <CalendarDays className="w-5 h-5" /> },
    { name: 'Analytics', path: '/analytics', icon: <PieChart className="w-5 h-5" /> },
    { name: 'Settings', path: '/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed top-0 left-0 h-full bg-white dark:bg-gray-900 shadow-lg transition-transform duration-300 ease-in-out z-30",
          "w-64 pt-20 border-r border-gray-200 dark:border-gray-700",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="absolute top-4 right-4 md:hidden">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="mt-6 px-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => cn(
                    "flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 rounded-md transition-colors",
                    "hover:bg-gray-100 dark:hover:bg-gray-800",
                    isActive && "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-500"
                  )}
                  onClick={() => window.innerWidth < 768 && onClose()}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;