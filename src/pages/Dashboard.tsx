import React from 'react';
import { BarChart, BriefcaseIcon, Calendar, Clock, Target } from 'lucide-react';
import useJobStore from '../store/useJobStore';
import StatCard from '../components/dashboard/StatCard';
import StatusChart from '../components/dashboard/StatusChart';
import ActivityChart from '../components/dashboard/ActivityChart';
import UpcomingDeadlines from '../components/dashboard/UpcomingDeadlines';

const Dashboard: React.FC = () => {
  const { jobs } = useJobStore();

  const totalApplications = jobs.length;
  const activeApplications = jobs.filter(job => 
    job.status !== 'rejected' && job.status !== 'accepted'
  ).length;
  const interviewCount = jobs.filter(job => job.status === 'interviewing').length;
  const offerCount = jobs.filter(job => job.status === 'offer').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Applications"
            value={totalApplications}
            icon={<BriefcaseIcon className="w-5 h-5" />}
            change={{ value: '12%', isPositive: true }}
          />
          
          <StatCard
            title="Active Applications"
            value={activeApplications}
            icon={<Target className="w-5 h-5" />}
          />
          
          <StatCard
            title="Interviews"
            value={interviewCount}
            icon={<Calendar className="w-5 h-5" />}
            change={{ value: '5%', isPositive: true }}
          />
          
          <StatCard
            title="Offers"
            value={offerCount}
            icon={<BarChart className="w-5 h-5" />}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StatusChart jobs={jobs} />
        <ActivityChart />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UpcomingDeadlines jobs={jobs} />
        
        <div className="space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <div className="flex items-start">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded text-blue-600 dark:text-blue-400 mr-4">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  Quick Tip
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Follow up on your applications 7-10 days after applying. This demonstrates 
                  your continued interest and can help your application stand out.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Application Progress
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Applied</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {jobs.filter(job => job.status === 'applied').length} jobs
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Interviews</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {interviewCount} jobs
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Offers</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {offerCount} jobs
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;