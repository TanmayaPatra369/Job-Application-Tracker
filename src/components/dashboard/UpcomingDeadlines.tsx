import React from 'react';
import { format, isPast, isToday } from 'date-fns';
import { Calendar as CalendarIcon, Clock as ClockIcon } from 'lucide-react';
import { JobApplication } from '../../types';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { cn } from '../../utils/cn';

interface UpcomingDeadlinesProps {
  jobs: JobApplication[];
}

const UpcomingDeadlines: React.FC<UpcomingDeadlinesProps> = ({ jobs }) => {
  const getUpcomingDeadlines = () => {
    const deadlines = jobs
      .filter(job => job.deadline || job.followUpDate)
      .flatMap(job => {
        const items = [];
        
        if (job.deadline) {
          items.push({
            jobId: job.id,
            companyName: job.companyName,
            position: job.position,
            date: job.deadline,
            type: 'deadline' as const,
          });
        }
        
        if (job.followUpDate) {
          items.push({
            jobId: job.id,
            companyName: job.companyName,
            position: job.position,
            date: job.followUpDate,
            type: 'followUp' as const,
          });
        }
        
        return items;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      
    return deadlines.slice(0, 5); // Return top 5 upcoming deadlines
  };

  const deadlines = getUpcomingDeadlines();

  const renderDateStatus = (date: string) => {
    const dateObj = new Date(date);
    
    if (isPast(dateObj) && !isToday(dateObj)) {
      return <span className="text-red-500 dark:text-red-400">Overdue</span>;
    }
    
    if (isToday(dateObj)) {
      return <span className="text-amber-500 dark:text-amber-400">Today</span>;
    }
    
    return <span className="text-gray-500 dark:text-gray-400">{format(dateObj, 'MMM d, yyyy')}</span>;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Deadlines</CardTitle>
      </CardHeader>
      <CardContent>
        {deadlines.length > 0 ? (
          <ul className="space-y-4">
            {deadlines.map((item, index) => (
              <li 
                key={`${item.jobId}-${item.type}`} 
                className={cn(
                  "flex justify-between items-start pb-4",
                  index < deadlines.length - 1 && "border-b border-gray-200 dark:border-gray-700"
                )}
              >
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{item.position}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.companyName}</p>
                  <div className="flex items-center mt-1 text-xs">
                    {item.type === 'deadline' ? (
                      <CalendarIcon className="w-3 h-3 mr-1 text-gray-500 dark:text-gray-400" />
                    ) : (
                      <ClockIcon className="w-3 h-3 mr-1 text-gray-500 dark:text-gray-400" />
                    )}
                    <span className="capitalize text-gray-500 dark:text-gray-400">
                      {item.type === 'deadline' ? 'Application Deadline' : 'Follow-up Reminder'}
                    </span>
                  </div>
                </div>
                <div className="text-sm">
                  {renderDateStatus(item.date)}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex items-center justify-center h-32 text-gray-500 dark:text-gray-400">
            No upcoming deadlines
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingDeadlines;