const getOptimizedUrl = (file) => {
    if (!file) return '';
    if (file.path.startsWith('http')) {
        return file.path; // Cloudinary URL
    }
    // Local file: normalize path separator and prepend server origin
    // Assuming file.path is like 'uploads\filename' or 'uploads/filename'
    const normalizedPath = file.path.replace(/\\/g, '/');
    return `http://localhost:5000/${normalizedPath}`;
};

module.exports = { getOptimizedUrl };
