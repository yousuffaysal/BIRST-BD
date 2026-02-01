/**
 * Image Upload Utility for ImgBB Integration
 * Handles file validation, upload to ImgBB, and error handling
 */

const IMAGE_HOSTING_KEY = import.meta.env.VITE_IMAGE_HOSTING_KEY || 'your_imgbb_key_here';
const IMGBB_API_URL = `https://api.imgbb.com/1/upload?key=${IMAGE_HOSTING_KEY}`;

// Allowed file types
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 32 * 1024 * 1024; // 32MB (ImgBB supports large files)

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
            error: `File size exceeds 32MB. Your file is ${(file.size / 1024 / 1024).toFixed(2)}MB`
        };
    }

    return { valid: true, error: null };
};

/**
 * Upload image to ImgBB
 * @param {File} file - The image file to upload
 * @param {string} folder - (Unused in simple ImgBB upload)
 * @param {Function} onProgress - Callback for upload progress (simulated for fetch)
 * @returns {Promise<Object>} - { success: boolean, url: string, error: string }
 */
export const uploadImageToImageKit = async (file, folder = 'uploads', onProgress = null) => {
    try {
        // Validate file first
        const validation = validateImageFile(file);
        if (!validation.valid) {
            return { success: false, url: null, error: validation.error };
        }

        const formData = new FormData();
        formData.append('image', file);

        // Simulate progress for better UX since fetch doesn't support it natively easily without XHR
        if (onProgress) {
            let progress = 0;
            const interval = setInterval(() => {
                progress += 10;
                if (progress > 90) clearInterval(interval);
                onProgress(Math.min(progress, 90));
            }, 100);
        }

        const response = await fetch(IMGBB_API_URL, {
            method: 'POST',
            body: formData,
        });

        if (onProgress) onProgress(100);

        const data = await response.json();

        if (data.success) {
            return {
                success: true,
                url: data.data.url,
                fileId: data.data.id,
                deleteUrl: data.data.delete_url,
                error: null
            };
        } else {
            return {
                success: false,
                url: null,
                error: data.error?.message || 'ImgBB upload failed'
            };
        }

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
