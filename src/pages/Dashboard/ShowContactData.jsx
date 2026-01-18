import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trash2, MessageSquare, Mail, User, Search, RefreshCcw, Loader,
  ChevronRight, Inbox, Clock, Send, MoreVertical, Star, Archive
} from 'lucide-react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const ShowContactData = () => {
  const axiosSecure = useAxiosSecure();
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [showMobileSidebar, setShowMobileSidebar] = useState(true); // Default to list view on mobile

  // Fetch Data
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setIsLoading(true);
      const [contactRes, profileRes] = await Promise.all([
        axiosSecure.get('/contactCollection'),
        axiosSecure.get('/profiles')
      ]);

      // Create a map of email -> photoURL for quick lookup
      const profileMap = {};
      if (Array.isArray(profileRes.data)) {
        profileRes.data.forEach(profile => {
          if (profile.email) {
            profileMap[profile.email.toLowerCase()] = profile.photoURL;
          }
        });
      }

      // Merge photoURL into enrollments
      const mergedData = (contactRes.data || []).map(item => ({
        ...item,
        photoURL: profileMap[item.email?.toLowerCase()] || item.photoURL || item.image
      }));

      // Sort by newest first
      const sortedData = mergedData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setContacts(sortedData);
      setFilteredContacts(sortedData);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast.error("Failed to load messages");
    } finally {
      setIsLoading(false);
    }
  };

  // Search Logic
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredContacts(contacts);
    } else {
      const lowerTerm = searchTerm.toLowerCase();
      const filtered = contacts.filter(contact =>
        contact.name.toLowerCase().includes(lowerTerm) ||
        contact.email.toLowerCase().includes(lowerTerm) ||
        contact.subject.toLowerCase().includes(lowerTerm)
      );
      setFilteredContacts(filtered);
    }
  }, [searchTerm, contacts]);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setShowMobileSidebar(true); // Always show sidebar on desktop
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDelete = async (id, e) => {
    e.stopPropagation(); // Prevent selection when clicking delete

    Swal.fire({
      title: 'Delete Message?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#9CA3AF',
      confirmButtonText: 'Yes, delete it',
      background: '#fff',
      customClass: {
        title: "font-unbounded text-[#0B2340]",
        popup: "rounded-3xl",
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/contactCollection/${id}`);
          const updatedContacts = contacts.filter((c) => c._id !== id);
          setContacts(updatedContacts);
          setFilteredContacts(prev => prev.filter(c => c._id !== id));
          if (selectedContact?._id === id) setSelectedContact(null);
          toast.success("Message deleted");
        } catch (error) {
          toast.error("Failed to delete message");
        }
      }
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const selectContact = (contact) => {
    setSelectedContact(contact);
    if (window.innerWidth < 1024) {
      setShowMobileSidebar(false); // Hide sidebar on mobile after selection
    }
  };

  return (
    <div className="h-[calc(100vh-100px)] min-h-[600px] bg-[#FAFAFA] font-jakarta overflow-hidden flex flex-col relative rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] m-4 lg:m-0">

      {/* Full Width Unified Header */}
      <div className="px-8 py-8 border-b border-gray-100 bg-gradient-to-br from-[#0B2340] to-[#02bfff] text-white relative overflow-hidden shrink-0 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[50px] -mr-20 -mt-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#02bfff]/30 rounded-full blur-[40px] -ml-10 -mb-10 pointer-events-none"></div>

        {/* Title Section */}
        <div className="relative z-10 flex items-center gap-5 w-full md:w-auto">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white shrink-0 shadow-inner">
            <Inbox size={28} />
          </div>
          <div>
            <h2 className="text-3xl font-bold font-unbounded text-white flex items-center gap-3">
              Contact Inbox
            </h2>
            <p className="text-white/80 text-base font-medium mt-1">Manage your messages and inquiries</p>
          </div>
        </div>

        {/* Actions Section */}
        <div className="relative z-10 flex items-center gap-4 w-full md:w-auto">
          {/* Search */}
          <div className="relative group flex-1 md:w-96">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/60 group-focus-within:text-white transition-colors w-5 h-5" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 outline-none focus:bg-white/20 focus:border-white/30 text-white placeholder-white/50 transition-all font-medium text-lg"
            />
          </div>
          <button
            onClick={fetchContacts}
            className="p-4 bg-white/10 hover:bg-white/20 rounded-2xl text-white/90 hover:text-white transition-colors backdrop-blur-md border border-white/10"
            title="Refresh"
          >
            <RefreshCcw size={22} />
          </button>
        </div>
      </div>

      {/* Main Content Split Area */}
      <div className="flex flex-1 overflow-hidden relative">

        {/* Left Sidebar (List) */}
        <div
          className={`${showMobileSidebar ? 'flex' : 'hidden'} lg:flex w-full lg:w-[400px] xl:w-[450px] flex-col bg-white border-r border-gray-100 z-20 h-full`}
        >
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-40 gap-3 text-gray-400 mt-10">
                <Loader className="animate-spin text-[#02bfff]" />
                <span className="text-xs font-bold uppercase tracking-widest">Loading messages...</span>
              </div>
            ) : filteredContacts.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center px-6">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <Inbox className="text-gray-300" size={32} />
                </div>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {filteredContacts.map((contact) => (
                  <motion.div
                    key={contact._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => selectContact(contact)}
                    className={`p-5 cursor-pointer transition-all hover:bg-gray-50 group relative ${selectedContact?._id === contact._id ? 'bg-blue-50/50 hover:bg-blue-50/80' : ''}`}
                  >
                    {selectedContact?._id === contact._id && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#02bfff]" />
                    )}

                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0B2340] to-[#02bfff] flex items-center justify-center text-white font-bold shrink-0 shadow-sm overflow-hidden mt-1">
                        {contact.photoURL || contact.image ? (
                          <img
                            src={contact.photoURL || contact.image}
                            alt={contact.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-xs">{contact.name.charAt(0).toUpperCase()}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className={`text-sm font-bold truncate pr-2 ${selectedContact?._id === contact._id ? 'text-[#02bfff]' : 'text-[#0B2340]'}`}>
                            {contact.name}
                          </h4>
                          <span className="text-[10px] sm:text-xs font-semibold text-gray-400 shrink-0 whitespace-nowrap">
                            {formatDate(contact.createdAt)}
                          </span>
                        </div>
                        <p className={`text-xs font-bold mb-1 truncate ${selectedContact?._id === contact._id ? 'text-[#0B2340]' : 'text-gray-600'}`}>
                          {contact.subject}
                        </p>
                        <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                          {contact.message}
                        </p>
                      </div>
                    </div>

                    {/* Hover Actions */}
                    <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                      <button
                        onClick={(e) => handleDelete(contact._id, e)}
                        className="p-1.5 bg-white shadow-sm border border-gray-100 rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Pane (Reading View) */}
        <div className={`flex-1 bg-[#FAFAFA] flex flex-col ${!showMobileSidebar ? 'flex' : 'hidden lg:flex'} h-full relative`}>
          {/* Mobile Back Button Overlay */}
          {!showMobileSidebar && (
            <div className="lg:hidden p-4 bg-white border-b border-gray-100 sticky top-0 z-30">
              <button
                onClick={() => setShowMobileSidebar(true)}
                className="flex items-center gap-2 text-[#0B2340] font-bold"
              >
                <ChevronRight className="rotate-180" size={20} /> Back to Inbox
              </button>
            </div>
          )}

          {selectedContact ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              key={selectedContact._id}
              className="h-full flex flex-col p-4 lg:p-8 overflow-y-auto"
            >
              <div className="max-w-4xl mx-auto w-full bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden flex flex-col min-h-full lg:min-h-0 lg:h-full">

                {/* Message Header */}
                <div className="p-8 border-b border-gray-100 bg-white relative">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0B2340] to-[#02bfff] flex items-center justify-center shadow-lg shadow-blue-900/20 overflow-hidden">
                        {selectedContact.photoURL || selectedContact.image ? (
                          <img
                            src={selectedContact.photoURL || selectedContact.image}
                            alt={selectedContact.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-white font-bold text-2xl font-unbounded">{selectedContact.name.charAt(0).toUpperCase()}</span>
                        )}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold font-unbounded text-[#0B2340] mb-1">{selectedContact.name}</h2>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                          <span className="font-medium text-[#02bfff] bg-blue-50 px-2 py-0.5 rounded-md">{selectedContact.email}</span>
                          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                          <span className="flex items-center gap-1"><Clock size={12} /> {new Date(selectedContact.createdAt).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={(e) => handleDelete(selectedContact._id, e)}
                      className="p-3 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-colors self-end md:self-auto"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Subject & Body */}
                <div className="p-8 flex-1 flex flex-col overflow-y-auto">
                  <h3 className="text-xl font-bold text-[#0B2340] mb-6">
                    {selectedContact.subject}
                  </h3>
                  <div className="prose prose-sm md:prose-base max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
                    {selectedContact.message}
                  </div>
                </div>

                {/* Action Footer */}
                <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end gap-4 shrink-0">
                  <a
                    href={`mailto:${selectedContact.email}`}
                    className="flex items-center gap-2 px-6 py-3 bg-[#02bfff] text-white rounded-xl font-bold hover:bg-[#0099cc] transition-all shadow-lg shadow-cyan-200"
                  >
                    <Send size={18} /> Reply via Email
                  </a>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="hidden lg:flex flex-col items-center justify-center h-full text-center p-12 opacity-50">
              <div className="w-64 h-64 bg-gradient-to-tr from-gray-100 to-gray-50 rounded-full flex items-center justify-center mb-6">
                <Mail size={80} className="text-gray-300" strokeWidth={1} />
              </div>
              <h3 className="text-2xl font-bold font-unbounded text-gray-300 mb-2">Select a Message</h3>
              <p className="text-gray-400">Choose from the list on the left to read details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowContactData;