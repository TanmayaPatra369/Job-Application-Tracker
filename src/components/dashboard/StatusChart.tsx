import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { JobApplication } from '../../types';

interface StatusChartProps {
  jobs: JobApplication[];
}

interface StatusCount {
  name: string;
  value: number;
  color: string;
}

const STATUS_COLORS = {
  saved: '#94a3b8', // slate-400
  applied: '#3b82f6', // blue-500
  interviewing: '#f59e0b', // amber-500
  offer: '#10b981', // emerald-500
  rejected: '#f43f5e', // rose-500
  accepted: '#8b5cf6', // violet-500
};

const StatusChart: React.FC<StatusChartProps> = ({ jobs }) => {
  const getStatusCounts = (): StatusCount[] => {
    const counts: Record<string, number> = {};
    
    jobs.forEach(job => {
      counts[job.status] = (counts[job.status] || 0) + 1;
    });
    
    return Object.entries(counts).map(([status, count]) => ({
      name: status.charAt(0).toUpperCase() + status.slice(1),
      value: count,
      color: STATUS_COLORS[status as keyof typeof STATUS_COLORS] || '#cbd5e1',
    }));
  };

  const statusCounts = getStatusCounts();
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-md shadow border border-gray-200 dark:border-gray-700">
          <p className="font-medium">{`${payload[0].name}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          {statusCounts.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusCounts}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                  labelLine={false}
                >
                  {statusCounts.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500 dark:text-gray-400">No application data available</p>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 mt-4">
          {statusCounts.map((status) => (
            <div key={status.name} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: status.color }}
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">{status.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusChart;