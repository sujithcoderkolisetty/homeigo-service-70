
import { Card, CardContent } from '@/components/ui/card';

const StatsCard = ({ title, value, icon, description, change }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
          </div>
          <div className="p-2 bg-gray-50 rounded-md">
            {icon}
          </div>
        </div>
        {change && (
          <div className={`mt-4 flex items-center text-sm ${change.positive ? 'text-green-500' : 'text-red-500'}`}>
            {change.positive ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
            <span>{change.value}% from last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard;
