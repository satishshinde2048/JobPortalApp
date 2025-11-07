import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.lever.co/v0/postings/leverdemo?mode=json')
      .then(res => res.json())
      .then(data => {
        setJobs(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading jobs...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Available Jobs</h1>
      <div className="space-y-4">
        {jobs.map(job => (
          <div key={job.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{job.text}</h2>
            <p className="text-gray-700">{job.categories?.location || job.categories?.allLocations?.[0]}</p>
            <p className="mt-2">{job.descriptionPlain || job.descriptionBodyPlain}</p>
            <Link to={`/job/${job.id}`} className="text-blue-600 underline mt-2 inline-block">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
