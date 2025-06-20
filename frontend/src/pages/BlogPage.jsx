// src/pages/BlogPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { BookOpen } from 'lucide-react';

import LoadingSpinner from '../components/common/LoadingSpinner';
import Pagination from '../components/common/Pagination';
import SearchBar from '../components/common/SearchBar';
import BlogPostCard from '../components/blog/BlogPostCard'; // Component mới
import blogService from '../services/blogService'; // Service mới sẽ được tạo

const BlogPage = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const pageSize = 6; // Số bài viết mỗi trang

    const fetchPosts = useCallback(async (page, search) => {
        setIsLoading(true);
        try {
            const response = await blogService.getPosts(page, pageSize, search);
            setPosts(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            toast.error("Không thể tải danh sách bài viết.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPosts(currentPage, searchTerm);
    }, [currentPage, searchTerm, fetchPosts]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearch = (term) => {
        setCurrentPage(0);
        setSearchTerm(term);
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8 pt-24">
                {/* Header */}
                <div className="text-center mb-12">
                    <BookOpen className="mx-auto h-12 w-12 text-red-600 mb-4" />
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Blog</h1>
                    <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500">
                        Các bài viết, câu chuyện và tài nguyên về hiến máu.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="mb-10 flex justify-center">
                    <SearchBar onSearch={handleSearch} placeholder="Tìm kiếm bài viết..." />
                </div>

                {/* Blog Grid */}
                {isLoading ? (
                    <div className="flex justify-center py-20"><LoadingSpinner size="12" /></div>
                ) : posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map(post => (
                            <BlogPostCard key={post.id} post={post} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <h3 className="text-xl font-semibold">Không tìm thấy bài viết nào.</h3>
                        <p className="text-gray-500 mt-2">Vui lòng thử lại với từ khóa khác.</p>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-12 flex justify-center">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                            isLoading={isLoading}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogPage;