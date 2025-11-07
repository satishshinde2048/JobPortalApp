import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ApplicationList = () => {
  const applications = useSelector(state => state.application.applications);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Submitted Applications</h2>
      {applications.length === 0 ? (
        <p>No applications submitted yet.</p>
      ) : (
        <ul className="space-y-4">
          {applications.map(app => (
            <li key={app.id} className="border p-4 rounded shadow">
              <p><strong>Job ID:</strong> {app.jobId}</p>
              <p><strong>Name:</strong> {app.applicantName}</p>
              <p><strong>Summary:</strong> {app.skills.join(', ')}</p>
              <Link
                to={`/applications/${app.id}`}
                className="text-blue-600 underline mt-2 inline-block"
              >
                View Details
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ApplicationList;
