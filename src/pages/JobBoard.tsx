import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import useJobStore from '../store/useJobStore';
import JobColumn from '../components/jobs/JobColumn';
import JobModal from '../components/jobs/JobModal';
import Button from '../components/ui/Button';
import { JobApplication, JobStatus } from '../types';

const JobBoard: React.FC = () => {
  const { jobs, addJob, updateJob, deleteJob, isLoading } = useJobStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobApplication | undefined>(undefined);
  const [defaultStatus, setDefaultStatus] = useState<JobStatus | undefined>(undefined);

  const openNewJobModal = (status?: JobStatus) => {
    setEditingJob(undefined);
    setDefaultStatus(status);
    setIsModalOpen(true);
  };

  const openEditJobModal = (job: JobApplication) => {
    setEditingJob(job);
    setDefaultStatus(undefined);
    setIsModalOpen(true);
  };

  const handleJobSubmit = async (jobData: Omit<JobApplication, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingJob) {
      await updateJob(editingJob.id, jobData);
    } else {
      await addJob(jobData);
    }
    setIsModalOpen(false);
  };

  const handleDeleteJob = async (id: string) => {
    if (confirm('Are you sure you want to delete this job application?')) {
      await deleteJob(id);
    }
  };

  const columnsData = [
    { title: 'Saved', status: 'saved' as JobStatus },
    { title: 'Applied', status: 'applied' as JobStatus },
    { title: 'Interviewing', status: 'interviewing' as JobStatus },
    { title: 'Offer', status: 'offer' as JobStatus },
    { title: 'Rejected', status: 'rejected' as JobStatus },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Job Board</h1>
        <Button 
          onClick={() => openNewJobModal()}
          className="flex items-center"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Job
        </Button>
      </div>
      
      <div className="flex overflow-x-auto pb-4 space-x-6">
        {columnsData.map((column) => (
          <JobColumn
            key={column.status}
            title={column.title}
            status={column.status}
            jobs={jobs.filter(job => job.status === column.status)}
            onEdit={openEditJobModal}
            onDelete={handleDeleteJob}
            onNewJob={openNewJobModal}
          />
        ))}
      </div>
      
      <JobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleJobSubmit}
        initialData={editingJob}
        isLoading={isLoading}
        defaultStatus={defaultStatus}
      />
    </div>
  );
};

export default JobBoard;