import React, {
  useState,
  useContext,
  createContext,
  FC,
  useEffect,
} from 'react';
import { Transition } from '@headlessui/react';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import Alert from '@/components/SingleAlert';

type AlertType = 'success' | 'error';

export type Alert = {
  id: string;
  message: string;
  type: AlertType;
  duration: number;
};

type AlertContextType = {
  addAlert: (message: string, type?: AlertType, duration?: number) => void;
};

const AlertContext = createContext<AlertContextType | null>(null);

export const AlertProvider = ({ children }: { children: any }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const addAlert = (
    message: string,
    type: AlertType = 'success',
    duration = 5000
  ) => {
    const id = uuidv4();
    setAlerts((alerts) => [...alerts, { id, message, type, duration }]);
  };

  const removeAlert = (id: string) => {
    setAlerts((alerts) => alerts.filter((alert) => alert.id !== id));
  };

  const renderAlerts = () => {
    return alerts.map((alert, i) => (
      <Alert alert={alert} key={alert.id} index={i} removeAlert={removeAlert} />
    ));
  };

  return (
    <AlertContext.Provider value={{ addAlert }}>
      {children}
      <div className="fixed top-0 left-0 right-0 z-40">{renderAlerts()}</div>
    </AlertContext.Provider>
  );
};

export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};
