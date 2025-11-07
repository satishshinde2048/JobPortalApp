import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.lever.co/v0/postings/leverdemo?mode=json')
      .then(res => res.json())
      .then(data => {
        const foundJob = data.find(j => j.id === id);
        setJob(foundJob);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!job) return <div className="p-6">Job not found</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{job.text}</h1>
      <p className="text-xl font-semibold mb-2">{job.categories?.location || job.categories?.allLocations?.[0]}</p>
      <p className="mb-2">{job.descriptionPlain || job.descriptionBodyPlain}</p>
      <p className="mb-2"><strong>Team</strong>: {job.categories?.team}</p>
      <p className="mb-2"><strong>Department</strong>: {job.categories?.department}</p>
      <p className="mb-4"><strong>Workplace Type</strong>: {job.workplaceType}</p>
      <a href={job.applyUrl} target="_blank" rel="noopener noreferrer" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Apply Now
      </a>
    </div>
  );
};

export default JobDetails;
