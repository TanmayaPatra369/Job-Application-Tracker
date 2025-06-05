export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export type JobStatus = 
  | 'saved'
  | 'applied'
  | 'interviewing'
  | 'offer'
  | 'rejected'
  | 'accepted';

export type JobType = 
  | 'full-time'
  | 'part-time'
  | 'contract'
  | 'freelance'
  | 'internship';

export interface JobApplication {
  id: string;
  companyName: string;
  position: string;
  applicationLink?: string;
  jobType: JobType;
  salary?: string;
  status: JobStatus;
  notes?: string;
  priority: 'low' | 'medium' | 'high';
  deadline?: string;
  followUpDate?: string;
  createdAt: string;
  updatedAt: string;
  location?: string;
  contactName?: string;
  contactEmail?: string;
  tags?: string[];
}

export interface Task {
  id: string;
  company: string;
  applicationLink?: string;
  notes?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  jobId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, metadata: { name: string }) => Promise<void>;
  logout: () => Promise<void>;
}

export interface JobsContextType {
  jobs: JobApplication[];
  isLoading: boolean;
  error: string | null;
  addJob: (job: Omit<JobApplication, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateJob: (id: string, job: Partial<JobApplication>) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
}