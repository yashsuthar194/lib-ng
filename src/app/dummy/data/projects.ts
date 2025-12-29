import { Project, ProjectStatus } from '../models';

export const PROJECTS: Project[] = [
  // TechNova Solutions (comp-001) Projects
  {
    id: 'proj-001',
    name: 'Apollo Website Redesign',
    description:
      'Complete overhaul of the corporate website using Angular 18 with SSR and modern design patterns.',
    companyId: 'comp-001',
    status: ProjectStatus.Active,
    budget: 85000,
    startDate: '2024-01-15',
    endDate: '2024-06-30',
  },
  {
    id: 'proj-002',
    name: 'Mobile App v3.0',
    description:
      'Major update to the customer-facing mobile application with new features and performance improvements.',
    companyId: 'comp-001',
    status: ProjectStatus.Active,
    budget: 120000,
    startDate: '2024-03-01',
    endDate: '2024-09-15',
  },
  {
    id: 'proj-003',
    name: 'Legacy System Migration',
    description:
      'Migration of legacy .NET Framework systems to .NET 8 with microservices architecture.',
    companyId: 'comp-001',
    status: ProjectStatus.Completed,
    budget: 250000,
    startDate: '2023-06-01',
    endDate: '2024-02-28',
  },

  // GreenLeaf Energy (comp-002) Projects
  {
    id: 'proj-004',
    name: 'Smart Grid Monitoring System',
    description: 'IoT-based real-time monitoring system for renewable energy grid infrastructure.',
    companyId: 'comp-002',
    status: ProjectStatus.Active,
    budget: 340000,
    startDate: '2024-02-01',
    endDate: '2025-01-31',
  },
  {
    id: 'proj-005',
    name: 'Solar Panel Efficiency Dashboard',
    description:
      'Analytics dashboard for tracking and optimizing solar panel performance across installations.',
    companyId: 'comp-002',
    status: ProjectStatus.Completed,
    budget: 95000,
    startDate: '2023-08-01',
    endDate: '2024-01-15',
  },

  // Apex Logistics International (comp-003) Projects
  {
    id: 'proj-006',
    name: 'Fleet Management System',
    description:
      'Comprehensive system for managing and tracking the global logistics fleet in real-time.',
    companyId: 'comp-003',
    status: ProjectStatus.Active,
    budget: 450000,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
  },
  {
    id: 'proj-007',
    name: 'Customer Portal Upgrade',
    description: 'Enhanced self-service portal for customers to track shipments and manage orders.',
    companyId: 'comp-003',
    status: ProjectStatus.OnHold,
    budget: 180000,
    startDate: '2024-04-15',
    endDate: '2024-10-30',
  },

  // FinStream Capital (comp-004) Projects
  {
    id: 'proj-008',
    name: 'Fraud Detection AI Platform',
    description:
      'Machine learning platform for real-time detection and prevention of financial fraud.',
    companyId: 'comp-004',
    status: ProjectStatus.Active,
    budget: 620000,
    startDate: '2024-02-15',
    endDate: '2025-02-14',
  },
  {
    id: 'proj-009',
    name: 'Mobile Banking App Refresh',
    description:
      'Complete redesign of the mobile banking application with enhanced security features.',
    companyId: 'comp-004',
    status: ProjectStatus.Active,
    budget: 280000,
    startDate: '2024-05-01',
    endDate: '2024-11-30',
  },
  {
    id: 'proj-010',
    name: 'Regulatory Compliance System',
    description: 'Automated compliance monitoring and reporting system for financial regulations.',
    companyId: 'comp-004',
    status: ProjectStatus.Completed,
    budget: 195000,
    startDate: '2023-09-01',
    endDate: '2024-03-31',
  },

  // BioGenix Labs (comp-005) Projects
  {
    id: 'proj-011',
    name: 'Genome Sequencing Pipeline',
    description: 'High-throughput data pipeline for processing and analyzing genomic data.',
    companyId: 'comp-005',
    status: ProjectStatus.Active,
    budget: 380000,
    startDate: '2024-03-15',
    endDate: '2024-12-15',
  },
  {
    id: 'proj-012',
    name: 'Lab Information Management System',
    description: 'Integrated system for managing laboratory workflows, samples, and results.',
    companyId: 'comp-005',
    status: ProjectStatus.Active,
    budget: 165000,
    startDate: '2024-01-10',
    endDate: '2024-07-31',
  },

  // Quantum Computing Inc (comp-006) Projects
  {
    id: 'proj-013',
    name: 'Quantum Algorithm Simulator',
    description: 'Cloud-based simulator for testing and visualizing quantum computing algorithms.',
    companyId: 'comp-006',
    status: ProjectStatus.Active,
    budget: 520000,
    startDate: '2024-04-01',
    endDate: '2025-03-31',
  },

  // CloudNine Hosting (comp-007) Projects
  {
    id: 'proj-014',
    name: 'Kubernetes Auto-Scaling Engine',
    description:
      'Intelligent auto-scaling system for containerized workloads based on predictive analytics.',
    companyId: 'comp-007',
    status: ProjectStatus.Active,
    budget: 230000,
    startDate: '2024-02-01',
    endDate: '2024-08-31',
  },
  {
    id: 'proj-015',
    name: 'Global CDN Expansion',
    description: 'Expansion of content delivery network to 15 new edge locations worldwide.',
    companyId: 'comp-007',
    status: ProjectStatus.Completed,
    budget: 410000,
    startDate: '2023-07-01',
    endDate: '2024-02-29',
  },

  // MediCare Plus (comp-008) Projects
  {
    id: 'proj-016',
    name: 'Telemedicine Platform',
    description:
      'Video consultation platform with integrated electronic health records and prescription management.',
    companyId: 'comp-008',
    status: ProjectStatus.Active,
    budget: 290000,
    startDate: '2024-01-15',
    endDate: '2024-09-30',
  },
  {
    id: 'proj-017',
    name: 'Patient Portal Mobile App',
    description:
      'Mobile application for patients to access their health records and schedule appointments.',
    companyId: 'comp-008',
    status: ProjectStatus.Active,
    budget: 175000,
    startDate: '2024-04-01',
    endDate: '2024-10-15',
  },

  // EduSmart Academy (comp-009) Projects
  {
    id: 'proj-018',
    name: 'AI Tutoring Assistant',
    description: 'Personalized learning assistant using AI to adapt to individual student needs.',
    companyId: 'comp-009',
    status: ProjectStatus.Active,
    budget: 210000,
    startDate: '2024-03-01',
    endDate: '2024-11-30',
  },
  {
    id: 'proj-019',
    name: 'Virtual Classroom Platform',
    description:
      'Enhanced virtual classroom with breakout rooms, whiteboard, and real-time collaboration.',
    companyId: 'comp-009',
    status: ProjectStatus.Completed,
    budget: 145000,
    startDate: '2023-10-01',
    endDate: '2024-04-30',
  },

  // AutoDrive Motors (comp-010) Projects
  {
    id: 'proj-020',
    name: 'Electric Vehicle Telemetry System',
    description: 'Real-time telemetry and diagnostics system for the new EV model lineup.',
    companyId: 'comp-010',
    status: ProjectStatus.Active,
    budget: 680000,
    startDate: '2024-01-01',
    endDate: '2025-06-30',
  },
  {
    id: 'proj-021',
    name: 'Connected Car Platform',
    description:
      'Cloud platform for vehicle-to-infrastructure communication and over-the-air updates.',
    companyId: 'comp-010',
    status: ProjectStatus.Active,
    budget: 890000,
    startDate: '2023-09-01',
    endDate: '2024-12-31',
  },

  // FreshMart Retail (comp-011) Projects
  {
    id: 'proj-022',
    name: 'Inventory Management AI',
    description: 'AI-powered inventory forecasting and automatic reordering system.',
    companyId: 'comp-011',
    status: ProjectStatus.Active,
    budget: 320000,
    startDate: '2024-02-15',
    endDate: '2024-10-31',
  },
  {
    id: 'proj-023',
    name: 'E-commerce Platform Redesign',
    description:
      'Complete redesign of online shopping platform with improved UX and checkout flow.',
    companyId: 'comp-011',
    status: ProjectStatus.Active,
    budget: 195000,
    startDate: '2024-05-01',
    endDate: '2024-11-30',
  },

  // SecureVault Cyber (comp-012) Projects
  {
    id: 'proj-024',
    name: 'Zero Trust Security Framework',
    description: 'Implementation of enterprise-grade zero trust architecture for client networks.',
    companyId: 'comp-012',
    status: ProjectStatus.Active,
    budget: 475000,
    startDate: '2024-01-15',
    endDate: '2024-09-30',
  },
  {
    id: 'proj-025',
    name: 'Threat Intelligence Platform',
    description: 'Real-time threat monitoring and intelligence aggregation platform.',
    companyId: 'comp-012',
    status: ProjectStatus.Active,
    budget: 310000,
    startDate: '2024-03-01',
    endDate: '2024-12-15',
  },

  // AeroSpace Dynamics (comp-013) Projects
  {
    id: 'proj-026',
    name: 'Flight Control System Upgrade',
    description: 'Next-generation flight control system with enhanced autopilot capabilities.',
    companyId: 'comp-013',
    status: ProjectStatus.Active,
    budget: 1250000,
    startDate: '2024-02-01',
    endDate: '2025-08-31',
  },
  {
    id: 'proj-027',
    name: 'Satellite Communication Module',
    description: 'Development of compact satellite communication module for commercial aircraft.',
    companyId: 'comp-013',
    status: ProjectStatus.OnHold,
    budget: 560000,
    startDate: '2024-06-01',
    endDate: '2025-05-31',
  },

  // GourmetChef Foods (comp-014) Projects
  {
    id: 'proj-028',
    name: 'Supply Chain Traceability',
    description: 'Blockchain-based system for tracking food ingredients from farm to table.',
    companyId: 'comp-014',
    status: ProjectStatus.Active,
    budget: 185000,
    startDate: '2024-04-01',
    endDate: '2024-11-30',
  },
  {
    id: 'proj-029',
    name: 'Recipe Management Platform',
    description:
      'Digital platform for managing recipes, nutritional information, and allergen data.',
    companyId: 'comp-014',
    status: ProjectStatus.Completed,
    budget: 95000,
    startDate: '2023-11-01',
    endDate: '2024-03-31',
  },

  // Stellar Entertainment (comp-015) Projects
  {
    id: 'proj-030',
    name: 'Streaming Platform Enhancement',
    description: 'Performance optimization and new features for the video streaming platform.',
    companyId: 'comp-015',
    status: ProjectStatus.Active,
    budget: 420000,
    startDate: '2024-03-15',
    endDate: '2024-12-31',
  },

  // BuildRight Construction (comp-016) Projects
  {
    id: 'proj-031',
    name: 'Project Management System',
    description: 'Integrated system for managing construction projects, resources, and timelines.',
    companyId: 'comp-016',
    status: ProjectStatus.Active,
    budget: 275000,
    startDate: '2024-01-01',
    endDate: '2024-08-31',
  },
  {
    id: 'proj-032',
    name: 'BIM Collaboration Platform',
    description: 'Cloud-based Building Information Modeling platform for real-time collaboration.',
    companyId: 'comp-016',
    status: ProjectStatus.Active,
    budget: 340000,
    startDate: '2024-04-15',
    endDate: '2025-01-31',
  },

  // PharmaCore Industries (comp-017) Projects
  {
    id: 'proj-033',
    name: 'Clinical Trial Management System',
    description:
      'Comprehensive system for managing clinical trials, patient data, and regulatory submissions.',
    companyId: 'comp-017',
    status: ProjectStatus.Active,
    budget: 580000,
    startDate: '2024-02-01',
    endDate: '2025-02-28',
  },
  {
    id: 'proj-034',
    name: 'Drug Discovery AI Platform',
    description:
      'Machine learning platform for accelerating drug discovery and molecular analysis.',
    companyId: 'comp-017',
    status: ProjectStatus.Active,
    budget: 920000,
    startDate: '2024-01-15',
    endDate: '2025-07-31',
  },

  // TravelWise Tours (comp-018) Projects
  {
    id: 'proj-035',
    name: 'Booking Engine Modernization',
    description:
      'Complete rewrite of the travel booking engine with modern microservices architecture.',
    companyId: 'comp-018',
    status: ProjectStatus.Active,
    budget: 165000,
    startDate: '2024-03-01',
    endDate: '2024-09-30',
  },
  {
    id: 'proj-036',
    name: 'Virtual Tour Experience',
    description: 'VR-based virtual tour previews for popular travel destinations.',
    companyId: 'comp-018',
    status: ProjectStatus.OnHold,
    budget: 110000,
    startDate: '2024-07-01',
    endDate: '2024-12-31',
  },

  // SmartHome Devices (comp-019) Projects
  {
    id: 'proj-037',
    name: 'Voice Assistant Integration',
    description: 'Integration with major voice assistants for seamless smart home control.',
    companyId: 'comp-019',
    status: ProjectStatus.Active,
    budget: 245000,
    startDate: '2024-02-15',
    endDate: '2024-10-31',
  },
  {
    id: 'proj-038',
    name: 'Energy Monitoring Dashboard',
    description: 'Real-time energy consumption monitoring and optimization recommendations.',
    companyId: 'comp-019',
    status: ProjectStatus.Completed,
    budget: 135000,
    startDate: '2023-12-01',
    endDate: '2024-05-31',
  },

  // LegalEase Partners (comp-020) Projects
  {
    id: 'proj-039',
    name: 'Contract Analysis AI',
    description: 'AI-powered contract review and analysis tool for legal document processing.',
    companyId: 'comp-020',
    status: ProjectStatus.Active,
    budget: 195000,
    startDate: '2024-04-01',
    endDate: '2024-11-30',
  },
  {
    id: 'proj-040',
    name: 'Case Management System',
    description:
      'Comprehensive case management system with document storage and workflow automation.',
    companyId: 'comp-020',
    status: ProjectStatus.Active,
    budget: 145000,
    startDate: '2024-02-01',
    endDate: '2024-08-31',
  },
];
