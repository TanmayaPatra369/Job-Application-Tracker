import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { JobApplication, JobStatus, JobType } from '../../types';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Select from '../ui/Select';
import Button from '../ui/Button';

interface JobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (jobData: Omit<JobApplication, 'id' | 'createdAt' | 'updatedAt'>) => void;
  initialData?: JobApplication;
  isLoading?: boolean;
  defaultStatus?: JobStatus;
}

const jobStatusOptions = [
  { value: 'saved', label: 'Saved' },
  { value: 'applied', label: 'Applied' },
  { value: 'interviewing', label: 'Interviewing' },
  { value: 'offer', label: 'Offer' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'accepted', label: 'Accepted' },
];

const jobTypeOptions = [
  { value: 'full-time', label: 'Full Time' },
  { value: 'part-time', label: 'Part Time' },
  { value: 'contract', label: 'Contract' },
  { value: 'freelance', label: 'Freelance' },
  { value: 'internship', label: 'Internship' },
];

const priorityOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

const initialJobState: Omit<JobApplication, 'id' | 'createdAt' | 'updatedAt'> = {
  companyName: '',
  position: '',
  applicationLink: '',
  jobType: 'full-time',
  salary: '',
  status: 'saved',
  notes: '',
  priority: 'medium',
  deadline: '',
  followUpDate: '',
  location: '',
  contactName: '',
  contactEmail: '',
  tags: [],
};

const JobModal: React.FC<JobModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading = false,
  defaultStatus,
}) => {
  const [formData, setFormData] = useState<Omit<JobApplication, 'id' | 'createdAt' | 'updatedAt'>>(initialJobState);
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        companyName: initialData.companyName,
        position: initialData.position,
        applicationLink: initialData.applicationLink || '',
        jobType: initialData.jobType,
        salary: initialData.salary || '',
        status: initialData.status,
        notes: initialData.notes || '',
        priority: initialData.priority,
        deadline: initialData.deadline || '',
        followUpDate: initialData.followUpDate || '',
        location: initialData.location || '',
        contactName: initialData.contactName || '',
        contactEmail: initialData.contactEmail || '',
        tags: initialData.tags || [],
      });
    } else if (defaultStatus) {
      setFormData({
        ...initialJobState,
        status: defaultStatus
      });
    } else {
      setFormData(initialJobState);
    }
  }, [initialData, isOpen, defaultStatus]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addTag = () => {
    if (tagInput && !formData.tags?.includes(tagInput)) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), tagInput]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {initialData ? 'Edit Job Application' : 'Add New Job Application'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Company Name"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
            
            <Input
              label="Position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
            />
            
            <Input
              label="Application Link"
              name="applicationLink"
              type="url"
              value={formData.applicationLink}
              onChange={handleChange}
            />
            
            <Select
              label="Job Type"
              options={jobTypeOptions}
              value={formData.jobType}
              onChange={handleSelectChange('jobType')}
            />
            
            <Input
              label="Salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="e.g. $70,000 - $90,000"
            />
            
            <Select
              label="Status"
              options={jobStatusOptions}
              value={formData.status}
              onChange={handleSelectChange('status')}
            />
            
            <Select
              label="Priority"
              options={priorityOptions}
              value={formData.priority}
              onChange={handleSelectChange('priority')}
            />
            
            <Input
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
            
            <Input
              label="Contact Name"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
            />
            
            <Input
              label="Contact Email"
              name="contactEmail"
              type="email"
              value={formData.contactEmail}
              onChange={handleChange}
            />
            
            <Input
              label="Deadline"
              name="deadline"
              type="date"
              value={formData.deadline}
              onChange={handleChange}
            />
            
            <Input
              label="Follow-up Date"
              name="followUpDate"
              type="date"
              value={formData.followUpDate}
              onChange={handleChange}
            />
            
            <div className="col-span-1 md:col-span-2">
              <TextArea
                label="Notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
              />
            </div>
            
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.tags?.map(tag => (
                  <div 
                    key={tag} 
                    className="flex items-center bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-2 py-1 rounded text-sm"
                  >
                    {tag}
                    <button 
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Add a tag"
                  className="flex-1"
                />
                <Button 
                  type="button"
                  onClick={addTag}
                  className="ml-2"
                >
                  Add
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6 space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={isLoading}
            >
              {initialData ? 'Update' : 'Add'} Job
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobModal;