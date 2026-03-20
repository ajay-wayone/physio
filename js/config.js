/**
 * Configuration File for API Endpoints
 * Update these URLs when deploying to production
 */

const CONFIG = {
    // API Base URL - Change this when moving to production
    API_BASE_URL: 'http://192.168.1.37:5019/api',
    
    // Blog API Endpoints
    BLOGS: {
        // Get all public blogs
        PUBLIC_LIST: '/blogs/public',
        // Get single blog by slug
        PUBLIC_DETAIL: '/blogs/public'
    },
    
    // Helper function to get full API URL
    getUrl: function(endpoint) {
        return this.API_BASE_URL + endpoint;
    },
    
    // Helper function to get blog list URL
    getBlogListUrl: function() {
        return this.getUrl(this.BLOGS.PUBLIC_LIST);
    },
    
    // Helper function to get blog detail URL
    getBlogDetailUrl: function(slug) {
        return this.getUrl(this.BLOGS.PUBLIC_DETAIL) + '/' + slug;
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
