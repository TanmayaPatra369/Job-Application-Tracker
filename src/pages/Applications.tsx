import React, { useState } from 'react';
import { Plus, Search, SortAsc, SortDesc, CalendarClock } from 'lucide-react';
import { format } from 'date-fns';
import useJobStore from '../store/useJobStore';
import { Card } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Badge from '../components/ui/Badge';
import JobModal from '../components/jobs/JobModal';
import { JobApplication, JobStatus } from '../types';

const Applications: React.FC = () => {
  const { jobs, addJob, updateJob, deleteJob, isLoading } = useJobStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobApplication | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('updatedAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const openNewJobModal = () => {
    setEditingJob(undefined);
    setIsModalOpen(true);
  };

  const openEditJobModal = (job: JobApplication) => {
    setEditingJob(job);
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

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const getStatusBadgeVariant = (status: JobStatus): 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' => {
    switch (status) {
      case 'applied':
        return 'primary';
      case 'interviewing':
        return 'warning';
      case 'offer':
        return 'success';
      case 'rejected':
        return 'danger';
      case 'accepted':
        return 'success';
      default:
        return 'default';
    }
  };

  const filteredJobs = jobs
    .filter(job => {
      const matchesSearchTerm = 
        job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        job.position.toLowerCase().includes(searchTerm.toLowerCase());
        
      const matchesStatusFilter = statusFilter === 'all' || job.status === statusFilter;
      
      return matchesSearchTerm && matchesStatusFilter;
    })
    .sort((a, b) => {
      if (sortBy === 'companyName') {
        return sortOrder === 'asc' 
          ? a.companyName.localeCompare(b.companyName)
          : b.companyName.localeCompare(a.companyName);
      }
      
      if (sortBy === 'position') {
        return sortOrder === 'asc'
          ? a.position.localeCompare(b.position)
          : b.position.localeCompare(a.position);
      }
      
      // Default sort by date
      const dateA = new Date(a[sortBy as 'createdAt' | 'updatedAt']).getTime();
      const dateB = new Date(b[sortBy as 'createdAt' | 'updatedAt']).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Applications</h1>
        <Button 
          onClick={openNewJobModal}
          className="flex items-center"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Job
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-1/3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search company or position..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="w-full sm:w-1/3">
          <Select
            options={[
              { value: 'all', label: 'All Statuses' },
              { value: 'saved', label: 'Saved' },
              { value: 'applied', label: 'Applied' },
              { value: 'interviewing', label: 'Interviewing' },
              { value: 'offer', label: 'Offer' },
              { value: 'rejected', label: 'Rejected' },
              { value: 'accepted', label: 'Accepted' },
            ]}
            value={statusFilter}
            onChange={setStatusFilter}
          />
        </div>
        
        <div className="w-full sm:w-1/3 flex">
          <Select
            options={[
              { value: 'updatedAt', label: 'Last Updated' },
              { value: 'createdAt', label: 'Date Added' },
              { value: 'companyName', label: 'Company' },
              { value: 'position', label: 'Position' },
            ]}
            value={sortBy}
            onChange={setSortBy}
            className="flex-1"
          />
          <Button
            variant="ghost"
            onClick={toggleSortOrder}
            className="ml-2"
            aria-label={`Sort ${sortOrder === 'asc' ? 'ascending' : 'descending'}`}
          >
            {sortOrder === 'asc' ? <SortAsc className="h-5 w-5" /> : <SortDesc className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      <div className="space-y-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map(job => (
            <Card key={job.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row justify-between">
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                    <h2 className="text-lg font-semibold">{job.position}</h2>
                    <span className="text-gray-500 dark:text-gray-400 hidden sm:inline">•</span>
                    <p className="text-base text-gray-700 dark:text-gray-300">{job.companyName}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant={getStatusBadgeVariant(job.status)}>
                      {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                    </Badge>
                    
                    {job.priority && (
                      <Badge variant={job.priority === 'high' ? 'danger' : job.priority === 'medium' ? 'warning' : 'default'}>
                        {job.priority} priority
                      </Badge>
                    )}
                    
                    {job.jobType && (
                      <Badge variant="secondary">
                        {job.jobType.replace('-', ' ')}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center">
                      <CalendarClock className="h-4 w-4 mr-1" />
                      <span>Applied: {job.createdAt ? format(new Date(job.createdAt), 'MMM d, yyyy') : 'N/A'}</span>
                    </div>
                    
                    {job.location && (
                      <div className="flex items-center">
                        <span>Location: {job.location}</span>
                      </div>
                    )}
                    
                    {job.salary && (
                      <div className="flex items-center">
                        <span>Salary: {job.salary}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4 sm:mt-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditJobModal(job)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-900 dark:hover:bg-red-900/20"
                    onClick={() => handleDeleteJob(job.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg p-10 border-2 border-dashed border-gray-300 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400 mb-4">No job applications found</p>
            <Button onClick={openNewJobModal}>Add Your First Job</Button>
          </div>
        )}
      </div>
      
      <JobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleJobSubmit}
        initialData={editingJob}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Applications;