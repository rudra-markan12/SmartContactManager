import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaUserPlus, FaChartLine, FaBell } from 'react-icons/fa';
import { HiOutlineMailOpen } from 'react-icons/hi';

const Dashboard = () => {
  const statsCards = [
    { title: 'Total Contacts', value: '1,234', icon: FaUsers, color: 'bg-blue-500' },
    { title: 'New Contacts', value: '89', icon: FaUserPlus, color: 'bg-green-500' },
    { title: 'Active Contacts', value: '756', icon: FaChartLine, color: 'bg-purple-500' },
  ];

  const recentContacts = [
    { name: 'John Doe', email: 'john@example.com', date: '2024-03-15' },
    { name: 'Jane Smith', email: 'jane@example.com', date: '2024-03-14' },
    { name: 'Mike Johnson', email: 'mike@example.com', date: '2024-03-13' },
  ];

  const notifications = [
    { message: 'New contact request from Sarah', time: '2 hours ago' },
    { message: 'Meeting scheduled with Team', time: '5 hours ago' },
    { message: 'Contact list updated', time: '1 day ago' },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-20"
    >
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome back, <span className="text-purple-600">User</span>! 👋
        </h1>
        <p className="text-gray-600 mt-2">Here's what's happening with your contacts today.</p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        {statsCards.map((card, index) => (
          <motion.div
            key={index}
            variants={item}
            className={`${card.color} rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition-shadow duration-300`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg opacity-90">{card.title}</p>
                <h3 className="text-3xl font-bold mt-2">{card.value}</h3>
              </div>
              <card.icon className="text-4xl opacity-80" />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Contacts */}
        <motion.div
          variants={item}
          className="lg:col-span-2 bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Recent Contacts</h2>
            <button className="text-purple-600 hover:text-purple-700">View All</button>
          </div>
          <div className="space-y-4">
            {recentContacts.map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors duration-150"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold">
                    {contact.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">{contact.name}</h3>
                    <p className="text-sm text-gray-500">{contact.email}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{contact.date}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Notifications Panel */}
        <motion.div
          variants={item}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
            <FaBell className="text-gray-400" />
          </div>
          <div className="space-y-4">
            {notifications.map((notification, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-150"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <HiOutlineMailOpen className="text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-700">{notification.message}</p>
                  <span className="text-xs text-gray-500">{notification.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;   