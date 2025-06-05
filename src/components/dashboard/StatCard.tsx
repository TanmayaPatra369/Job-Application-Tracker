import React from 'react';
import { cn } from '../../utils/cn';
import { Card, CardContent } from '../ui/Card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: string | number;
    isPositive: boolean;
  };
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  change,
  className
}) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {title}
            </p>
            <h3 className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
              {value}
            </h3>
            
            {change && (
              <p className={cn(
                "text-xs font-medium mt-1",
                change.isPositive 
                  ? "text-green-600 dark:text-green-400" 
                  : "text-red-600 dark:text-red-400"
              )}>
                <span>
                  {change.isPositive ? '↑' : '↓'} {change.value}
                </span>
                <span className="text-gray-500 dark:text-gray-400 ml-1">vs last week</span>
              </p>
            )}
          </div>
          
          <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;