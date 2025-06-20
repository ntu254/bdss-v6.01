import React from 'react';

const DonationHistoryList = ({ donations = [] }) => (
  <ul className="space-y-2">
    {donations.length === 0 && <li>No donations yet.</li>}
    {donations.map((d, idx) => (
      <li key={idx} className="border p-2 rounded">
        {d}
      </li>
    ))}
  </ul>
);

export default DonationHistoryList;
