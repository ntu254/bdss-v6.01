// services/blogService.js - Blog management services
import api from './api';

export const blogService = {
  // Member: Create new blog post
  createBlogPost: async (blogData) => {
    const response = await api.post('/api/blog-posts', blogData);
    return response.data;
  },

  // Public: Get published blog posts (with pagination)
  getPublishedBlogPosts: async (page = 0, size = 10) => {
    const response = await api.get('/api/blog-posts', {
      params: { page, size }
    });
    return response.data; // Returns Page<BlogPostResponse>
  },

  // Public: Get all published blog posts (without pagination)
  getAllPublishedBlogPosts: async () => {
    const response = await api.get('/api/blog-posts', {
      params: { page: 0, size: 1000 }
    });
    return response.data.content; // Extract content array from Page
  },

  // Staff: Get pending blog posts (with pagination)
  getPendingBlogPosts: async (page = 0, size = 10) => {
    const response = await api.get('/api/blog-posts/pending', {
      params: { page, size }
    });
    return response.data; // Returns Page<BlogPostResponse>
  },

  // Staff: Approve blog post
  approveBlogPost: async (blogId) => {
    const response = await api.put(`/api/blog-posts/${blogId}/approve`);
    return response.data;
  },

  // Member: Get my blog posts (with pagination)
  getMyBlogPosts: async (page = 0, size = 10) => {
    const response = await api.get('/api/blog-posts/my-posts', {
      params: { page, size }
    });
    return response.data; // Returns Page<BlogPostResponse>
  },

  // Public: Get blog post by ID
  getBlogPostById: async (blogId) => {
    const response = await api.get(`/api/blog-posts/${blogId}`);
    return response.data;
  },
  // Member/Staff: Update blog post
  updateBlogPost: async (blogId, blogData) => {
    const response = await api.put(`/api/blog-posts/${blogId}`, blogData);
    return response.data;
  },
  // Member/Admin: Delete blog post
  deleteBlogPost: async (blogId) => {
    const response = await api.delete(`/api/blog-posts/${blogId}`);
    return response.data;
  },

  // Admin: Get all blog posts (including all statuses)
  getAllBlogs: async () => {
    const response = await api.get('/api/admin/blog-posts');
    return response.data;
  },

  // Admin/Staff: Update blog status with reason
  updateBlogStatus: async (blogId, status, reason = '') => {    const response = await api.put(`/api/blog-posts/${blogId}/status`, { status, reason });
    return response.data;
  }
};

export default blogService;
