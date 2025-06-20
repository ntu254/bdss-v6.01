import React from 'react';

const FeaturesSection = () => (
  <section className="py-12">
    <h2 className="text-2xl font-bold mb-4 text-center">Features</h2>
    <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <li className="p-4 bg-white rounded shadow">Easy to register</li>
      <li className="p-4 bg-white rounded shadow">Find nearby donations</li>
      <li className="p-4 bg-white rounded shadow">Track your history</li>
    </ul>
  </section>
);

export default FeaturesSection;
