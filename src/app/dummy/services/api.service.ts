import { Observable, of, delay } from 'rxjs';
import { COMPANIES, USERS, PROJECTS, TASKS, AUDIT_LOGS } from '../data';
import { Company, User, Project, Task, AuditLog } from '../models';

/**
 * Mock API Service that simulates real HTTP calls with Observable responses
 * and random network latency delays.
 */
export class MockApiService {
  /**
   * Returns a random delay between minMs and maxMs milliseconds
   */
  private static getRandomDelay(minMs: number = 200, maxMs: number = 1500): number {
    return Math.floor(Math.random() * (maxMs - minMs)) + minMs;
  }

  // ========================================
  // COMPANIES ENDPOINTS
  // ========================================

  /**
   * GET /api/companies
   * Returns all companies
   */
  static getCompanies(): Observable<Company[]> {
    return of(COMPANIES).pipe(delay(this.getRandomDelay()));
  }

  /**
   * GET /api/companies/:id
   * Returns a single company by ID
   */
  static getCompanyById(id: string): Observable<Company | undefined> {
    const company = COMPANIES.find(c => c.id === id);
    return of(company).pipe(delay(this.getRandomDelay()));
  }

  /**
   * GET /api/companies/industry/:industry
   * Returns companies filtered by industry
   */
  static getCompaniesByIndustry(industry: string): Observable<Company[]> {
    const filtered = COMPANIES.filter(c => 
      c.industry.toLowerCase().includes(industry.toLowerCase())
    );
    return of(filtered).pipe(delay(this.getRandomDelay()));
  }

  // ========================================
  // USERS ENDPOINTS
  // ========================================

  /**
   * GET /api/users
   * Returns all users
   */
  static getUsers(): Observable<User[]> {
    return of(USERS).pipe(delay(this.getRandomDelay()));
  }

  /**
   * GET /api/users/:id
   * Returns a single user by ID
   */
  static getUserById(id: string): Observable<User | undefined> {
    const user = USERS.find(u => u.id === id);
    return of(user).pipe(delay(this.getRandomDelay()));
  }

  /**
   * GET /api/users/company/:companyId
   * Returns all users belonging to a specific company
   */
  static getUsersByCompany(companyId: string): Observable<User[]> {
    const filtered = USERS.filter(u => u.companyId === companyId);
    return of(filtered).pipe(delay(this.getRandomDelay()));
  }

  /**
   * GET /api/users/active
   * Returns all active users
   */
  static getActiveUsers(): Observable<User[]> {
    const filtered = USERS.filter(u => u.isActive);
    return of(filtered).pipe(delay(this.getRandomDelay()));
  }

  /**
   * GET /api/users/role/:role
   * Returns users filtered by role
   */
  static getUsersByRole(role: string): Observable<User[]> {
    const filtered = USERS.filter(u => u.role === role);
    return of(filtered).pipe(delay(this.getRandomDelay()));
  }

  // ========================================
  // PROJECTS ENDPOINTS
  // ========================================

  /**
   * GET /api/projects
   * Returns all projects
   */
  static getProjects(): Observable<Project[]> {
    return of(PROJECTS).pipe(delay(this.getRandomDelay()));
  }

  /**
   * GET /api/projects/:id
   * Returns a single project by ID
   */
  static getProjectById(id: string): Observable<Project | undefined> {
    const project = PROJECTS.find(p => p.id === id);
    return of(project).pipe(delay(this.getRandomDelay()));
  }

  /**
   * GET /api/projects/company/:companyId
   * Returns all projects belonging to a specific company
   */
  static getProjectsByCompany(companyId: string): Observable<Project[]> {
    const filtered = PROJECTS.filter(p => p.companyId === companyId);
    return of(filtered).pipe(delay(this.getRandomDelay()));
  }

  /**
   * GET /api/projects/status/:status
   * Returns projects filtered by status
   */
  static getProjectsByStatus(status: string): Observable<Project[]> {
    const filtered = PROJECTS.filter(p => p.status === status);
    return of(filtered).pipe(delay(this.getRandomDelay()));
  }

  // ========================================
  // TASKS ENDPOINTS
  // ========================================

  /**
   * GET /api/tasks
   * Returns all tasks
   */
  static getTasks(): Observable<Task[]> {
    return of(TASKS).pipe(delay(this.getRandomDelay()));
  }

  /**
   * GET /api/tasks/:id
   * Returns a single task by ID
   */
  static getTaskById(id: string): Observable<Task | undefined> {
    const task = TASKS.find(t => t.id === id);
    return of(task).pipe(delay(this.getRandomDelay()));
  }

  /**
   * GET /api/tasks/project/:projectId
   * Returns all tasks belonging to a specific project
   */
  static getTasksByProject(projectId: string): Observable<Task[]> {
    const filtered = TASKS.filter(t => t.projectId === projectId);
    return of(filtered).pipe(delay(this.getRandomDelay()));
  }

