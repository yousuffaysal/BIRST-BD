import React, { useState, useRef } from 'react';
import { Upload, X, Loader, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';
import { uploadImageToImageKit } from '../../utils/imageUpload';

/**
 * ImageUpload Component
 * Provides drag-and-drop and click-to-upload functionality with URL fallback
 * 
 * @param {string} value - Current image URL
 * @param {Function} onChange - Callback when image URL changes
 * @param {string} folder - ImageKit folder path (e.g., 'courses', 'events')
 * @param {string} label - Label for the input
 * @param {boolean} required - Whether the field is required
 */
export default function ImageUpload({ value, onChange, folder = 'uploads', label = 'Image', required = false }) {
    const [uploadMode, setUploadMode] = useState('upload'); // 'upload' or 'url'
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [dragActive, setDragActive] = useState(false);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const files = e.dataTransfer.files;
        if (files && files[0]) {
            await handleFileUpload(files[0]);
        }
    };

    const handleFileSelect = async (e) => {
        const files = e.target.files;
        if (files && files[0]) {
            await handleFileUpload(files[0]);
        }
    };

    const handleFileUpload = async (file) => {
        setError(null);
        setUploading(true);
        setUploadProgress(0);

        const result = await uploadImageToImageKit(file, folder, (progress) => {
            setUploadProgress(progress);
        });

        setUploading(false);

        if (result.success) {
            onChange(result.url);
            setUploadProgress(100);
            setTimeout(() => setUploadProgress(0), 1000);
        } else {
            setError(result.error);
        }
    };

    const handleRemoveImage = () => {
        onChange('');
        setError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-gray-700">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>

                {/* Toggle between Upload and URL */}
                <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
                    <button
                        type="button"
                        onClick={() => setUploadMode('upload')}
                        className={`px-3 py-1 text-xs font-bold rounded transition-all ${uploadMode === 'upload'
                            ? 'bg-white text-[#02bfff] shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <Upload className="w-3 h-3 inline mr-1" />
                        Upload
                    </button>
                    <button
                        type="button"
                        onClick={() => setUploadMode('url')}
                        className={`px-3 py-1 text-xs font-bold rounded transition-all ${uploadMode === 'url'
                            ? 'bg-white text-[#02bfff] shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <LinkIcon className="w-3 h-3 inline mr-1" />
                        URL
                    </button>
                </div>
            </div>

            {uploadMode === 'upload' ? (
                <>
                    {/* Upload Area */}
                    <div
                        className={`relative border-2 border-dashed rounded-xl transition-all ${dragActive
                            ? 'border-[#02bfff] bg-blue-50'
                            : value
                                ? 'border-green-300 bg-green-50'
                                : 'border-gray-300 hover:border-gray-400 bg-gray-50'
                            }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/jpeg,image/jpg,image/png,image/webp"
                            onChange={handleFileSelect}
                            className="hidden"
                            disabled={uploading}
                        />

                        {!value ? (
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={uploading}
                                className="w-full p-8 text-center focus:outline-none focus:ring-2 focus:ring-[#02bfff] rounded-xl disabled:opacity-50"
                            >
                                {uploading ? (
                                    <div className="flex flex-col items-center gap-3">
                                        <Loader className="w-10 h-10 text-[#02bfff] animate-spin" />
                                        <div className="w-full max-w-xs">
                                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-[#02bfff] transition-all duration-300"
                                                    style={{ width: `${uploadProgress}%` }}
                                                />
                                            </div>
                                            <p className="text-sm text-gray-600 mt-2">Uploading... {uploadProgress}%</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                                            <Upload className="w-6 h-6 text-gray-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-700">
                                                {dragActive ? 'Drop image here' : 'Click to upload or drag and drop'}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                JPG, PNG or WEBP (max 5MB)
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </button>
                        ) : (
                            <div className="relative p-4">
                                <img
                                    src={value}
                                    alt="Preview"
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="absolute top-6 right-6 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                                <div className="absolute bottom-6 left-6 px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                                    <ImageIcon className="w-3 h-3" />
                                    Uploaded
                                </div>
                            </div>
                        )}
                    </div>

                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-600 font-medium">{error}</p>
                        </div>
                    )}
                </>
            ) : (
                <>
                    {/* URL Input */}
                    <input
                        type="url"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#02bfff]/20 focus:border-[#02bfff] outline-none transition-all font-medium"
                    />
                    {value && (
                        <div className="mt-2 h-32 w-48 rounded-xl overflow-hidden border border-gray-200">
                            <img src={value} className="w-full h-full object-cover" alt="Preview" />
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
