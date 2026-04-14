import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import Notification from '../components/Notification';
import { NotificationType } from '../components/Notification';
import { v4 as uuidv4 } from 'uuid';

type NotificationContextType = {
  addNotification: (notification: Omit<NotificationType, 'id'>) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifier = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifier must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  const addNotification = useCallback((notification: Omit<NotificationType, 'id'>) => {
    const id = uuidv4();
    setNotifications(prev => [...prev, { id, ...notification }]);
    setTimeout(() => {
        dismissNotification(id);
    }, 5000); // Auto-dismiss after 5 seconds
  }, []);

  const dismissNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      <div className="fixed top-0 right-0 z-50 p-4 space-y-2">
        {notifications.map(notification => (
          <Notification 
            key={notification.id} 
            notification={notification} 
            onDismiss={dismissNotification} 
          />
        ))}
      </div>
    </NotificationContext.Provider>
  );
};
