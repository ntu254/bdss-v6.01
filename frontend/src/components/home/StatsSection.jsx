import React from 'react';

const StatsSection = () => (
  <section className="py-12 bg-gray-50 text-center">
    <h2 className="text-2xl font-bold mb-4">Our Impact</h2>
    <div className="flex justify-center space-x-8">
      <div>
        <p className="text-3xl font-bold">1000+</p>
        <p>Donors</p>
      </div>
      <div>
        <p className="text-3xl font-bold">500+</p>
        <p>Requests</p>
      </div>
    </div>
  </section>
);

export default StatsSection;
