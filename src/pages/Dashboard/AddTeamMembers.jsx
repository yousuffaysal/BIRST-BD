import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, User, Briefcase, GraduationCap, Award, Upload, Sparkles, Filter, Search, Linkedin, Mail, CheckCircle, Palette, BookOpen, Globe } from 'lucide-react';
import ImageUpload from '../../components/ImageUpload/ImageUpload';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { motion, AnimatePresence } from 'framer-motion';

const GRADIENT_PRESETS = [
    { label: 'Birst Sky', value: 'from-[#02bfff] to-cyan-300' },
    { label: 'Ocean Blue', value: 'from-blue-500 to-[#02bfff]' },
    { label: 'Azure Mist', value: 'from-cyan-400 to-sky-200' },
    { label: 'Deep Sea', value: 'from-[#0B2340] to-[#02bfff]' },
    { label: 'Clean Slate', value: 'from-gray-400 to-slate-300' },
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
        github: '',
        email: '',
        position: '',
        orcid: '',
        researchGate: '',
        googleScholar: ''
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
                github: member.github || '',
                email: member.email || '',
                position: member.position || '',
                orcid: member.orcid || '',
                researchGate: member.researchGate || '',
                googleScholar: member.googleScholar || ''
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
            title: 'Delete Member?',
            text: `Remove ${member.name}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#EF4444',
            cancelButtonColor: '#9CA3AF',
            confirmButtonText: 'Yes, delete',
            background: '#fff',
            customClass: {
                title: "font-unbounded text-[#0B2340]",
                popup: "rounded-3xl",
            }
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
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#02bfff]"></div>
            </div>
        );
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 }
    };

    return (
        <div className="min-h-screen bg-[#FAFAFA] font-jakarta relative p-4 lg:p-8 overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#02bfff]/5 to-transparent pointer-events-none" />
            <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#02bfff]/5 rounded-full blur-[100px] pointer-events-none" />

            <motion.div
                className="max-w-7xl mx-auto relative z-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
                    <motion.div variants={itemVariants}>
                        <h1 className="text-4xl font-bold font-unbounded text-[#0B2340] mb-2">Our Team</h1>
                        <p className="text-gray-500">Manage your team members, roles, and expertise.</p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex items-center gap-4">
                        <button
                            onClick={() => openModal()}
                            className="flex items-center gap-2 px-6 py-3 bg-[#02bfff] text-white rounded-xl hover:bg-[#0099cc] transition-all shadow-lg hover:shadow-cyan-500/25 transform hover:-translate-y-0.5 font-bold"
                        >
                            <Plus size={20} />
                            Add Member
                        </button>
                    </motion.div>
                </div>

                {/* Team Grid (High Density Square Cards) */}
                <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <AnimatePresence>
                        {members.map((member) => (
                            <motion.div
                                key={member._id}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                whileHover={{ y: -5 }}
                                className="aspect-square bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-2xl transition-all duration-300 relative overflow-hidden group border border-gray-100 flex flex-col"
                            >
                                {/* Subtle Top Gradient Bar */}
                                <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${member.color}`} />

                                <div className="absolute inset-0 flex flex-col items-center p-5 text-center z-10">
                                    {/* Action Buttons (Top Right, minimal) */}
                                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                                        <button onClick={() => openModal(member)} className="p-1.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-[#02bfff] hover:text-white transition-colors">
                                            <Edit size={14} />
                                        </button>
                                        <button onClick={() => handleDelete(member)} className="p-1.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors">
                                            <Trash2 size={14} />
                                        </button>
                                    </div>

                                    {/* Avatar (Smaller to fit more content) */}
                                    <div className="mt-2 mb-3 relative">
                                        <div className="w-20 h-20 rounded-full p-1 bg-white shadow-md border border-gray-100 group-hover:scale-105 transition-transform duration-300">
                                            <div className="w-full h-full rounded-full overflow-hidden bg-gray-50">
                                                {member.image ? (
                                                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className={`w-full h-full bg-gradient-to-br ${member.color} flex items-center justify-center text-white text-xl font-bold uppercase`}>
                                                        {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        {member.position && (
                                            <div className="absolute -bottom-1 -right-1 bg-[#0B2340] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border border-white font-bold shadow-sm">
                                                {member.position}
                                            </div>
                                        )}
                                    </div>

                                    {/* Basic Info */}
                                    <h3 className="text-lg font-bold text-[#0B2340] font-unbounded line-clamp-1 w-full px-1 group-hover:text-[#02bfff] transition-colors leading-tight mb-0.5">{member.name}</h3>
                                    <p className="text-sm font-bold text-[#02bfff] line-clamp-1 truncate mb-3">{member.role}</p>

                                    {/* Content Details (Visible Now) */}
                                    <div className="w-full space-y-2 mb-auto flex-1 flex flex-col justify-start">
                                        {member.education && (
                                            <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500 bg-gray-50 py-1 px-2 rounded-lg">
                                                <GraduationCap size={12} className="text-gray-400 shrink-0" />
                                                <span className="truncate font-medium max-w-[150px]">{member.education}</span>
                                            </div>
                                        )}
                                        {member.expertise && (
                                            <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500 bg-gray-50 py-1 px-2 rounded-lg">
                                                <Award size={12} className="text-gray-400 shrink-0" />
                                                <span className="truncate font-medium max-w-[150px]">{member.expertise}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Social Footer */}
                                    {(member.linkedin || member.email || member.orcid || member.researchGate || member.googleScholar) && (
                                        <div className="mt-auto pt-3 border-t border-gray-100 w-full flex justify-center gap-3 flex-wrap">
                                            {member.linkedin && (
                                                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0077b5] transition-colors">
                                                    <Linkedin size={16} />
                                                </a>
                                            )}
                                            {member.email && (
                                                <a href={`mailto:${member.email}`} className="text-gray-400 hover:text-gray-900 transition-colors">
                                                    <Mail size={16} />
                                                </a>
                                            )}
                                            {member.orcid && (
                                                <a href={member.orcid} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#A6CE39] transition-colors font-bold text-[10px] flex items-center">
                                                    ID
                                                </a>
                                            )}
                                            {member.researchGate && (
                                                <a href={member.researchGate} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#00CCBB] transition-colors">
                                                    <Globe size={16} />
                                                </a>
                                            )}
                                            {member.googleScholar && (
                                                <a href={member.googleScholar} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#4285F4] transition-colors">
                                                    <BookOpen size={16} />
                                                </a>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {/* Add New Card Slot */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        whileHover={{ scale: 0.98 }}
                        onClick={() => openModal()}
                        className="aspect-square bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-[#02bfff] hover:bg-cyan-50/30 transition-all group"
                    >
                        <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-300 group-hover:text-[#02bfff] group-hover:scale-110 transition-all duration-300 mb-2">
                            <Plus size={32} />
                        </div>
                        <span className="font-bold text-gray-400 text-sm group-hover:text-[#02bfff]">Add Member</span>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                            onClick={closeModal}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                        >
                            <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl pointer-events-auto border border-gray-100">
                                <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10 transition-colors">
                                    <div>
                                        <h3 className="text-2xl font-bold font-unbounded text-[#0B2340]">
                                            {editingMember ? 'Edit Profile' : 'New Member'}
                                        </h3>
                                        <p className="text-sm text-gray-500">Team member details</p>
                                    </div>
                                    <button onClick={closeModal} className="w-10 h-10 rounded-full bg-gray-50 hover:bg-red-50 text-gray-500 hover:text-red-500 flex items-center justify-center transition-colors">
                                        <X size={20} />
                                    </button>
                                </div>

                                <div className="p-8">
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Full Name <span className="text-red-500">*</span></label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#02bfff] transition-all font-semibold text-gray-900 placeholder-gray-400"
                                                    placeholder="e.g. Dr. Jane Doe"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Role <span className="text-red-500">*</span></label>
                                                <input
                                                    type="text"
                                                    name="role"
                                                    value={formData.role}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#02bfff] transition-all font-semibold text-gray-900 placeholder-gray-400"
                                                    placeholder="e.g. Lead Researcher"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Expertise</label>
                                            <input
                                                type="text"
                                                name="expertise"
                                                value={formData.expertise}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#02bfff] transition-all font-medium text-gray-900 placeholder-gray-400"
                                                placeholder="e.g. Data Analysis, AI, Statistics"
                                            />
                                        </div>

                                        <div className="grid md:grid-cols-3 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1"><GraduationCap size={12} /> Education</label>
                                                <input
                                                    type="text"
                                                    name="education"
                                                    value={formData.education}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#02bfff] transition-all font-medium text-sm"
                                                    placeholder="PhD in Stats"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1"><Briefcase size={12} /> Experience</label>
                                                <input
                                                    type="text"
                                                    name="experience"
                                                    value={formData.experience}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#02bfff] transition-all font-medium text-sm"
                                                    placeholder="10+ Years"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Order</label>
                                                <input
                                                    type="number"
                                                    name="position"
                                                    value={formData.position}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#02bfff] transition-all font-medium text-sm"
                                                    placeholder="1"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Image</label>
                                                <div className="relative">
                                                    <ImageUpload
                                                        value={formData.image}
                                                        onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
                                                        folder="team-members"
                                                        label="Profile Photo"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1"><Palette size={12} /> Theme Color</label>
                                                <select
                                                    name="color"
                                                    value={formData.color}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#02bfff] transition-all font-medium text-sm cursor-pointer"
                                                >
                                                    {GRADIENT_PRESETS.map(preset => (
                                                        <option key={preset.value} value={preset.value}>{preset.label}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6 pb-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1"><Linkedin size={12} /> LinkedIn</label>
                                                <input
                                                    type="url"
                                                    name="linkedin"
                                                    value={formData.linkedin}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#02bfff] transition-all font-medium text-sm"
                                                    placeholder="Profile URL"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1"><Mail size={12} /> Email</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#02bfff] transition-all font-medium text-sm"
                                                    placeholder="addr@example.com"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">ORCID</label>
                                                <input
                                                    type="url"
                                                    name="orcid"
                                                    value={formData.orcid}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#02bfff] transition-all font-medium text-sm"
                                                    placeholder="ORCID Profile"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">ResearchGate</label>
                                                <input
                                                    type="url"
                                                    name="researchGate"
                                                    value={formData.researchGate}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#02bfff] transition-all font-medium text-sm"
                                                    placeholder="ResearchGate Profile"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">Google Scholar</label>
                                                <input
                                                    type="url"
                                                    name="googleScholar"
                                                    value={formData.googleScholar}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#02bfff] transition-all font-medium text-sm"
                                                    placeholder="Scholar Profile"
                                                />
                                            </div>
                                        </div>

                                        <div className="pt-6 border-t border-gray-100 flex gap-4">
                                            <button
                                                type="submit"
                                                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[#02bfff] text-white rounded-xl hover:bg-[#0099cc] transition-all font-bold shadow-lg hover:shadow-cyan-500/25"
                                            >
                                                <Save size={18} />
                                                {editingMember ? 'Update Member' : 'Add to Team'}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={closeModal}
                                                className="px-6 py-4 bg-gray-50 text-gray-500 rounded-xl hover:bg-gray-100 transition font-bold"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
