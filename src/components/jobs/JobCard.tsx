import React from 'react';
import { format } from 'date-fns';
import { 
  Clock, 
  Calendar, 
  MapPin, 
  Briefcase,
  DollarSign,
  ExternalLink,
  Edit,
  Trash2
} from 'lucide-react';
import { JobApplication } from '../../types';
import Badge from '../ui/Badge';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import Button from '../ui/Button';

interface JobCardProps {
  job: JobApplication;
  onEdit: (job: JobApplication) => void;
  onDelete: (id: string) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onEdit, onDelete }) => {
  const getStatusVariant = (status: string): 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' => {
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

  const getPriorityVariant = (priority: string): 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' => {
    switch (priority) {
      case 'high':
        return 'danger';
      case 'medium':
        return 'warning';
      case 'low':
        return 'default';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return format(new Date(dateString), 'MMM d, yyyy');
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="mb-1">{job.position}</CardTitle>
            <p className="text-base font-medium text-gray-800 dark:text-gray-200">
              {job.companyName}
            </p>
          </div>
          <Badge variant={getStatusVariant(job.status)}>
            {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-3">
            {job.location && (
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{job.location}</span>
              </div>
            )}
            {job.jobType && (
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Briefcase className="h-4 w-4 mr-1" />
                <span>{job.jobType.replace('-', ' ')}</span>
              </div>
            )}
            {job.salary && (
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <DollarSign className="h-4 w-4 mr-1" />
                <span>{job.salary}</span>
              </div>
            )}
          </div>

          {job.deadline && (
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Deadline: {formatDate(job.deadline)}</span>
            </div>
          )}

          {job.followUpDate && (
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Clock className="h-4 w-4 mr-2" />
              <span>Follow up: {formatDate(job.followUpDate)}</span>
            </div>
          )}

          {job.notes && (
            <div className="mt-3">
              <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                {job.notes}
              </p>
            </div>
          )}

          {job.tags && job.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {job.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-3">
        <div>
          <Badge variant={getPriorityVariant(job.priority)}>
            {job.priority} priority
          </Badge>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onEdit(job)}
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          {job.applicationLink && (
            <a 
              href={job.applicationLink} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="sm">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </a>
          )}
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onDelete(job.id)}
            className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default JobCard;