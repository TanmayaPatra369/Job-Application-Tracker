import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { JobApplication } from '../types';
import { Database } from '../types/supabase';

type JobRow = Database['public']['Tables']['jobs']['Row'];

const mapJobFromDB = (job: JobRow): JobApplication => ({
  id: job.id,
  companyName: job.company,
  position: job.position,
  applicationLink: job.application_link || undefined,
  jobType: job.job_type,
  salary: job.salary?.toString() || undefined,
  status: job.status,
  notes: job.notes || undefined,
  priority: job.priority,
  deadline: job.deadline || undefined,
  followUpDate: job.follow_up_date || undefined,
  createdAt: job.created_at,
  updatedAt: job.updated_at,
  location: job.location || undefined,
  contactName: job.contact_name || undefined,
  contactEmail: job.contact_email || undefined,
  tags: job.tags || [],
});

const mapJobToDB = (job: Omit<JobApplication, 'id' | 'createdAt' | 'updatedAt'>) => ({
  company: job.companyName,
  position: job.position,
  application_link: job.applicationLink,
  job_type: job.jobType,
  salary: job.salary ? parseFloat(job.salary.replace(/[^0-9.]/g, '')) : null,
  status: job.status,
  notes: job.notes,
  priority: job.priority,
  deadline: job.deadline,
  follow_up_date: job.followUpDate,
  location: job.location,
  contact_name: job.contactName,
  contact_email: job.contactEmail,
  tags: job.tags,
  // Add user_id when creating new jobs
  user_id: supabase.auth.getUser().then(({ data }) => data.user?.id),
});

interface JobStore {
  jobs: JobApplication[];
  isLoading: boolean;
  error: string | null;
  fetchJobs: () => Promise<void>;
  addJob: (job: Omit<JobApplication, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateJob: (id: string, job: Partial<JobApplication>) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
}

const useJobStore = create<JobStore>((set, get) => ({
  jobs: [],
  isLoading: false,
  error: null,

  fetchJobs: async () => {
    set({ isLoading: true });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      set({
        jobs: data.map(mapJobFromDB),
        isLoading: false,
      });
    } catch (error) {
      console.error('Error fetching jobs:', error);
      set({ error: 'Failed to fetch jobs', isLoading: false });
      toast.error('Failed to fetch jobs');
    }
  },

  addJob: async (jobData) => {
    set({ isLoading: true });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const jobWithUserId = {
        ...mapJobToDB(jobData),
        user_id: user.id,
      };

      const { data, error } = await supabase
        .from('jobs')
        .insert([jobWithUserId])
        .select()
        .single();

      if (error) throw error;

      set(state => ({
        jobs: [mapJobFromDB(data), ...state.jobs],
        isLoading: false,
      }));
      
      toast.success('Job added successfully');
    } catch (error) {
      console.error('Error adding job:', error);
      set({ error: 'Failed to add job', isLoading: false });
      toast.error('Failed to add job');
      throw error;
    }
  },

  updateJob: async (id, jobData) => {
    set({ isLoading: true });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('jobs')
        .update(mapJobToDB(jobData as JobApplication))
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;

      set(state => ({
        jobs: state.jobs.map(job => 
          job.id === id ? mapJobFromDB(data) : job
        ),
        isLoading: false,
      }));
      
      toast.success('Job updated successfully');
    } catch (error) {
      console.error('Error updating job:', error);
      set({ error: 'Failed to update job', isLoading: false });
      toast.error('Failed to update job');
      throw error;
    }
  },

  deleteJob: async (id) => {
    set({ isLoading: true });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      set(state => ({
        jobs: state.jobs.filter(job => job.id !== id),
        isLoading: false,
      }));
      
      toast.success('Job deleted successfully');
    } catch (error) {
      console.error('Error deleting job:', error);
      set({ error: 'Failed to delete job', isLoading: false });
      toast.error('Failed to delete job');
      throw error;
    }
  },
}));

export default useJobStore;