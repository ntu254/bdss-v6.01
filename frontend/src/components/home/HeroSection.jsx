import React from 'react';
import Button from '../common/Button';
import { Link } from 'react-router-dom';

const HeroSection = () => (
  <section className="text-center py-20 bg-red-600 text-white">
    <h1 className="text-4xl font-bold mb-4">Welcome to BloodConnect</h1>
    <p className="mb-6">Join us to save lives through blood donation.</p>
    <Button as={Link} to="/register">Get Started</Button>
  </section>
);

export default HeroSection;
