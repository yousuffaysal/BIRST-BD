import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, User, Briefcase, GraduationCap, Award, Upload } from 'lucide-react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const GRADIENT_PRESETS = [
    { label: 'Blue - Cyan', value: 'from-blue-400 to-cyan-300' },
    { label: 'Purple - Pink', value: 'from-purple-400 to-pink-300' },
    { label: 'Amber - Orange', value: 'from-amber-400 to-orange-300' },
    { label: 'Emerald - Teal', value: 'from-emerald-400 to-teal-300' },
    { label: 'Rose - Red', value: 'from-rose-400 to-red-300' },
    { label: 'Indigo - Violet', value: 'from-indigo-400 to-violet-300' },
];

export default function AddTeamMembers() {
    const axiosSecure = useAxiosSecure();
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMember, setEditingMember] = useState(null);

    const initialFormState = {
        name: '',
        role: '',
        expertise: '',
        education: '',
        experience: '',
        image: '',
        color: GRADIENT_PRESETS[0].value,
        linkedin: '',
        email: '',
        position: ''
    };

    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const response = await axiosSecure.get('/team-members');
            setMembers(response.data || []);
        } catch (error) {
            console.error('Error fetching team members:', error);
            toast.error('Failed to load team members');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const openModal = (member = null) => {
        if (member) {
            setEditingMember(member);
            setFormData({
                name: member.name || '',
                role: member.role || '',
                expertise: member.expertise || '',
                education: member.education || '',
                experience: member.experience || '',
                image: member.image || '',
                color: member.color || GRADIENT_PRESETS[0].value,
                linkedin: member.linkedin || '',
                email: member.email || '',
                position: member.position || ''
            });
        } else {
            setEditingMember(null);
            setFormData(initialFormState);
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingMember(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingMember) {
                const response = await axiosSecure.put(`/team-members/${editingMember._id}`, formData);
                if (response.data) {
                    toast.success('Team member updated successfully');
                    fetchMembers();
                    closeModal();
                }
            } else {
                const response = await axiosSecure.post('/team-members', formData);
                if (response.data.insertedId) {
                    toast.success('Team member added successfully');
                    fetchMembers();
                    closeModal();
                }
            }
        } catch (error) {
            console.error('Error saving team member:', error);
            toast.error('Failed to save team member');
        }
    };

    const handleDelete = (member) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This will permanently delete this team member',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axiosSecure.delete(`/team-members/${member._id}`);
                    if (response.data) {
                        toast.success('Member deleted successfully');
                        fetchMembers();
                    }
                } catch (error) {
                    console.error('Error deleting member:', error);
                    toast.error('Failed to delete member');
                }
            }
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Manage Team Members</h2>
                    <p className="text-gray-600 mt-1">Add, edit, and update your team profiles</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="flex items-center gap-2 px-6 py-3 bg-[var(--color-birst-primary)] text-white rounded-xl hover:bg-blue-600 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                    <Plus className="w-5 h-5" />
                    Add New Member
                </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {members.map((member) => (
                    <div key={member._id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden border border-gray-100 group">
                        <div className={`h-24 bg-gradient-to-r ${member.color}`}></div>
                        <div className="px-6 -mt-12 mb-4">
                            <div className={`w-24 h-24 rounded-full border-4 border-white bg-gradient-to-br ${member.color} flex items-center justify-center text-white text-3xl font-bold shadow-md overflow-hidden`}>
                                {member.image ? (
                                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                ) : (
                                    member.name.split(' ').map(n => n[0]).join('')
                                )}
                            </div>
                        </div>

                        <div className="px-6 pb-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                            <p className="text-sm font-semibold text-[var(--color-birst-primary)] mb-3">{member.role}</p>

                            <div className="space-y-2 text-sm text-gray-600 mb-6">
                                <div className="flex items-start gap-2">
                                    <GraduationCap size={16} className="mt-0.5 text-gray-400" />
                                    <span className="line-clamp-1">{member.education}</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <Briefcase size={16} className="mt-0.5 text-gray-400" />
                                    <span className="line-clamp-1">{member.experience}</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <Award size={16} className="mt-0.5 text-gray-400" />
                                    <span className="line-clamp-2">{member.expertise}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                                <button
                                    onClick={() => openModal(member)}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition font-medium text-sm"
                                >
                                    <Edit className="w-4 h-4" />
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(member)}
                                    className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                            {member.position && (
                                <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                                    Pos: {member.position}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {
                members.length === 0 && (
                    <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                            <User size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No Team Members Found</h3>
                        <p className="text-gray-500 mb-6">Start building your team by adding your first member.</p>
                        <button
                            onClick={() => openModal()}
                            className="px-6 py-2 bg-[var(--color-birst-primary)] text-white rounded-lg hover:bg-blue-600 transition font-semibold"
                        >
                            Add New Member
                        </button>
                    </div>
                )
            }

            {/* Modal */}
            {
                isModalOpen && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in">
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                                <h3 className="text-2xl font-bold text-gray-900">
                                    {editingMember ? 'Edit Team Member' : 'Add New Team Member'}
                                </h3>
                                <button onClick={closeModal} className="p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-red-50 hover:text-red-500 transition">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-6">
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Full Name *</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-birst-primary)] focus:bg-white transition"
                                                placeholder="e.g. Dr. Mohammad Hasan"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Role / Designation *</label>
                                            <input
                                                type="text"
                                                name="role"
                                                value={formData.role}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-birst-primary)] focus:bg-white transition"
                                                placeholder="e.g. Director & Lead Statistician"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Expertise</label>
                                        <input
                                            type="text"
                                            name="expertise"
                                            value={formData.expertise}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-birst-primary)] focus:bg-white transition"
                                            placeholder="e.g. Statistical Analysis, Research Methodology"
                                        />
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Education</label>
                                            <input
                                                type="text"
                                                name="education"
                                                value={formData.education}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-birst-primary)] focus:bg-white transition"
                                                placeholder="e.g. PhD in Statistics"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Experience</label>
                                            <input
                                                type="text"
                                                name="experience"
                                                value={formData.experience}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-birst-primary)] focus:bg-white transition"
                                                placeholder="e.g. 15+ years in research"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Position Order</label>
                                            <input
                                                type="number"
                                                name="position"
                                                value={formData.position}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-birst-primary)] focus:bg-white transition"
                                                placeholder="e.g. 1 (Lowest comes first)"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Profile Image URL</label>
                                            <input
                                                type="url"
                                                name="image"
                                                value={formData.image}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-birst-primary)] focus:bg-white transition"
                                                placeholder="https://example.com/photo.jpg"
                                            />
                                            <p className="text-xs text-gray-400 mt-1">Leave empty to use initials avatar</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Theme Color</label>
                                            <select
                                                name="color"
                                                value={formData.color}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-birst-primary)] focus:bg-white transition"
                                            >
                                                {GRADIENT_PRESETS.map(preset => (
                                                    <option key={preset.value} value={preset.value}>{preset.label}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">LinkedIn URL (Optional)</label>
                                            <input
                                                type="url"
                                                name="linkedin"
                                                value={formData.linkedin}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-birst-primary)] focus:bg-white transition"
                                                placeholder="https://linkedin.com/in/username"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Email (Optional)</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-birst-primary)] focus:bg-white transition"
                                                placeholder="email@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex gap-4 pt-6 mt-4 border-t border-gray-100">
                                        <button
                                            type="submit"
                                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[var(--color-birst-primary)] text-white rounded-xl hover:bg-blue-600 transition font-bold shadow-lg"
                                        >
                                            <Save className="w-5 h-5" />
                                            {editingMember ? 'Update Member' : 'Save Member'}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition font-bold"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
}
