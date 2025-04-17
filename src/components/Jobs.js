import React, { useState } from 'react';
import styles from './Job.module.css'; // Import the scoped CSS module

const jobsData = [
  { title: 'Software Developer', company: 'Tech Co.', location: 'New York', description: 'Develop and maintain software applications.' },
  { title: 'Product Manager', company: 'Biz Corp.', location: 'San Francisco', description: 'Lead product development and strategy.' },
  // Add more jobs
];

const JobList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const jobs = jobsData;

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles['job-list']}>
      <h2>Job Listings</h2>
      <input 
        type="text" 
        placeholder="Search by job title or company" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} 
        className="search-input"
      />
      <ul>
        {filteredJobs.map((job, index) => (
          <li key={index} className={styles['job-card']}>
            <h3>{job.title}</h3>
            <p>{job.company}</p>
            <p>{job.location}</p>
            <p>{job.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobList;
