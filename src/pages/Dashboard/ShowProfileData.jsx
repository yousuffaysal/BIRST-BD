import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {
    Search, Users, Trash2, Mail, Phone, MapPin, GraduationCap, X
} from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ShowProfileData = () => {
    const axiosSecure = useAxiosSecure();
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [selectedProfile, setSelectedProfile] = useState(null); // For detail modal if needed

    // Fetch profiles
    const { data: profiles = [], isLoading, error, refetch } = useQuery({
        queryKey: ["profiles"],
        queryFn: async () => {
            const res = await axiosSecure.get("/profiles");
            return res.data;
        },
    });

    const filteredProfiles = profiles.filter(
        (profile) =>
            profile.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            profile.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            profile.institution?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredProfiles.length / itemsPerPage);
    const paginatedProfiles = filteredProfiles.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleDelete = (profile) => {
        Swal.fire({
            title: "Delete Profile?",
            text: `Are you sure you want to delete the profile for ${profile.name}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#B91C1C",
            cancelButtonColor: "#0A3D91",
            confirmButtonText: "Yes, delete",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure
                    .delete(`/profiles/${profile._id}`)
                    .then((res) => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire("Deleted!", "Profile has been deleted.", "success");
                        }
                    })
                    .catch((error) => {
                        Swal.fire("Error!", "Failed to delete profile.", "error");
                    });
            }
        });
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    if (isLoading) return <div className="p-8 text-center text-[#0A3D91]">Loading profiles...</div>;
    if (error) return <div className="p-8 text-center text-red-500">Error loading profiles</div>;

    return (
        <div className="min-h-screen bg-[#FDF6E9] p-4 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-[#FBF8F3] rounded-2xl p-6 lg:p-8 mb-8 border border-[#E5E0D5] shadow-lg">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#0A3D91] to-[#08306B] rounded-2xl flex items-center justify-center">
                            <GraduationCap className="h-8 w-8 text-white" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-[#0A3D91]">Student Profiles</h2>
                            <p className="text-[#6B7280]">Manage student registration details</p>
                        </div>
                    </div>
                </div>

                {/* Search */}
                <div className="mb-8 bg-[#FBF8F3] rounded-2xl p-6 border border-[#E5E0D5] shadow-sm">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by name, email, or institution..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-6 py-4 pl-14 rounded-xl border border-[#E5E0D5] text-[#0A3D91] focus:outline-none focus:ring-2 focus:ring-[#0A3D91]"
                        />
                        <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-[#D0A96A]" />
                    </div>
                </div>

                {/* List */}
                <div className="space-y-4">
                    {paginatedProfiles.length === 0 ? (
                        <div className="text-center p-12 text-gray-500">No profiles found.</div>
                    ) : (
                        paginatedProfiles.map((profile, index) => (
                            <div key={profile._id} className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 flex flex-col lg:flex-row items-center gap-6 hover:shadow-lg transition">
                                <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                                    {profile.photoURL ? (
                                        <img src={profile.photoURL} alt={profile.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-[#0A3D91] text-white font-bold">{profile.name?.charAt(0)}</div>
                                    )}
                                </div>

                                <div className="flex-1 text-center lg:text-left space-y-2">
                                    <h3 className="text-xl font-bold text-[#0A3D91]">{profile.name}</h3>
                                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-600">
                                        <span className="flex items-center gap-1"><Mail size={14} /> {profile.email}</span>
                                        {profile.phone && <span className="flex items-center gap-1"><Phone size={14} /> {profile.phone}</span>}
                                        {profile.institution && <span className="flex items-center gap-1"><GraduationCap size={14} /> {profile.institution}</span>}
                                    </div>
                                    {profile.address && <p className="text-sm text-gray-500 flex items-center justify-center lg:justify-start gap-1"><MapPin size={14} /> {profile.address}</p>}
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => handleDelete(profile)}
                                        className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition"
                                        title="Delete Profile"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Pagination Logic similar to before if needed */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-8 gap-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-white border border-gray-200 rounded-lg disabled:opacity-50"
                        >
                            Prev
                        </button>
                        <div className="px-4 py-2 bg-[#0A3D91] text-white rounded-lg">
                            {currentPage} / {totalPages}
                        </div>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-white border border-gray-200 rounded-lg disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShowProfileData;
