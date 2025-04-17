import React, { useState } from 'react';
import styles from './CourseList.module.css'; // Import the scoped CSS module

const coursesData = [
  { name: 'Computer Science 101', code: 'CS101', department: 'CS', year: 2020, instructor: 'Dr. Smith', status: 'Completed' },
  { name: 'Introduction to Marketing', code: 'MKT101', department: 'Marketing', year: 2021, instructor: 'Prof. Johnson', status: 'Completed' },
  // Add more courses
];

const CourseList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  
  const courses = coursesData;

  const filteredCourses = courses.filter(course => 
    (course.name.toLowerCase().includes(searchTerm.toLowerCase()) || course.code.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filter === 'All' || course.status === filter)
  );

  return (
    <div className={styles['course-list']}>
      <h2>Course List</h2>
      <div>
        <input 
          type="text" 
          placeholder="Search by course name or code" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
          className={styles['search-input']}
        />
        <select onChange={(e) => setFilter(e.target.value)} className={styles['filter-select']}>
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Ongoing">Ongoing</option>
        </select>
      </div>
      <ul>
        {filteredCourses.map(course => (
          <li key={course.code} className={styles['course-card']}>
            <h3>{course.name} ({course.code})</h3>
            <p>Department: {course.department}</p>
            <p>Instructor: {course.instructor}</p>
            <p>Status: {course.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;
