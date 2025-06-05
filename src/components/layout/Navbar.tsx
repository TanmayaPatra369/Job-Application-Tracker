import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import Button from '../ui/Button';
import Avatar from '../ui/Avatar';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700 py-4 px-6 fixed top-0 left-0 right-0 z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar}
            className="md:hidden mr-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <Menu className="w-6 h-6" />
          </button>
          <Link to="/" className="text-xl font-bold text-blue-600 dark:text-blue-500">
            JobTrack
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          
          {user && (
            <div className="flex items-center">
              <div className="hidden md:flex items-center">
                <Link to="/profile">
                  <div className="flex items-center mr-4 cursor-pointer">
                    <Avatar 
                      src={user.avatar} 
                      fallback={user.name || 'User'} 
                      size="sm" 
                      className="mr-2"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {user.name || 'User'}
                    </span>
                  </div>
                </Link>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <LogOut className="w-5 h-5" />
                <span className="ml-2 hidden md:inline">Logout</span>
              </Button>
            </div>
          )}
          
          {!user && (
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/login')}
              >
                Log in
              </Button>
              <Button 
                variant="primary" 
                size="sm"
                onClick={() => navigate('/signup')}
              >
                Sign up
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;