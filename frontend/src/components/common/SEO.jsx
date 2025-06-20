import { useEffect } from 'react';

const SEO = ({ title, description }) => {
  useEffect(() => {
    if (title) document.title = title;
  }, [title]);

  return null;
};

export default SEO;
