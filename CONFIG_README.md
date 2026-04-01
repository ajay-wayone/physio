# Configuration Guide

## API Configuration

All API endpoints are centralized in a single configuration file for easy management across development and production environments.

### Location
`js/config.js`

### How to Update URLs

When deploying to production or changing environments, update the `API_BASE_URL` in `js/config.js`:

#### Current Configuration (Development)
```javascript
const CONFIG = {
    API_BASE_URL: 'http://192.168.1.37:5019/api',
    // ... rest of config
};
```

#### For Production
Simply change the `API_BASE_URL` to your production domain:
```javascript
const CONFIG = {
    API_BASE_URL: 'https://your-production-domain.com/api',
    // ... rest of config
};
```

### Files Using Configuration
- `blogs.html` - Uses `CONFIG.getBlogListUrl()` to fetch all blogs
- `blog-detail.html` - Uses `CONFIG.getBlogDetailUrl(slug)` to fetch individual blog

### API Endpoints Configured

1. **Blog List Endpoint**
   - Path: `/blogs/publicApi`
   - Full URL: `{API_BASE_URL}/blogs/publicApi`
   - Used in: `blogs.html`

2. **Blog Detail Endpoint**
   - Path: `/blogs/public/{slug}`
   - Full URL: `{API_BASE_URL}/blogs/public/{slug}`
   - Used in: `blog-detail.html`

### Example Scenarios

**Development (Local)**
```javascript
API_BASE_URL: 'http://192.168.1.37:5019/api'
```

**Staging**
```javascript
API_BASE_URL: 'https://staging-api.myphysio.com/api'
```

**Production**
```javascript
API_BASE_URL: 'https://api.myphysio.com/api'
```

### Adding New Endpoints

To add new API endpoints, follow this pattern in `js/config.js`:

```javascript
const CONFIG = {
    API_BASE_URL: 'http://192.168.1.37:5019/api',
    
    BLOGS: {
        PUBLIC_LIST: '/blogs/publicApi',
        PUBLIC_DETAIL: '/blogs/public'
    },
    
    // Add new endpoints here
    APPOINTMENTS: {
        LIST: '/appointments',
        CREATE: '/appointments/create'
    },
    
    // Helper methods
    getUrl: function(endpoint) {
        return this.API_BASE_URL + endpoint;
    },
    
    getAppointmentUrl: function() {
        return this.getUrl(this.APPOINTMENTS.LIST);
    }
};
```

Then use it in your HTML files:
```javascript
const appointmentUrl = CONFIG.getAppointmentUrl();
```


