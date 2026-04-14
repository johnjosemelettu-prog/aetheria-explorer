import React from 'react';
import { X, Info, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

// This interface will be shared with the context
export interface NotificationType {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message?: string;
}

const icons = {
  info: <Info className="w-6 h-6" />,
  success: <CheckCircle className="w-6 h-6" />,
  warning: <AlertTriangle className="w-6 h-6" />,
  error: <XCircle className="w-6 h-6" />,
};

// Tailwind classes for different notification types
const bgColors = {
  info: 'bg-blue-900/70 border-blue-700',
  success: 'bg-green-900/70 border-green-700',
  warning: 'bg-yellow-900/70 border-yellow-700',
  error: 'bg-red-900/70 border-red-700',
};

const textColors = {
    info: 'text-blue-300',
    success: 'text-green-300',
    warning: 'text-yellow-300',
    error: 'text-red-300',
}

interface NotificationProps {
  notification: NotificationType;
  onDismiss: (id: string) => void;
}

const Notification: React.FC<NotificationProps> = ({ notification, onDismiss }) => {
  const { id, type, title, message } = notification;

  return (
    <div 
        className={`backdrop-blur-sm w-full max-w-sm p-4 overflow-hidden rounded-lg shadow-2xl text-white border ${bgColors[type]}`}
        role="alert"
    >
      <div className="flex items-start">
        <div className={`flex-shrink-0 ${textColors[type]}`}>
          {icons[type]}
        </div>
        <div className="ml-3 w-0 flex-1 pt-0.5">
          <p className="text-sm font-bold text-white">{title}</p>
          {message && <p className="mt-1 text-sm text-gray-300">{message}</p>}
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          <button 
            onClick={() => onDismiss(id)} 
            className="inline-flex rounded-md text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 focus:ring-offset-gray-900"
        >
            <span className="sr-only">Close</span>
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
