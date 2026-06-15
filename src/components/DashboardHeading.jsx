import React from 'react';

const DashboardHeading = ({title,description}) => {
  return (
    <div>
      <div  className='border-b border-white/6 pb-5'>
        <h1 className='text-3xl font-extrabold text-white'>{title}</h1>
        <p>{ description}</p>
      </div>
    </div>
  );
};

export default DashboardHeading;