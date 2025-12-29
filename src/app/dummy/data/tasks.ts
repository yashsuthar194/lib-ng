import { Task, TaskPriority, TaskStatus } from '../models';

export const TASKS: Task[] = [
  // TechNova - Apollo Website Redesign (proj-001)
  {
    id: 'task-001',
    title: 'Design Homepage Wireframes',
    description:
      'Create initial wireframes for the new homepage layout including hero section and navigation.',
    projectId: 'proj-001',
    assigneeId: 'user-003', // Priya Sharma - TechNova
    priority: TaskPriority.High,
    status: TaskStatus.Done,
    dueDate: '2024-02-01',
    tags: ['design', 'ui'],
  },
  {
    id: 'task-002',
    title: 'Implement Responsive Navigation',
    description: 'Build responsive navigation component with hamburger menu for mobile devices.',
    projectId: 'proj-001',
    assigneeId: 'user-004', // James O'Brien - TechNova
    priority: TaskPriority.High,
    status: TaskStatus.Done,
    dueDate: '2024-02-15',
    tags: ['frontend', 'angular'],
  },
  {
    id: 'task-003',
    title: 'Setup Angular SSR Configuration',
    description: 'Configure server-side rendering for improved SEO and initial load performance.',
    projectId: 'proj-001',
    assigneeId: 'user-002', // Marcus Chen - TechNova
    priority: TaskPriority.Critical,
    status: TaskStatus.InProgress,
    dueDate: '2024-03-01',
    tags: ['backend', 'angular', 'performance'],
  },
  {
    id: 'task-004',
    title: 'Integrate CMS for Blog Section',
    description: 'Connect headless CMS for managing blog posts and dynamic content.',
    projectId: 'proj-001',
    assigneeId: 'user-003', // Priya Sharma
    priority: TaskPriority.Medium,
    status: TaskStatus.Todo,
    dueDate: '2024-04-15',
    tags: ['integration', 'cms'],
  },
  {
    id: 'task-005',
    title: 'Performance Optimization Audit',
    description: 'Conduct full performance audit using Lighthouse and implement optimizations.',
    projectId: 'proj-001',
    assigneeId: 'user-004', // James O'Brien
    priority: TaskPriority.Medium,
    status: TaskStatus.Todo,
    dueDate: '2024-05-30',
    tags: ['performance', 'testing'],
  },

  // TechNova - Mobile App v3.0 (proj-002)
  {
    id: 'task-006',
    title: 'Implement Biometric Authentication',
    description: 'Add fingerprint and face recognition login options for enhanced security.',
    projectId: 'proj-002',
    assigneeId: 'user-002', // Marcus Chen
    priority: TaskPriority.Critical,
    status: TaskStatus.InProgress,
    dueDate: '2024-04-15',
    tags: ['security', 'mobile', 'feature'],
  },
  {
    id: 'task-007',
    title: 'Redesign User Dashboard',
    description: 'Create modern, intuitive dashboard with customizable widgets.',
    projectId: 'proj-002',
    assigneeId: 'user-003', // Priya Sharma
    priority: TaskPriority.High,
    status: TaskStatus.Review,
    dueDate: '2024-04-30',
    tags: ['ui', 'mobile', 'design'],
  },
  {
    id: 'task-008',
    title: 'Offline Mode Support',
    description: 'Implement offline data caching and sync when connection is restored.',
    projectId: 'proj-002',
    assigneeId: 'user-004', // James O'Brien
    priority: TaskPriority.High,
    status: TaskStatus.Todo,
    dueDate: '2024-06-01',
    tags: ['feature', 'mobile'],
  },

  // GreenLeaf Energy - Smart Grid Monitoring (proj-004)
  {
    id: 'task-009',
    title: 'IoT Sensor Integration Protocol',
    description: 'Develop protocol for integrating various IoT sensors into the monitoring system.',
    projectId: 'proj-004',
    assigneeId: 'user-008', // Lukas Braun - GreenLeaf
    priority: TaskPriority.Critical,
    status: TaskStatus.InProgress,
    dueDate: '2024-05-01',
    tags: ['iot', 'backend', 'integration'],
  },
  {
    id: 'task-010',
    title: 'Real-time Data Dashboard',
    description: 'Build real-time dashboard displaying energy flow and grid status.',
    projectId: 'proj-004',
    assigneeId: 'user-007', // Greta Lindqvist - GreenLeaf
    priority: TaskPriority.High,
    status: TaskStatus.InProgress,
    dueDate: '2024-06-15',
    tags: ['dashboard', 'frontend', 'realtime'],
  },
  {
    id: 'task-011',
    title: 'Alert System for Grid Anomalies',
    description: 'Implement automated alerting for unusual patterns or potential failures.',
    projectId: 'proj-004',
    assigneeId: 'user-008', // Lukas Braun
    priority: TaskPriority.High,
    status: TaskStatus.Todo,
    dueDate: '2024-07-30',
    tags: ['monitoring', 'alerts', 'backend'],
  },

  // Apex Logistics - Fleet Management (proj-006)
  {
    id: 'task-012',
    title: 'GPS Tracking Module',
    description: 'Integrate GPS tracking for all fleet vehicles with real-time location updates.',
    projectId: 'proj-006',
    assigneeId: 'user-011', // Pieter Jansen - Apex
    priority: TaskPriority.Critical,
    status: TaskStatus.Done,
    dueDate: '2024-03-15',
    tags: ['gps', 'tracking', 'integration'],
  },
  {
    id: 'task-013',
    title: 'Route Optimization Algorithm',
    description:
      'Develop AI-based algorithm for optimizing delivery routes based on traffic and distance.',
    projectId: 'proj-006',
    assigneeId: 'user-010', // Anna de Jong - Apex
    priority: TaskPriority.High,
    status: TaskStatus.InProgress,
    dueDate: '2024-05-31',
    tags: ['ai', 'algorithm', 'optimization'],
  },
  {
    id: 'task-014',
    title: 'Driver Mobile Application',
    description:
      'Mobile app for drivers with navigation, delivery confirmation, and communication features.',
    projectId: 'proj-006',
    assigneeId: 'user-011', // Pieter Jansen
    priority: TaskPriority.High,
    status: TaskStatus.Review,
    dueDate: '2024-06-30',
    tags: ['mobile', 'frontend', 'feature'],
  },
  {
    id: 'task-015',
    title: 'Fuel Consumption Analytics',
    description: 'Analytics module for tracking and optimizing fuel consumption across the fleet.',
    projectId: 'proj-006',
    assigneeId: 'user-010', // Anna de Jong
    priority: TaskPriority.Medium,
    status: TaskStatus.Todo,
    dueDate: '2024-08-15',
    tags: ['analytics', 'reporting'],
  },

  // FinStream Capital - Fraud Detection AI (proj-008)
  {
    id: 'task-016',
    title: 'Transaction Pattern Analysis Model',
    description: 'Build ML model to identify unusual transaction patterns indicative of fraud.',
    projectId: 'proj-008',
    assigneeId: 'user-014', // Oliver Thompson - FinStream
    priority: TaskPriority.Critical,
    status: TaskStatus.InProgress,
    dueDate: '2024-06-01',
    tags: ['ml', 'ai', 'security'],
  },
  {
    id: 'task-017',
    title: 'Real-time Scoring Engine',
    description: 'Implement real-time risk scoring for incoming transactions.',
    projectId: 'proj-008',
    assigneeId: 'user-015', // Amelia Clarke - FinStream
    priority: TaskPriority.Critical,
    status: TaskStatus.InProgress,
    dueDate: '2024-07-15',
    tags: ['backend', 'realtime', 'performance'],
  },
  {
    id: 'task-018',
    title: 'Case Investigation Dashboard',
    description: 'Dashboard for fraud analysts to investigate flagged transactions.',
    projectId: 'proj-008',
    assigneeId: 'user-016', // George Harrison - FinStream
    priority: TaskPriority.High,
    status: TaskStatus.Todo,
    dueDate: '2024-09-01',
    tags: ['dashboard', 'ui', 'investigation'],
  },

  // BioGenix Labs - Genome Sequencing Pipeline (proj-011)
  {
    id: 'task-019',
    title: 'FASTQ File Parser Optimization',
    description: 'Optimize parser for handling large FASTQ files with improved memory efficiency.',
    projectId: 'proj-011',
    assigneeId: 'user-018', // Dr. Michael Foster - BioGenix
    priority: TaskPriority.High,
    status: TaskStatus.Done,
    dueDate: '2024-04-30',
    tags: ['backend', 'performance', 'data'],
  },
  {
    id: 'task-020',
    title: 'Variant Calling Pipeline',
    description: 'Implement automated variant calling pipeline with quality metrics.',
    projectId: 'proj-011',
    assigneeId: 'user-018', // Dr. Michael Foster
    priority: TaskPriority.Critical,
    status: TaskStatus.InProgress,
    dueDate: '2024-07-01',
    tags: ['pipeline', 'genomics', 'automation'],
  },
  {
    id: 'task-021',
    title: 'Visualization Dashboard for Results',
    description: 'Interactive dashboard for visualizing genomic analysis results.',
    projectId: 'proj-011',
    assigneeId: 'user-019', // Emily Watson - BioGenix
    priority: TaskPriority.Medium,
    status: TaskStatus.Todo,
    dueDate: '2024-09-30',
    tags: ['visualization', 'dashboard', 'ui'],
  },

  // Quantum Computing - Algorithm Simulator (proj-013)
  {
    id: 'task-022',
    title: 'Quantum Gate Library Implementation',
    description: 'Implement comprehensive library of quantum gates for circuit simulation.',
    projectId: 'proj-013',
    assigneeId: 'user-021', // Kenji Yamamoto - Quantum
    priority: TaskPriority.Critical,
    status: TaskStatus.InProgress,
    dueDate: '2024-06-30',
    tags: ['quantum', 'core', 'library'],
  },
  {
    id: 'task-023',
    title: 'Circuit Visualization Tool',
    description: 'Interactive web-based tool for visualizing quantum circuits.',
    projectId: 'proj-013',
    assigneeId: 'user-022', // Sakura Ito - Quantum
    priority: TaskPriority.High,
    status: TaskStatus.InProgress,
    dueDate: '2024-08-15',
    tags: ['visualization', 'frontend', 'ui'],
  },
  {
    id: 'task-024',
    title: 'Noise Model Simulation',
    description: 'Add realistic noise models for more accurate quantum simulation.',
    projectId: 'proj-013',
    assigneeId: 'user-020', // Yuki Tanaka - Quantum
    priority: TaskPriority.Medium,
    status: TaskStatus.Todo,
    dueDate: '2024-11-30',
    tags: ['simulation', 'accuracy', 'research'],
  },

  // CloudNine Hosting - Kubernetes Auto-Scaling (proj-014)
  {
    id: 'task-025',
    title: 'Metrics Collection Agent',
    description: 'Develop lightweight agent for collecting container metrics.',
    projectId: 'proj-014',
    assigneeId: 'user-024', // Brandon Lee - CloudNine
    priority: TaskPriority.High,
    status: TaskStatus.Done,
    dueDate: '2024-03-31',
    tags: ['monitoring', 'kubernetes', 'agent'],
  },
  {
    id: 'task-026',
    title: 'Predictive Scaling Algorithm',
    description: 'ML-based algorithm to predict load and scale proactively.',
    projectId: 'proj-014',
    assigneeId: 'user-023', // Jessica Martinez - CloudNine
    priority: TaskPriority.Critical,
    status: TaskStatus.InProgress,
    dueDate: '2024-06-15',
    tags: ['ml', 'scaling', 'prediction'],
  },
  {
    id: 'task-027',
    title: 'Scale Event Dashboard',
    description: 'Dashboard showing scaling events, reasons, and cost impact.',
    projectId: 'proj-014',
    assigneeId: 'user-025', // Ashley Kim - CloudNine
    priority: TaskPriority.Medium,
    status: TaskStatus.Todo,
    dueDate: '2024-07-31',
    tags: ['dashboard', 'monitoring', 'ui'],
  },

  // MediCare Plus - Telemedicine Platform (proj-016)
  {
    id: 'task-028',
    title: 'Video Consultation Module',
    description: 'WebRTC-based video consultation with screen sharing capability.',
    projectId: 'proj-016',
    assigneeId: 'user-027', // Dr. David Patel - MediCare
    priority: TaskPriority.Critical,
    status: TaskStatus.InProgress,
    dueDate: '2024-05-15',
    tags: ['video', 'webrtc', 'feature'],
  },
  {
    id: 'task-029',
    title: 'E-Prescription Integration',
    description: 'Integrate with pharmacy networks for electronic prescription submission.',
    projectId: 'proj-016',
    assigneeId: 'user-028', // Linda Brown - MediCare
    priority: TaskPriority.High,
    status: TaskStatus.Review,
    dueDate: '2024-06-30',
    tags: ['integration', 'healthcare', 'compliance'],
  },
  {
    id: 'task-030',
    title: 'Patient Waiting Room',
    description: 'Virtual waiting room with estimated wait times and queue management.',
    projectId: 'proj-016',
    assigneeId: 'user-027', // Dr. David Patel
    priority: TaskPriority.Medium,
    status: TaskStatus.Todo,
    dueDate: '2024-08-15',
    tags: ['feature', 'ux', 'patient'],
  },

  // EduSmart - AI Tutoring Assistant (proj-018)
  {
    id: 'task-031',
    title: 'Knowledge Graph Construction',
    description: 'Build knowledge graph for curriculum topics and learning paths.',
    projectId: 'proj-018',
    assigneeId: 'user-031', // Li Mei Wong - EduSmart
    priority: TaskPriority.High,
    status: TaskStatus.InProgress,
    dueDate: '2024-06-01',
    tags: ['ai', 'knowledge', 'backend'],
  },
  {
    id: 'task-032',
    title: 'Adaptive Question Generator',
    description: 'AI system that generates questions based on student performance.',
    projectId: 'proj-018',
    assigneeId: 'user-030', // Prof. Wei Chen - EduSmart
    priority: TaskPriority.Critical,
    status: TaskStatus.InProgress,
    dueDate: '2024-07-15',
    tags: ['ai', 'education', 'algorithm'],
  },
  {
    id: 'task-033',
    title: 'Progress Tracking Dashboard',
    description: 'Dashboard for students and teachers to track learning progress.',
    projectId: 'proj-018',
    assigneeId: 'user-032', // Ahmad Rahman - EduSmart
    priority: TaskPriority.Medium,
    status: TaskStatus.Todo,
    dueDate: '2024-09-30',
    tags: ['dashboard', 'analytics', 'ui'],
  },

  // AutoDrive Motors - EV Telemetry (proj-020)
  {
    id: 'task-034',
    title: 'Battery Health Monitoring System',
    description: 'Real-time monitoring and prediction of battery health and degradation.',
    projectId: 'proj-020',
    assigneeId: 'user-034', // Klaus Schmidt - AutoDrive
    priority: TaskPriority.Critical,
    status: TaskStatus.InProgress,
    dueDate: '2024-06-30',
    tags: ['telemetry', 'battery', 'monitoring'],
  },
  {
    id: 'task-035',
    title: 'Charging Station Locator',
    description: 'Integration with charging networks for real-time availability and routing.',
    projectId: 'proj-020',
    assigneeId: 'user-035', // Maria Hoffmann - AutoDrive
    priority: TaskPriority.High,
    status: TaskStatus.Review,
    dueDate: '2024-07-15',
    tags: ['integration', 'maps', 'feature'],
  },
  {
    id: 'task-036',
    title: 'Predictive Maintenance Alerts',
    description: 'AI-based system for predicting maintenance needs before failures occur.',
    projectId: 'proj-020',
    assigneeId: 'user-036', // Thomas Bauer - AutoDrive
    priority: TaskPriority.High,
    status: TaskStatus.Todo,
    dueDate: '2024-10-31',
    tags: ['ai', 'maintenance', 'prediction'],
  },

  // FreshMart - Inventory Management AI (proj-022)
  {
    id: 'task-037',
    title: 'Demand Forecasting Model',
    description: 'ML model for predicting product demand based on historical and seasonal data.',
    projectId: 'proj-022',
    assigneeId: 'user-038', // Patricia Davis - FreshMart
    priority: TaskPriority.Critical,
    status: TaskStatus.InProgress,
    dueDate: '2024-05-31',
    tags: ['ml', 'forecasting', 'inventory'],
  },
  {
    id: 'task-038',
    title: 'Auto-Reorder Integration',
    description: 'Automated purchase order generation when inventory drops below threshold.',
    projectId: 'proj-022',
    assigneeId: 'user-039', // Michael Wilson - FreshMart
    priority: TaskPriority.High,
    status: TaskStatus.Review,
    dueDate: '2024-07-15',
    tags: ['automation', 'integration', 'procurement'],
  },
  {
    id: 'task-039',
    title: 'Inventory Dashboard',
    description: 'Real-time dashboard showing stock levels, alerts, and analytics.',
    projectId: 'proj-022',
    assigneeId: 'user-037', // Robert Johnson - FreshMart
    priority: TaskPriority.Medium,
    status: TaskStatus.Todo,
    dueDate: '2024-09-30',
    tags: ['dashboard', 'reporting', 'ui'],
  },

  // SecureVault - Zero Trust Framework (proj-024)
  {
    id: 'task-040',
    title: 'Identity Verification Gateway',
    description: 'Multi-factor identity verification for all network access requests.',
    projectId: 'proj-024',
    assigneeId: 'user-041', // David Levy - SecureVault
    priority: TaskPriority.Critical,
    status: TaskStatus.InProgress,
    dueDate: '2024-04-30',
    tags: ['security', 'identity', 'gateway'],
  },
  {
    id: 'task-041',
    title: 'Micro-segmentation Implementation',
    description: 'Implement network micro-segmentation for granular access control.',
    projectId: 'proj-024',
    assigneeId: 'user-042', // Noa Shapiro - SecureVault
    priority: TaskPriority.Critical,
    status: TaskStatus.InProgress,
    dueDate: '2024-06-15',
    tags: ['network', 'security', 'infrastructure'],
  },
  {
    id: 'task-042',
    title: 'Security Policy Engine',
    description: 'Dynamic policy engine for real-time access decision making.',
    projectId: 'proj-024',
    assigneeId: 'user-040', // Yael Cohen - SecureVault
    priority: TaskPriority.High,
    status: TaskStatus.Todo,
    dueDate: '2024-08-31',
    tags: ['policy', 'security', 'engine'],
  },

  // AeroSpace Dynamics - Flight Control (proj-026)
  {
    id: 'task-043',
    title: 'Autopilot Algorithm Refinement',
    description: 'Enhance autopilot algorithms for improved stability and efficiency.',
    projectId: 'proj-026',
    assigneeId: 'user-044', // Dr. Amanda Hughes - AeroSpace
    priority: TaskPriority.Critical,
    status: TaskStatus.InProgress,
    dueDate: '2024-08-31',
    tags: ['algorithm', 'aviation', 'safety'],
  },
  {
    id: 'task-044',
    title: 'Sensor Fusion Module',
    description: 'Integrate data from multiple sensors for improved situational awareness.',
    projectId: 'proj-026',
    assigneeId: 'user-045', // Kevin Wright - AeroSpace
    priority: TaskPriority.High,
    status: TaskStatus.InProgress,
    dueDate: '2024-10-15',
    tags: ['sensors', 'integration', 'data'],
  },
  {
    id: 'task-045',
    title: 'Regulatory Compliance Documentation',
    description: 'Prepare comprehensive documentation for FAA certification.',
    projectId: 'proj-026',
    assigneeId: 'user-043', // Christopher Evans - AeroSpace
    priority: TaskPriority.High,
    status: TaskStatus.Todo,
    dueDate: '2025-03-31',
    tags: ['compliance', 'documentation', 'aviation'],
  },

  // GourmetChef - Supply Chain Traceability (proj-028)
  {
    id: 'task-046',
    title: 'Blockchain Smart Contract Development',
    description: 'Develop smart contracts for immutable ingredient tracking.',
    projectId: 'proj-028',
    assigneeId: 'user-047', // Marie Laurent - GourmetChef
    priority: TaskPriority.High,
    status: TaskStatus.InProgress,
    dueDate: '2024-06-30',
    tags: ['blockchain', 'smartcontract', 'backend'],
  },
  {
    id: 'task-047',
    title: 'Supplier Mobile App',
    description: 'Mobile app for suppliers to log shipments and quality data.',
    projectId: 'proj-028',
    assigneeId: 'user-048', // Antoine Moreau - GourmetChef
    priority: TaskPriority.Medium,
    status: TaskStatus.Todo,
    dueDate: '2024-09-15',
    tags: ['mobile', 'supplier', 'feature'],
  },
  {
    id: 'task-048',
    title: 'Consumer Traceability Interface',
    description: 'QR code scanning interface for consumers to view ingredient origins.',
    projectId: 'proj-028',
    assigneeId: 'user-046', // Jean-Pierre Dubois - GourmetChef
    priority: TaskPriority.Medium,
    status: TaskStatus.Todo,
    dueDate: '2024-10-31',
    tags: ['consumer', 'ui', 'qr'],
  },

  // BuildRight - BIM Collaboration (proj-032)
  {
    id: 'task-049',
    title: '3D Model Viewer Integration',
    description: 'Integrate web-based 3D viewer for BIM models with annotation support.',
    projectId: 'proj-032',
    assigneeId: 'user-052', // Fatima Hassan - BuildRight
    priority: TaskPriority.High,
    status: TaskStatus.InProgress,
    dueDate: '2024-07-31',
    tags: ['3d', 'visualization', 'bim'],
  },
  {
    id: 'task-050',
    title: 'Real-time Collaboration Features',
    description: 'Enable real-time editing and commenting on BIM models.',
    projectId: 'proj-032',
    assigneeId: 'user-053', // Omar Khalil - BuildRight
    priority: TaskPriority.High,
    status: TaskStatus.Todo,
    dueDate: '2024-09-30',
    tags: ['collaboration', 'realtime', 'feature'],
  },

  // PharmaCore - Clinical Trial Management (proj-033)
  {
    id: 'task-051',
    title: 'Patient Enrollment Workflow',
    description: 'Automated workflow for patient screening and enrollment.',
    projectId: 'proj-033',
    assigneeId: 'user-055', // Dr. Isabelle Dupont - PharmaCore
    priority: TaskPriority.Critical,
    status: TaskStatus.InProgress,
    dueDate: '2024-05-31',
    tags: ['workflow', 'clinical', 'automation'],
  },
  {
    id: 'task-052',
    title: 'Adverse Event Reporting',
    description:
      'System for capturing and reporting adverse events in compliance with regulations.',
    projectId: 'proj-033',
    assigneeId: 'user-056', // Martin Keller - PharmaCore
    priority: TaskPriority.Critical,
    status: TaskStatus.Review,
    dueDate: '2024-07-15',
    tags: ['compliance', 'reporting', 'safety'],
  },
  {
    id: 'task-053',
    title: 'Data Export for FDA Submission',
    description: 'Generate compliant data exports for regulatory submissions.',
    projectId: 'proj-033',
    assigneeId: 'user-054', // Dr. Stefan Richter - PharmaCore
    priority: TaskPriority.High,
    status: TaskStatus.Todo,
    dueDate: '2024-11-30',
    tags: ['export', 'compliance', 'fda'],
  },

  // TravelWise - Booking Engine (proj-035)
  {
    id: 'task-054',
    title: 'Flight Aggregator Integration',
    description: 'Integrate with multiple flight providers for comprehensive search results.',
    projectId: 'proj-035',
    assigneeId: 'user-058', // Sophie Taylor - TravelWise
    priority: TaskPriority.High,
    status: TaskStatus.InProgress,
    dueDate: '2024-05-31',
    tags: ['integration', 'api', 'flights'],
  },
  {
    id: 'task-055',
    title: 'Dynamic Pricing Engine',
    description: 'Implement flexible pricing based on demand and availability.',
    projectId: 'proj-035',
    assigneeId: 'user-057', // Jack Williams - TravelWise
    priority: TaskPriority.High,
    status: TaskStatus.InProgress,
    dueDate: '2024-07-15',
    tags: ['pricing', 'algorithm', 'backend'],
  },
  {
    id: 'task-056',
    title: 'Multi-currency Support',
    description: 'Add support for multiple currencies with real-time exchange rates.',
    projectId: 'proj-035',
    assigneeId: 'user-059', // Liam O'Connor - TravelWise
    priority: TaskPriority.Medium,
    status: TaskStatus.Todo,
    dueDate: '2024-08-31',
    tags: ['payment', 'currency', 'feature'],
  },

  // SmartHome - Voice Assistant Integration (proj-037)
  {
    id: 'task-057',
    title: 'Amazon Alexa Skill Development',
    description: 'Develop custom Alexa skill for smart home device control.',
    projectId: 'proj-037',
    assigneeId: 'user-061', // Liu Yang - SmartHome
    priority: TaskPriority.High,
    status: TaskStatus.Done,
    dueDate: '2024-04-30',
    tags: ['alexa', 'voice', 'integration'],
  },
  {
    id: 'task-058',
    title: 'Google Home Integration',
    description: 'Build Google Home actions for seamless device control.',
    projectId: 'proj-037',
    assigneeId: 'user-062', // Zhang Min - SmartHome
    priority: TaskPriority.High,
    status: TaskStatus.InProgress,
    dueDate: '2024-06-30',
    tags: ['google', 'voice', 'integration'],
  },
  {
    id: 'task-059',
    title: 'Voice Command Training Dataset',
    description: 'Create comprehensive training dataset for custom voice commands.',
    projectId: 'proj-037',
    assigneeId: 'user-060', // Chen Wei - SmartHome
    priority: TaskPriority.Medium,
    status: TaskStatus.Todo,
    dueDate: '2024-09-15',
    tags: ['ai', 'voice', 'training'],
  },

  // LegalEase - Contract Analysis AI (proj-039)
  {
    id: 'task-060',
    title: 'NLP Model for Clause Extraction',
    description: 'Train NLP model to identify and extract key contract clauses.',
    projectId: 'proj-039',
    assigneeId: 'user-064', // Daniel Brooks - LegalEase
    priority: TaskPriority.Critical,
    status: TaskStatus.InProgress,
    dueDate: '2024-06-30',
    tags: ['nlp', 'ai', 'extraction'],
  },
  {
    id: 'task-061',
    title: 'Risk Assessment Scoring',
    description: 'Automated risk scoring based on contract terms and conditions.',
    projectId: 'proj-039',
    assigneeId: 'user-065', // Rebecca Harris - LegalEase
    priority: TaskPriority.High,
    status: TaskStatus.Todo,
    dueDate: '2024-08-31',
    tags: ['risk', 'analysis', 'scoring'],
  },
  {
    id: 'task-062',
    title: 'Comparison Report Generator',
    description: 'Generate side-by-side comparison reports for contract versions.',
    projectId: 'proj-039',
    assigneeId: 'user-063', // Victoria Morgan - LegalEase
    priority: TaskPriority.Medium,
    status: TaskStatus.Todo,
    dueDate: '2024-10-15',
    tags: ['reporting', 'comparison', 'document'],
  },

  // Additional tasks for Stellar Entertainment (proj-030)
  {
    id: 'task-063',
    title: 'Adaptive Bitrate Streaming',
    description: 'Implement ABR streaming for optimal video quality based on connection speed.',
    projectId: 'proj-030',
    assigneeId: 'user-050', // Tyler Brooks - Stellar
    priority: TaskPriority.Critical,
    status: TaskStatus.InProgress,
    dueDate: '2024-06-30',
    tags: ['streaming', 'video', 'performance'],
  },
  {
    id: 'task-064',
    title: 'Content Recommendation Engine',
    description: 'ML-based recommendation system for personalized content suggestions.',
    projectId: 'proj-030',
    assigneeId: 'user-049', // Alexandra Stone - Stellar
    priority: TaskPriority.High,
    status: TaskStatus.Todo,
    dueDate: '2024-09-30',
    tags: ['ml', 'recommendation', 'personalization'],
  },

  // Additional tasks for Drug Discovery AI (proj-034)
  {
    id: 'task-065',
    title: 'Molecular Structure Analysis Module',
    description: 'Deep learning module for analyzing molecular structures and properties.',
    projectId: 'proj-034',
    assigneeId: 'user-054', // Dr. Stefan Richter - PharmaCore
    priority: TaskPriority.Critical,
    status: TaskStatus.InProgress,
    dueDate: '2024-08-31',
    tags: ['deeplearning', 'molecular', 'analysis'],
  },
  {
    id: 'task-066',
    title: 'Drug Interaction Predictor',
    description: 'AI system to predict potential drug interactions and contraindications.',
    projectId: 'proj-034',
    assigneeId: 'user-055', // Dr. Isabelle Dupont - PharmaCore
    priority: TaskPriority.High,
    status: TaskStatus.Todo,
    dueDate: '2024-12-31',
    tags: ['ai', 'prediction', 'safety'],
  },

  // Case Management System (proj-040)
  {
    id: 'task-067',
    title: 'Document Upload and OCR',
    description: 'Implement document upload with automatic text extraction using OCR.',
    projectId: 'proj-040',
    assigneeId: 'user-065', // Rebecca Harris - LegalEase
    priority: TaskPriority.High,
    status: TaskStatus.Done,
    dueDate: '2024-04-15',
    tags: ['ocr', 'document', 'feature'],
  },
  {
    id: 'task-068',
    title: 'Deadline and Reminder System',
    description: 'Automated deadline tracking with email and push notifications.',
    projectId: 'proj-040',
    assigneeId: 'user-064', // Daniel Brooks - LegalEase
    priority: TaskPriority.High,
    status: TaskStatus.InProgress,
    dueDate: '2024-06-30',
    tags: ['notifications', 'calendar', 'automation'],
  },
  {
    id: 'task-069',
    title: 'Time Tracking Integration',
    description: 'Integrate time tracking for billable hours management.',
    projectId: 'proj-040',
    assigneeId: 'user-063', // Victoria Morgan - LegalEase
    priority: TaskPriority.Medium,
    status: TaskStatus.Todo,
    dueDate: '2024-08-15',
    tags: ['billing', 'time', 'integration'],
  },

  // Connected Car Platform (proj-021)
  {
    id: 'task-070',
    title: 'OTA Update Infrastructure',
    description: 'Secure infrastructure for over-the-air software updates.',
    projectId: 'proj-021',
    assigneeId: 'user-033', // Friedrich Weber - AutoDrive
    priority: TaskPriority.Critical,
    status: TaskStatus.InProgress,
    dueDate: '2024-06-30',
    tags: ['ota', 'security', 'infrastructure'],
  },
  {
    id: 'task-071',
    title: 'Vehicle-to-Cloud Communication',
    description: 'Reliable and secure communication protocol between vehicles and cloud.',
    projectId: 'proj-021',
    assigneeId: 'user-034', // Klaus Schmidt - AutoDrive
    priority: TaskPriority.Critical,
    status: TaskStatus.Review,
    dueDate: '2024-07-31',
    tags: ['v2c', 'protocol', 'communication'],
  },
  {
    id: 'task-072',
    title: 'Driver Behavior Analytics',
    description: 'Analytics module for understanding driver behavior and preferences.',
    projectId: 'proj-021',
    assigneeId: 'user-035', // Maria Hoffmann - AutoDrive
    priority: TaskPriority.Medium,
    status: TaskStatus.Todo,
    dueDate: '2024-10-31',
    tags: ['analytics', 'behavior', 'data'],
  },
];
