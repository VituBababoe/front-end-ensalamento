import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { FiHome } from 'react-icons/fi';
import { LuUsers } from 'react-icons/lu';
import MainContent from '../components/MainContent';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';

const RestrictedLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const menuItems = [
    { path: '/home', label: 'Home', icon: <FiHome /> },
    { path: '/users', label: 'Usuários', icon: <LuUsers /> },
    {
      path: '/users/new',
      label: 'Novos Usuários',
      icon: <AiOutlineUsergroupAdd />,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        menuItems={menuItems}
      />
      <MainContent toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default RestrictedLayout;
