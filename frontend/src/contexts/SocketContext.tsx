'use client';

// src/contexts/SocketContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './AuthContext';
import { toast } from 'react-hot-toast';

interface SocketContextType {
  socket: Socket | null;
  joinProject: (projectId: string) => void;
  leaveProject: (projectId: string) => void;
  sendComment: (projectId: string, permitId: string, comment: string) => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      const socketURL = process.env.NEXT_PUBLIC_API_URL || process.env.REACT_APP_API_URL || 'http://localhost:5000';

      const socketInstance = io(socketURL, {
        auth: { token },
        transports: ['websocket', 'polling'],
      });

      socketInstance.on('connect', () => {
        console.log('Socket connected');
      });

      socketInstance.on('disconnect', (reason) => {
        console.log('Socket disconnected:', reason);
      });

      socketInstance.on('permit:updated', (data) => {
        toast(`Permit updated: ${data.name}`, {
          icon: '📋',
        });
      });

      socketInstance.on('permit:comment:new', (data) => {
        toast(`New comment on permit`, {
          icon: '💬',
        });
      });

      socketInstance.on('project:updated', (data) => {
        toast(`Project updated`, {
          icon: '📊',
        });
      });

      socketInstance.on('project:user:joined', (data) => {
        toast(`${data.userName} joined the project`, {
          icon: '👋',
        });
      });

      setSocket(socketInstance);

      return () => {
        socketInstance.disconnect();
      };
    }

    return () => {};
  }, [token]);

  const joinProject = (projectId: string) => {
    if (socket) {
      socket.emit('project:join', projectId);
    }
  };

  const leaveProject = (projectId: string) => {
    if (socket) {
      socket.emit('project:leave', projectId);
    }
  };

  const sendComment = (projectId: string, permitId: string, comment: string) => {
    if (socket) {
      socket.emit('permit:comment', {
        projectId,
        permitId,
        comment
      });
    }
  };

  return (
    <SocketContext.Provider value={{ socket, joinProject, leaveProject, sendComment }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
