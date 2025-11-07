import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ApplicationSummary = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const application = useSelector((state) =>
    state.application.applications.find((app) => app.id === id)
  );

  if (!application) {
    return <div className="p-6">Application not found.</div>;
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Application Summary</h2>
      <p><strong>Job ID:</strong> {application.jobId}</p>
      <p><strong>Applicant Name:</strong> {application.applicantName}</p>
      <p><strong>Experience:</strong> {application.experience} years</p>
      <p><strong>Skills:</strong> {application.skills.join(', ')}</p>
      <p><strong>Cover Letter:</strong> {application.coverLetter}</p>
      <p><strong>Preferred Start Date:</strong> {application.startDate}</p>

      <button
        onClick={() => navigate(`/apply/${application.jobId}`)}
        className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
      >
        Edit Application
      </button>
    </div>
  );
};

export default ApplicationSummary;
