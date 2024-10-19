import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";

function Courses() {
  const navigate = useNavigate();
  const location = useLocation();

  // Course list with title and path for dynamic rendering
  const courseList = [
    { title: "JavaScript", path: "javascript" },
    { title: "React.js", path: "react-js" },
    { title: "HTML", path: "html" },
    { title: "Tailwind CSS", path: "tailwind-css" },
  ];

  // Handle Click for navigation based on selected course path
  const handleNavigation = (path) => {
    navigate(`/courses/${path}`);
  }

  // Set title based on current URL path
  const getTitle = () => {
    const currentCourse = courseList.find((course) => location.pathname.includes(course.path));
    return currentCourse ? `${currentCourse.title} Course` : "Select a Course";
  }

  return (
    <div className='text-center w-full flex-col justify-center items-center'>

      {/* Dynamically Render Buttons */}
      <div className='mb-8'>
        {courseList.map((course, index) => (
          <button 
            key={index} 
            onClick={() => handleNavigation(course.path)}
            className={`m-2 p-2 rounded-lg text-white transition duration-300 ${
              index % 2 === 0 ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {course.title}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Courses;
