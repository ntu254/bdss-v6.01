// src/components/blog/BlogPostCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { Badge } from '../ui/Badge';

const categoryColors = {
    Education: 'info',
    Medical: 'primary',
    Tips: 'success',
    Myths: 'warning',
    Health: 'default',
};

const BlogPostCard = ({ post }) => {
    return (
        <div className="bg-white rounded-lg shadow-soft overflow-hidden transition-transform duration-300 hover:-translate-y-2 flex flex-col">
            <Link to={`/blog/${post.slug}`} className="block">
                <img
                    src={post.imageUrl || 'https://via.placeholder.com/400x250/fef2f2/dc2626?text=BloodConnect'}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                />
            </Link>
            <div className="p-6 flex-grow flex flex-col">
                <div className="mb-3">
                    <Badge variant={categoryColors[post.category] || 'default'}>
                        {post.category}
                    </Badge>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 flex-grow">
                    <Link to={`/blog/${post.slug}`} className="hover:text-red-600 transition-colors">
                        {post.title}
                    </Link>
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {post.excerpt}
                </p>

                <div className="text-xs text-gray-500 space-y-2 mt-auto">
                    <div className="flex items-center">
                        <User size={14} className="mr-1.5" />
                        <span>{post.author}</span>
                    </div>
                    <div className="flex items-center">
                        <Calendar size={14} className="mr-1.5" />
                        <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('vi-VN')}</time>
                        <span className="mx-1.5">•</span>
                        <Clock size={14} className="mr-1.5" />
                        <span>{post.readTime}</span>
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                    <Link to={`/blog/${post.slug}`} className="text-sm font-semibold text-red-600 hover:text-red-700 flex items-center group">
                        Read More
                        <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BlogPostCard;