import React from 'react';
import { Link } from 'react-router-dom';

const BlogPostCard = ({ post }) => (
  <article className="border rounded p-4">
    <h3 className="font-bold text-lg">
      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
    </h3>
    <p className="text-sm text-gray-600">{post.excerpt}</p>
  </article>
);

export default BlogPostCard;