  /**
   * GET /api/tasks/assignee/:userId
   * Returns all tasks assigned to a specific user
   */
  static getTasksByAssignee(userId: string): Observable<Task[]> {
    const filtered = TASKS.filter(t => t.assigneeId === userId);
    return of(filtered).pipe(delay(this.getRandomDelay()));
  }

  /**
   * GET /api/tasks/status/:status
   * Returns tasks filtered by status
   */
  static getTasksByStatus(status: string): Observable<Task[]> {
    const filtered = TASKS.filter(t => t.status === status);
    return of(filtered).pipe(delay(this.getRandomDelay()));
  }

  /**
   * GET /api/tasks/priority/:priority
   * Returns tasks filtered by priority
   */
  static getTasksByPriority(priority: string): Observable<Task[]> {
    const filtered = TASKS.filter(t => t.priority === priority);
    return of(filtered).pipe(delay(this.getRandomDelay()));
  }

  /**
   * GET /api/tasks/tag/:tag
   * Returns tasks that contain a specific tag
   */
  static getTasksByTag(tag: string): Observable<Task[]> {
    const filtered = TASKS.filter(t => t.tags.includes(tag));
    return of(filtered).pipe(delay(this.getRandomDelay()));
  }

  // ========================================
  // AUDIT LOGS ENDPOINTS
  // ========================================

  /**
   * GET /api/audit-logs
   * Returns audit logs with optional limit
   */
  static getAuditLogs(limit?: number): Observable<AuditLog[]> {
    const data = limit ? AUDIT_LOGS.slice(0, limit) : AUDIT_LOGS;
    return of(data).pipe(delay(this.getRandomDelay()));
  }

  /**
   * GET /api/audit-logs/user/:userId
   * Returns audit logs for a specific user
   */
  static getAuditLogsByUser(userId: string): Observable<AuditLog[]> {
    const filtered = AUDIT_LOGS.filter(log => log.userId === userId);
    return of(filtered).pipe(delay(this.getRandomDelay()));
  }

  /**
   * GET /api/audit-logs/action/:action
   * Returns audit logs filtered by action type
   */
  static getAuditLogsByAction(action: string): Observable<AuditLog[]> {
    const filtered = AUDIT_LOGS.filter(log => 
      log.action.toLowerCase().includes(action.toLowerCase())
    );
    return of(filtered).pipe(delay(this.getRandomDelay()));
  }

  // ========================================
  // SEARCH ENDPOINTS
  // ========================================

  /**
   * GET /api/search?q=query
   * Global search across all entities
   */
  static search(query: string): Observable<{
    users: User[];
    companies: Company[];
    projects: Project[];
    tasks: Task[];
  }> {
    const q = query.toLowerCase();
    
    const result = {
      users: USERS.filter(u => 
        u.name.toLowerCase().includes(q) || 
        u.email.toLowerCase().includes(q)
      ).slice(0, 10),
      companies: COMPANIES.filter(c => 
        c.name.toLowerCase().includes(q) || 
        c.industry.toLowerCase().includes(q)
      ).slice(0, 10),
      projects: PROJECTS.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q)
      ).slice(0, 10),
      tasks: TASKS.filter(t => 
        t.title.toLowerCase().includes(q) || 
        t.description.toLowerCase().includes(q) ||
        t.tags.some(tag => tag.toLowerCase().includes(q))
      ).slice(0, 10)
    };
    
    return of(result).pipe(delay(this.getRandomDelay(300, 800)));
  }

  // ========================================
  // AGGREGATION ENDPOINTS
  // ========================================

  /**
   * GET /api/stats/company/:companyId
   * Returns aggregated statistics for a company
   */
  static getCompanyStats(companyId: string): Observable<{
    company: Company | undefined;
    userCount: number;
    projectCount: number;
    taskCount: number;
    activeProjects: number;
  }> {
    const company = COMPANIES.find(c => c.id === companyId);
    const users = USERS.filter(u => u.companyId === companyId);
    const projects = PROJECTS.filter(p => p.companyId === companyId);
    const tasks = TASKS.filter(t => 
      projects.some(p => p.id === t.projectId)
    );
    const activeProjects = projects.filter(p => p.status === 'active');

    return of({
      company,
      userCount: users.length,
      projectCount: projects.length,
      taskCount: tasks.length,
      activeProjects: activeProjects.length
    }).pipe(delay(this.getRandomDelay()));
  }

  /**
   * GET /api/user/:userId/dashboard
   * Returns dashboard data for a specific user
   */
  static getUserDashboard(userId: string): Observable<{
    user: User | undefined;
    company: Company | undefined;
    assignedTasks: Task[];
    recentActivity: AuditLog[];
  }> {
    const user = USERS.find(u => u.id === userId);
    const company = user ? COMPANIES.find(c => c.id === user.companyId) : undefined;
    const assignedTasks = TASKS.filter(t => t.assigneeId === userId);
    const recentActivity = AUDIT_LOGS.filter(log => log.userId === userId).slice(0, 5);

    return of({
      user,
      company,
      assignedTasks,
      recentActivity
    }).pipe(delay(this.getRandomDelay(400, 1200)));
  }
}
