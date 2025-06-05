import React from 'react';
import { JobApplication } from '../../types';
import JobCard from './JobCard';
import { Plus } from 'lucide-react';

interface JobColumnProps {
  title: string;
  jobs: JobApplication[];
  status: JobApplication['status'];
  onEdit: (job: JobApplication) => void;
  onDelete: (id: string) => void;
  onNewJob: (status: JobApplication['status']) => void;
}

const JobColumn: React.FC<JobColumnProps> = ({ 
  title, 
  jobs, 
  status, 
  onEdit, 
  onDelete,
  onNewJob 
}) => {
  return (
    <div className="flex flex-col h-full min-w-[300px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200">{title} ({jobs.length})</h3>
        <button 
          onClick={() => onNewJob(status)}
          className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto pb-4 space-y-4">
        {jobs.map(job => (
          <JobCard 
            key={job.id} 
            job={job} 
            onEdit={onEdit} 
            onDelete={onDelete}
          />
        ))}
        {jobs.length === 0 && (
          <div className="flex flex-col items-center justify-center h-32 bg-gray-100 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400 mb-2">No jobs in this status</p>
            <button 
              onClick={() => onNewJob(status)}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Add a job
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobColumn;