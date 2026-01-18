import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import {
    Search, Users, Trash2, Mail, Phone, MapPin,
    GraduationCap, RefreshCcw, Loader, User
} from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ShowProfileData = () => {
    const axiosSecure = useAxiosSecure();
    const [searchTerm, setSearchTerm] = useState("");

    // Fetch profiles
    const { data: profiles = [], isLoading, refetch } = useQuery({
        queryKey: ["profiles"],
        queryFn: async () => {
            const res = await axiosSecure.get("/profiles");
            // Sort by newest if 'createdAt' exists, otherwise default order
            return Array.isArray(res.data) ? res.data.reverse() : [];
        },
    });

    const handleDelete = (profile, e) => {
        e.stopPropagation();
        Swal.fire({
            title: "Delete Profile?",
            text: `This will remove ${profile.name} permanently.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#EF4444",
            cancelButtonColor: "#9CA3AF",
            confirmButtonText: "Yes, delete it",
            background: '#fff',
            customClass: {
                title: "font-unbounded text-[#0B2340]",
                popup: "rounded-3xl",
            }
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure
                    .delete(`/profiles/${profile._id}`)
                    .then((res) => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            toast.success("Profile deleted successfully");
                        }
                    })
                    .catch((error) => {
                        toast.error("Failed to delete profile");
                    });
            }
        });
    };

    const filteredProfiles = profiles.filter(
        (profile) =>
            profile.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            profile.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            profile.institution?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="h-[calc(100vh-100px)] min-h-[600px] bg-[#FAFAFA] font-jakarta overflow-hidden flex flex-col relative rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] m-4 lg:m-0">

            {/* Unified Gradient Header */}
            <div className="px-8 py-8 border-b border-gray-100 bg-gradient-to-br from-[#0B2340] to-[#02bfff] text-white relative overflow-hidden shrink-0 flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[50px] -mr-20 -mt-20 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#02bfff]/30 rounded-full blur-[40px] -ml-10 -mb-10 pointer-events-none"></div>

                {/* Title Section */}
                <div className="relative z-10 flex items-center gap-5 w-full md:w-auto">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white shrink-0 shadow-inner">
                        <Users size={28} />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold font-unbounded text-white flex items-center gap-3">
                            Student Profiles
                        </h2>
                        <p className="text-white/80 text-base font-medium mt-1">Manage registration details</p>
                    </div>
                </div>

                {/* Actions Section */}
                <div className="relative z-10 flex items-center gap-4 w-full md:w-auto">
                    <div className="relative group flex-1 md:w-96">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/60 group-focus-within:text-white transition-colors w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search name, email, institution..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-6 py-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 outline-none focus:bg-white/20 focus:border-white/30 text-white placeholder-white/50 transition-all font-medium text-lg"
                        />
                    </div>
                    <button
                        onClick={() => refetch()}
                        className="p-4 bg-white/10 hover:bg-white/20 rounded-2xl text-white/90 hover:text-white transition-colors backdrop-blur-md border border-white/10"
                        title="Refresh"
                    >
                        <RefreshCcw size={22} />
                    </button>
                </div>
            </div>

            {/* List Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-10">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-64 gap-4 text-gray-400">
                        <Loader className="animate-spin text-[#02bfff]" size={40} />
                        <span className="font-bold text-sm uppercase tracking-widest">Loading Profiles...</span>
                    </div>
                ) : filteredProfiles.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center opacity-60">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                            <User size={48} className="text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-[#0B2340] mb-2 font-unbounded">No Profiles Found</h3>
                        <p className="text-gray-500">Try adjusting your search criteria</p>
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid gap-4"
                    >
                        {filteredProfiles.map((profile) => (
                            <motion.div
                                key={profile._id}
                                variants={itemVariants}
                                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group flex flex-col xl:flex-row gap-6 xl:items-center justify-between"
                            >
                                {/* Left: Profile Info */}
                                <div className="flex items-start gap-5 min-w-0 xl:w-1/3">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0B2340] to-[#02bfff] flex items-center justify-center shrink-0 shadow-lg shadow-blue-900/10 overflow-hidden">
                                        {profile.photoURL ? (
                                            <img
                                                src={profile.photoURL}
                                                alt={profile.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-white font-bold text-2xl font-unbounded">{profile.name?.charAt(0)}</span>
                                        )}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h3 className="text-xl font-bold text-[#0B2340] mb-1 truncate">{profile.name}</h3>
                                        <div className="flex flex-col gap-1 text-sm text-gray-500">
                                            <span className="flex items-center gap-2 truncate">
                                                <Mail size={14} className="text-[#02bfff]" /> {profile.email}
                                            </span>
                                            {profile.phone && (
                                                <span className="flex items-center gap-2 truncate">
                                                    <Phone size={14} className="text-[#02bfff]" /> {profile.phone}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Middle: Academics & Location */}
                                <div className="flex flex-wrap items-center gap-x-8 gap-y-3 min-w-0 flex-1 text-sm text-gray-500">
                                    {profile.institution && (
                                        <div className="flex items-center gap-2">
                                            <GraduationCap size={16} className="text-gray-400" />
                                            <span className="font-medium text-gray-700">{profile.institution}</span>
                                        </div>
                                    )}
                                    {profile.address && (
                                        <div className="flex items-center gap-2">
                                            <MapPin size={16} className="text-gray-400" />
                                            <span className="font-medium text-gray-700">{profile.address}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Right: Actions */}
                                <div className="flex items-center justify-end xl:w-20 shrink-0 border-t xl:border-t-0 border-gray-100 pt-4 xl:pt-0 mt-2 xl:mt-0">
                                    <button
                                        onClick={(e) => handleDelete(profile, e)}
                                        className="p-3 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all shadow-sm"
                                        title="Delete Profile"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default ShowProfileData;
