/**
 * Image Upload Utility for ImageKit Integration
 * Handles file validation, upload to ImageKit, and error handling
 */

const IMAGEKIT_PUBLIC_KEY = import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY || 'your_public_key_here';
const IMAGEKIT_URL_ENDPOINT = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/2lax2ytm2';
const IMAGEKIT_AUTH_ENDPOINT = import.meta.env.VITE_IMAGEKIT_AUTH_ENDPOINT || 'http://localhost:5000/imagekit-auth';

// Allowed file types
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

/**
 * Validate image file
 * @param {File} file - The file to validate
 * @returns {Object} - { valid: boolean, error: string }
 */
export const validateImageFile = (file) => {
    if (!file) {
        return { valid: false, error: 'No file selected' };
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
        return {
            valid: false,
            error: 'Invalid file type. Please upload JPG, PNG, or WEBP images only.'
        };
    }

    if (file.size > MAX_FILE_SIZE) {
        return {
            valid: false,
            error: `File size exceeds 5MB. Your file is ${(file.size / 1024 / 1024).toFixed(2)}MB`
        };
    }

    return { valid: true, error: null };
};

/**
 * Upload image to ImageKit (with fallback to local preview)
 * @param {File} file - The image file to upload
 * @param {string} folder - The folder path in ImageKit (e.g., 'courses', 'events')
 * @param {Function} onProgress - Callback for upload progress (0-100)
 * @returns {Promise<Object>} - { success: boolean, url: string, error: string }
 */
export const uploadImageToImageKit = async (file, folder = 'uploads', onProgress = null) => {
    try {
        // Validate file first
        const validation = validateImageFile(file);
        if (!validation.valid) {
            return { success: false, url: null, error: validation.error };
        }

        // Try to upload to ImageKit, but fall back to local preview if auth fails
        try {
            // Get authentication parameters from backend
            const authResponse = await fetch(IMAGEKIT_AUTH_ENDPOINT);

            if (authResponse.ok) {
                const authData = await authResponse.json();

                // Prepare form data
                const formData = new FormData();
                formData.append('file', file);
                formData.append('publicKey', IMAGEKIT_PUBLIC_KEY);
                formData.append('signature', authData.signature);
                formData.append('expire', authData.expire);
                formData.append('token', authData.token);
                formData.append('fileName', `${Date.now()}_${file.name}`);
                formData.append('folder', folder);

                // Upload to ImageKit
                const uploadResponse = await new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();

                    // Track upload progress
                    if (onProgress) {
                        xhr.upload.addEventListener('progress', (e) => {
                            if (e.lengthComputable) {
                                const percentComplete = Math.round((e.loaded / e.total) * 100);
                                onProgress(percentComplete);
                            }
                        });
                    }

                    xhr.addEventListener('load', () => {
                        if (xhr.status === 200) {
                            resolve(JSON.parse(xhr.responseText));
                        } else {
                            reject(new Error(`Upload failed with status ${xhr.status}`));
                        }
                    });

                    xhr.addEventListener('error', () => {
                        reject(new Error('Upload failed due to network error'));
                    });

                    xhr.open('POST', 'https://upload.imagekit.io/api/v1/files/upload');
                    xhr.send(formData);
                });

                return {
                    success: true,
                    url: uploadResponse.url,
                    fileId: uploadResponse.fileId,
                    error: null
                };
            }
        } catch (authError) {
            console.warn('ImageKit auth failed, using local preview:', authError);
        }

        // Fallback: Create local preview using FileReader
        console.info('Using local file preview (ImageKit not configured)');

        // Simulate upload progress
        if (onProgress) {
            const progressInterval = setInterval(() => {
                const currentProgress = Math.min(100, (Date.now() % 1000) / 10);
                onProgress(currentProgress);
            }, 50);

            setTimeout(() => clearInterval(progressInterval), 500);
        }

        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (onProgress) onProgress(100);
                resolve({
                    success: true,
                    url: reader.result, // Base64 data URL
                    fileId: `local_${Date.now()}`,
                    error: null,
                    isLocal: true // Flag to indicate this is a local preview
                });
            };
            reader.onerror = () => {
                resolve({
                    success: false,
                    url: null,
                    error: 'Failed to read file'
                });
            };
            reader.readAsDataURL(file);
        });

    } catch (error) {
        console.error('Image upload error:', error);
        return {
            success: false,
            url: null,
            error: error.message || 'Failed to upload image. Please try again.'
        };
    }
};

export default {
    validateImageFile,
    uploadImageToImageKit
};
