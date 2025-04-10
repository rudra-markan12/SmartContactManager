import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaSearch,
  FaFilter,
  FaPhone,
  FaEnvelope,
  FaEllipsisV,
  FaLinkedin,
  FaGithub,
  FaTwitter,
} from 'react-icons/fa';

// Axios instance
const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Change this to your backend base URL
});

// Dummy filter data
const filters = [
  { id: 'all', label: 'All Contacts' },
  { id: 'work', label: 'Work' },
  { id: 'friends', label: 'Friends' },
  { id: 'family', label: 'Family' },
];

const Contacts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedContact, setSelectedContact] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const userEmail = 'user@example.com'; // Replace with actual user email

  useEffect(() => {
    fetchContacts();
  }, [page, selectedFilter]);

  const fetchContacts = async () => {
    try {
      const response = await api.get('/contacts/user', {
        params: { page, size: 10, email: userEmail },
      });
      setContacts(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      selectedFilter === 'all' || contact.tags.includes(selectedFilter);
    return matchesSearch && matchesFilter;
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="pt-20 px-4 md:px-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Contacts</h1>
        <p className="text-gray-600 mt-2">Manage your network effectively</p>
      </motion.div>

      {/* Search + Filter */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
          />
        </div>

        {/* Filter Button */}
        <div className="relative">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg flex items-center gap-2 hover:border-purple-500 transition-all duration-200"
          >
            <FaFilter className="text-gray-500" />
            <span>Filter</span>
          </button>

          {/* Filter Options */}
          <AnimatePresence>
            {filterOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10"
              >
                {filters.map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => {
                      setSelectedFilter(filter.id);
                      setFilterOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-purple-50 transition-colors duration-150 ${
                      selectedFilter === filter.id ? 'bg-purple-50 text-purple-600' : 'text-gray-700'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Contacts Grid */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContacts.map(contact => (
          <motion.div
            key={contact.id}
            variants={item}
            layoutId={`contact-${contact.id}`}
            onClick={() => setSelectedContact(contact)}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white text-xl font-semibold">
                    {contact.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{contact.name}</h3>
                    <p className="text-sm text-gray-500">{contact.role}</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <FaEllipsisV />
                </button>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <FaEnvelope className="text-gray-400" />
                  <span className="text-sm">{contact.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <FaPhone className="text-gray-400" />
                  <span className="text-sm">{contact.phone}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                {contact.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-purple-50 text-purple-600 rounded-full text-xs">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-3 text-gray-400">
                <a href={`https://linkedin.com/in/${contact.social.linkedin}`} className="hover:text-blue-600">
                  <FaLinkedin />
                </a>
                <a href={`https://github.com/${contact.social.github}`} className="hover:text-gray-600">
                  <FaGithub />
                </a>
                <a href={`https://twitter.com/${contact.social.twitter}`} className="hover:text-blue-400">
                  <FaTwitter />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination Controls */}
      <div className="mt-8 flex justify-center gap-4">
        <button
          disabled={page === 0}
          onClick={() => setPage(prev => Math.max(0, prev - 1))}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-gray-700">Page {page + 1} of {totalPages}</span>
        <button
          disabled={page >= totalPages - 1}
          onClick={() => setPage(prev => prev + 1)}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Contact Modal */}
      <AnimatePresence>
        {selectedContact && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedContact(null)}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              layoutId={`contact-${selectedContact.id}`}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl shadow-xl w-full max-w-2xl"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white text-2xl font-semibold">
                      {selectedContact.name.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">{selectedContact.name}</h2>
                      <p className="text-gray-500">{selectedContact.role}</p>
                      <p className="text-gray-500">{selectedContact.company}</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedContact(null)} className="text-gray-400 hover:text-gray-600">
                    ×
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-800">Contact Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <FaEnvelope className="text-gray-400" />
                        <span>{selectedContact.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <FaPhone className="text-gray-400" />
                        <span>{selectedContact.phone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-800">Social Profiles</h3>
                    <div className="flex items-center gap-4">
                      <a href={`https://linkedin.com/in/${selectedContact.social.linkedin}`} className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                        <FaLinkedin />
                        <span>LinkedIn</span>
                      </a>
                      <a href={`https://github.com/${selectedContact.social.github}`} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                        <FaGithub />
                        <span>GitHub</span>
                      </a>
                      <a href={`https://twitter.com/${selectedContact.social.twitter}`} className="flex items-center gap-2 text-gray-600 hover:text-blue-400">
                        <FaTwitter />
                        <span>Twitter</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Contacts;
