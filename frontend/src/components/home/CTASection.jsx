import React from 'react';
import Button from '../common/Button';
import { Link } from 'react-router-dom';

const CTASection = () => (
  <section className="py-12 text-center">
    <h2 className="text-2xl font-bold mb-4">Ready to donate?</h2>
    <Button as={Link} to="/request-donation">Request Now</Button>
  </section>
);

export default CTASection;
