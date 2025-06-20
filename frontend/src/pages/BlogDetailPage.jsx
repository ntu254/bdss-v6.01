// src/pages/BlogDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import blogService from '../services/blogService';
// import { mockBlogPosts } from '../mocks/handlers/blogHandlers';
import NotFoundPage from './NotFoundPage';

const BlogDetailPage = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    // const post = mockBlogPosts.find(p => p.slug === slug);
    // const { data: post, isLoading, isError } = useQuery(['blogPost', slug], () => blogService.getPostBySlug(slug));

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await blogService.getPostById(slug);
                setPost(response.data);
            } catch (error) {
                console.error('Failed to fetch post:', error);
            }
        };

        fetchPost();
    }, [slug]);

    if (!post) {
        return <NotFoundPage />;
    }

    return (
        <div className="bg-white py-12 sm:py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
                <div className="mb-8">
                    <Link to="/blog" className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-800">
                        <ArrowLeft size={16} className="mr-2" />
                        Quay lại trang Blog
                    </Link>
                </div>

                <article>
                    <header className="mb-8">
                        <p className="text-base font-semibold text-red-600 uppercase tracking-wider">{post.category}</p>
                        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            {post.title}
                        </h1>
                        <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                                <User size={14} className="mr-1.5" />
                                <span>{post.author}</span>
                            </div>
                            <span className="text-gray-300">|</span>
                            <div className="flex items-center">
                                <Calendar size={14} className="mr-1.5" />
                                <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('vi-VN')}</time>
                            </div>
                            <span className="text-gray-300">|</span>
                            <div className="flex items-center">
                                <Clock size={14} className="mr-1.5" />
                                <span>{post.readTime}</span>
                            </div>
                        </div>
                    </header>

                    <img src={post.imageUrl || 'https://via.placeholder.com/800x400/fef2f2/dc2626?text=BloodConnect'} alt={post.title} className="w-full rounded-lg shadow-lg mb-8" />

                    {/* Render nội dung HTML của bài viết */}
                    <div
                        className="prose prose-lg prose-red max-w-none"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </article>
            </div>
        </div>
    );
};

export default BlogDetailPage;

// Chỉ import mock trong development
if (import.meta.env.DEV) {
  // Trong môi trường dev, các mock sẽ được xử lý qua service worker
  // Không cần import trực tiếp ở đây
}