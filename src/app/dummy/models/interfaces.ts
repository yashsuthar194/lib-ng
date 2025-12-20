import { UserRole, ProjectStatus, TaskPriority, TaskStatus } from './enums';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: UserRole;
  companyId: string;
  isActive: boolean;
  lastLogin: string;
  createdAt: string;
}

export interface Company {
  id: string;
  name: string;
  logoUrl: string;
  industry: string;
  address: {
    city: string;
    country: string;
  };
  employeeCount: number;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  companyId: string;
  status: ProjectStatus;
  budget: number;
  startDate: string;
  endDate: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  projectId: string;
  assigneeId: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  tags: string[];
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  timestamp: string;
  details: string;
  ipAddress: string;
}
