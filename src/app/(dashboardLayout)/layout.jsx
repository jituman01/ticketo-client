"use client"
import DashboardSidebar from '@/components/DashboardSidebar';


const DashboardLayout = ({ children }) => {
 
 
  return (
    <div className='min-h-screen flex bg-[#060911]'>
      <DashboardSidebar/>

      <div className='px-6 py-10 max-w-5xl w-full'>
        {children}
      </div>

    </div>
  );
};

export default DashboardLayout;