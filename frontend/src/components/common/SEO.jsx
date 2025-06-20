// components/common/SEO.jsx - SEO component for better meta tags
import { useEffect } from 'react';

const SEO = ({ 
  title = 'BloodConnect - Hệ thống quản lý hiến máu',
  description = 'Hệ thống quản lý hiến máu giúp kết nối yêu thương, góp phần cứu sống nhiều sinh mạng quý báu.',
  keywords = 'hiến máu, blood donation, cứu sinh mạng, volunteer, healthcare',
  image = '/og-image.jpg',
  url = typeof window !== 'undefined' ? window.location.href : ''
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const updateMetaTag = (name, content, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (element) {
        element.setAttribute('content', content);
      } else {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        element.setAttribute('content', content);
        document.head.appendChild(element);
      }
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:type', 'website', true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);

  }, [title, description, keywords, image, url]);

  return null; // This component doesn't render anything
};

export default SEO;
