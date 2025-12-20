import { User, UserRole } from '../models';

export const USERS: User[] = [
  // TechNova Solutions (comp-001) - Software Development
  {
    id: 'user-001',
    name: 'Elena Rodriguez',
    email: 'elena.rodriguez@technova.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=elena-rodriguez',
    role: UserRole.Admin,
    companyId: 'comp-001',
    isActive: true,
    lastLogin: '2024-12-18T09:15:00Z',
    createdAt: '2018-03-20T10:00:00Z'
  },
  {
    id: 'user-002',
    name: 'Marcus Chen',
    email: 'marcus.chen@technova.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=marcus-chen',
    role: UserRole.Manager,
    companyId: 'comp-001',
    isActive: true,
    lastLogin: '2024-12-17T14:30:00Z',
    createdAt: '2018-05-15T09:00:00Z'
  },
  {
    id: 'user-003',
    name: 'Priya Sharma',
    email: 'priya.sharma@technova.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=priya-sharma',
    role: UserRole.User,
    companyId: 'comp-001',
    isActive: true,
    lastLogin: '2024-12-18T08:45:00Z',
    createdAt: '2019-02-10T11:30:00Z'
  },
  {
    id: 'user-004',
    name: 'James O\'Brien',
    email: 'james.obrien@technova.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=james-obrien',
    role: UserRole.User,
    companyId: 'comp-001',
    isActive: true,
    lastLogin: '2024-12-16T16:20:00Z',
    createdAt: '2020-01-08T08:00:00Z'
  },
  {
    id: 'user-005',
    name: 'Sofia Petrov',
    email: 'sofia.petrov@technova.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=sofia-petrov',
    role: UserRole.Guest,
    companyId: 'comp-001',
    isActive: false,
    lastLogin: '2024-11-20T10:00:00Z',
    createdAt: '2023-06-15T14:00:00Z'
  },

  // GreenLeaf Energy (comp-002) - Renewable Energy
  {
    id: 'user-006',
    name: 'Hans Mueller',
    email: 'hans.mueller@greenleaf.de',
    avatarUrl: 'https://i.pravatar.cc/150?u=hans-mueller',
    role: UserRole.Admin,
    companyId: 'comp-002',
    isActive: true,
    lastLogin: '2024-12-18T07:00:00Z',
    createdAt: '2019-07-25T08:30:00Z'
  },
  {
    id: 'user-007',
    name: 'Greta Lindqvist',
    email: 'greta.lindqvist@greenleaf.de',
    avatarUrl: 'https://i.pravatar.cc/150?u=greta-lindqvist',
    role: UserRole.Manager,
    companyId: 'comp-002',
    isActive: true,
    lastLogin: '2024-12-17T18:45:00Z',
    createdAt: '2019-09-01T10:00:00Z'
  },
  {
    id: 'user-008',
    name: 'Lukas Braun',
    email: 'lukas.braun@greenleaf.de',
    avatarUrl: 'https://i.pravatar.cc/150?u=lukas-braun',
    role: UserRole.User,
    companyId: 'comp-002',
    isActive: true,
    lastLogin: '2024-12-18T06:30:00Z',
    createdAt: '2020-03-12T09:15:00Z'
  },

  // Apex Logistics International (comp-003) - Transportation
  {
    id: 'user-009',
    name: 'Willem van der Berg',
    email: 'willem.vanderberg@apexlogistics.nl',
    avatarUrl: 'https://i.pravatar.cc/150?u=willem-vanderberg',
    role: UserRole.Admin,
    companyId: 'comp-003',
    isActive: true,
    lastLogin: '2024-12-18T05:45:00Z',
    createdAt: '2015-12-01T08:00:00Z'
  },
  {
    id: 'user-010',
    name: 'Anna de Jong',
    email: 'anna.dejong@apexlogistics.nl',
    avatarUrl: 'https://i.pravatar.cc/150?u=anna-dejong',
    role: UserRole.Manager,
    companyId: 'comp-003',
    isActive: true,
    lastLogin: '2024-12-17T17:30:00Z',
    createdAt: '2016-04-20T10:30:00Z'
  },
  {
    id: 'user-011',
    name: 'Pieter Jansen',
    email: 'pieter.jansen@apexlogistics.nl',
    avatarUrl: 'https://i.pravatar.cc/150?u=pieter-jansen',
    role: UserRole.User,
    companyId: 'comp-003',
    isActive: true,
    lastLogin: '2024-12-18T04:20:00Z',
    createdAt: '2017-08-15T07:45:00Z'
  },
  {
    id: 'user-012',
    name: 'Eva Bakker',
    email: 'eva.bakker@apexlogistics.nl',
    avatarUrl: 'https://i.pravatar.cc/150?u=eva-bakker',
    role: UserRole.User,
    companyId: 'comp-003',
    isActive: false,
    lastLogin: '2024-10-05T12:00:00Z',
    createdAt: '2018-02-28T09:00:00Z'
  },

  // FinStream Capital (comp-004) - Financial Services
  {
    id: 'user-013',
    name: 'Charlotte Windsor',
    email: 'charlotte.windsor@finstream.co.uk',
    avatarUrl: 'https://i.pravatar.cc/150?u=charlotte-windsor',
    role: UserRole.Admin,
    companyId: 'comp-004',
    isActive: true,
    lastLogin: '2024-12-18T08:00:00Z',
    createdAt: '2017-01-10T09:30:00Z'
  },
  {
    id: 'user-014',
    name: 'Oliver Thompson',
    email: 'oliver.thompson@finstream.co.uk',
    avatarUrl: 'https://i.pravatar.cc/150?u=oliver-thompson',
    role: UserRole.Manager,
    companyId: 'comp-004',
    isActive: true,
    lastLogin: '2024-12-17T16:45:00Z',
    createdAt: '2017-06-22T11:00:00Z'
  },
  {
    id: 'user-015',
    name: 'Amelia Clarke',
    email: 'amelia.clarke@finstream.co.uk',
    avatarUrl: 'https://i.pravatar.cc/150?u=amelia-clarke',
    role: UserRole.User,
    companyId: 'comp-004',
    isActive: true,
    lastLogin: '2024-12-18T07:30:00Z',
    createdAt: '2018-09-05T08:45:00Z'
  },
  {
    id: 'user-016',
    name: 'George Harrison',
    email: 'george.harrison@finstream.co.uk',
    avatarUrl: 'https://i.pravatar.cc/150?u=george-harrison',
    role: UserRole.User,
    companyId: 'comp-004',
    isActive: true,
    lastLogin: '2024-12-16T14:15:00Z',
    createdAt: '2019-11-18T10:00:00Z'
  },

  // BioGenix Labs (comp-005) - Biotechnology
  {
    id: 'user-017',
    name: 'Dr. Sarah Mitchell',
    email: 'sarah.mitchell@biogenix.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=sarah-mitchell',
    role: UserRole.Admin,
    companyId: 'comp-005',
    isActive: true,
    lastLogin: '2024-12-18T10:30:00Z',
    createdAt: '2020-04-15T09:00:00Z'
  },
  {
    id: 'user-018',
    name: 'Dr. Michael Foster',
    email: 'michael.foster@biogenix.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=michael-foster',
    role: UserRole.Manager,
    companyId: 'comp-005',
    isActive: true,
    lastLogin: '2024-12-17T11:20:00Z',
    createdAt: '2020-06-01T10:30:00Z'
  },
  {
    id: 'user-019',
    name: 'Emily Watson',
    email: 'emily.watson@biogenix.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=emily-watson',
    role: UserRole.User,
    companyId: 'comp-005',
    isActive: true,
    lastLogin: '2024-12-18T09:45:00Z',
    createdAt: '2021-02-14T08:00:00Z'
  },

  // Quantum Computing Inc (comp-006) - Technology Research
  {
    id: 'user-020',
    name: 'Yuki Tanaka',
    email: 'yuki.tanaka@quantumcomp.jp',
    avatarUrl: 'https://i.pravatar.cc/150?u=yuki-tanaka',
    role: UserRole.Admin,
    companyId: 'comp-006',
    isActive: true,
    lastLogin: '2024-12-18T02:00:00Z',
    createdAt: '2021-09-05T08:00:00Z'
  },
  {
    id: 'user-021',
    name: 'Kenji Yamamoto',
    email: 'kenji.yamamoto@quantumcomp.jp',
    avatarUrl: 'https://i.pravatar.cc/150?u=kenji-yamamoto',
    role: UserRole.Manager,
    companyId: 'comp-006',
    isActive: true,
    lastLogin: '2024-12-17T23:45:00Z',
    createdAt: '2021-10-20T09:30:00Z'
  },
  {
    id: 'user-022',
    name: 'Sakura Ito',
    email: 'sakura.ito@quantumcomp.jp',
    avatarUrl: 'https://i.pravatar.cc/150?u=sakura-ito',
    role: UserRole.User,
    companyId: 'comp-006',
    isActive: true,
    lastLogin: '2024-12-18T01:30:00Z',
    createdAt: '2022-03-08T07:00:00Z'
  },

  // CloudNine Hosting (comp-007) - Cloud Infrastructure
  {
    id: 'user-023',
    name: 'Jessica Martinez',
    email: 'jessica.martinez@cloudnine.io',
    avatarUrl: 'https://i.pravatar.cc/150?u=jessica-martinez',
    role: UserRole.Admin,
    companyId: 'comp-007',
    isActive: true,
    lastLogin: '2024-12-18T11:00:00Z',
    createdAt: '2016-06-20T10:00:00Z'
  },
  {
    id: 'user-024',
    name: 'Brandon Lee',
    email: 'brandon.lee@cloudnine.io',
    avatarUrl: 'https://i.pravatar.cc/150?u=brandon-lee',
    role: UserRole.Manager,
    companyId: 'comp-007',
    isActive: true,
    lastLogin: '2024-12-17T19:30:00Z',
    createdAt: '2017-01-15T09:00:00Z'
  },
  {
    id: 'user-025',
    name: 'Ashley Kim',
    email: 'ashley.kim@cloudnine.io',
    avatarUrl: 'https://i.pravatar.cc/150?u=ashley-kim',
    role: UserRole.User,
    companyId: 'comp-007',
    isActive: true,
    lastLogin: '2024-12-18T10:15:00Z',
    createdAt: '2018-08-22T11:30:00Z'
  },

  // MediCare Plus (comp-008) - Healthcare
  {
    id: 'user-026',
    name: 'Dr. Rachel Green',
    email: 'rachel.green@medicareplus.ca',
    avatarUrl: 'https://i.pravatar.cc/150?u=rachel-green',
    role: UserRole.Admin,
    companyId: 'comp-008',
    isActive: true,
    lastLogin: '2024-12-18T12:00:00Z',
    createdAt: '2014-03-01T08:00:00Z'
  },
  {
    id: 'user-027',
    name: 'Dr. David Patel',
    email: 'david.patel@medicareplus.ca',
    avatarUrl: 'https://i.pravatar.cc/150?u=david-patel',
    role: UserRole.Manager,
    companyId: 'comp-008',
    isActive: true,
    lastLogin: '2024-12-17T15:20:00Z',
    createdAt: '2015-07-14T10:00:00Z'
  },
  {
    id: 'user-028',
    name: 'Nurse Linda Brown',
    email: 'linda.brown@medicareplus.ca',
    avatarUrl: 'https://i.pravatar.cc/150?u=linda-brown',
    role: UserRole.User,
    companyId: 'comp-008',
    isActive: true,
    lastLogin: '2024-12-18T06:45:00Z',
    createdAt: '2016-11-30T07:30:00Z'
  },
  {
    id: 'user-029',
    name: 'Dr. Jennifer Adams',
    email: 'jennifer.adams@medicareplus.ca',
    avatarUrl: 'https://i.pravatar.cc/150?u=jennifer-adams',
    role: UserRole.User,
    companyId: 'comp-008',
    isActive: false,
    lastLogin: '2024-09-15T09:00:00Z',
    createdAt: '2018-05-20T11:00:00Z'
  },

  // EduSmart Academy (comp-009) - Education Technology
  {
    id: 'user-030',
    name: 'Prof. Wei Chen',
    email: 'wei.chen@edusmart.sg',
    avatarUrl: 'https://i.pravatar.cc/150?u=wei-chen',
    role: UserRole.Admin,
    companyId: 'comp-009',
    isActive: true,
    lastLogin: '2024-12-18T03:30:00Z',
    createdAt: '2019-08-15T08:00:00Z'
  },
  {
    id: 'user-031',
    name: 'Li Mei Wong',
    email: 'limei.wong@edusmart.sg',
    avatarUrl: 'https://i.pravatar.cc/150?u=limei-wong',
    role: UserRole.Manager,
    companyId: 'comp-009',
    isActive: true,
    lastLogin: '2024-12-17T22:00:00Z',
    createdAt: '2020-01-20T09:30:00Z'
  },
  {
    id: 'user-032',
    name: 'Ahmad Rahman',
    email: 'ahmad.rahman@edusmart.sg',
    avatarUrl: 'https://i.pravatar.cc/150?u=ahmad-rahman',
    role: UserRole.User,
    companyId: 'comp-009',
    isActive: true,
    lastLogin: '2024-12-18T02:45:00Z',
    createdAt: '2021-06-10T10:00:00Z'
  },

  // AutoDrive Motors (comp-010) - Automotive
  {
    id: 'user-033',
    name: 'Friedrich Weber',
    email: 'friedrich.weber@autodrive.de',
    avatarUrl: 'https://i.pravatar.cc/150?u=friedrich-weber',
    role: UserRole.Admin,
    companyId: 'comp-010',
    isActive: true,
    lastLogin: '2024-12-18T06:00:00Z',
    createdAt: '2012-06-01T08:00:00Z'
  },
  {
    id: 'user-034',
    name: 'Klaus Schmidt',
    email: 'klaus.schmidt@autodrive.de',
    avatarUrl: 'https://i.pravatar.cc/150?u=klaus-schmidt',
    role: UserRole.Manager,
    companyId: 'comp-010',
    isActive: true,
    lastLogin: '2024-12-17T13:45:00Z',
    createdAt: '2013-02-18T10:30:00Z'
  },
  {
    id: 'user-035',
    name: 'Maria Hoffmann',
    email: 'maria.hoffmann@autodrive.de',
    avatarUrl: 'https://i.pravatar.cc/150?u=maria-hoffmann',
    role: UserRole.User,
    companyId: 'comp-010',
    isActive: true,
    lastLogin: '2024-12-18T05:30:00Z',
    createdAt: '2015-09-12T09:00:00Z'
  },
  {
    id: 'user-036',
    name: 'Thomas Bauer',
    email: 'thomas.bauer@autodrive.de',
    avatarUrl: 'https://i.pravatar.cc/150?u=thomas-bauer',
    role: UserRole.User,
    companyId: 'comp-010',
    isActive: true,
    lastLogin: '2024-12-16T11:20:00Z',
    createdAt: '2017-04-05T07:45:00Z'
  },

  // FreshMart Retail (comp-011) - Retail
  {
    id: 'user-037',
    name: 'Robert Johnson',
    email: 'robert.johnson@freshmart.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=robert-johnson',
    role: UserRole.Admin,
    companyId: 'comp-011',
    isActive: true,
    lastLogin: '2024-12-18T13:00:00Z',
    createdAt: '2009-01-15T09:00:00Z'
  },
  {
    id: 'user-038',
    name: 'Patricia Davis',
    email: 'patricia.davis@freshmart.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=patricia-davis',
    role: UserRole.Manager,
    companyId: 'comp-011',
    isActive: true,
    lastLogin: '2024-12-17T20:15:00Z',
    createdAt: '2010-05-28T10:30:00Z'
  },
  {
    id: 'user-039',
    name: 'Michael Wilson',
    email: 'michael.wilson@freshmart.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=michael-wilson',
    role: UserRole.User,
    companyId: 'comp-011',
    isActive: true,
    lastLogin: '2024-12-18T08:30:00Z',
    createdAt: '2012-11-10T08:00:00Z'
  },

  // SecureVault Cyber (comp-012) - Cybersecurity
  {
    id: 'user-040',
    name: 'Yael Cohen',
    email: 'yael.cohen@securevault.il',
    avatarUrl: 'https://i.pravatar.cc/150?u=yael-cohen',
    role: UserRole.Admin,
    companyId: 'comp-012',
    isActive: true,
    lastLogin: '2024-12-18T07:15:00Z',
    createdAt: '2018-10-20T08:00:00Z'
  },
  {
    id: 'user-041',
    name: 'David Levy',
    email: 'david.levy@securevault.il',
    avatarUrl: 'https://i.pravatar.cc/150?u=david-levy',
    role: UserRole.Manager,
    companyId: 'comp-012',
    isActive: true,
    lastLogin: '2024-12-17T21:30:00Z',
    createdAt: '2019-03-05T10:00:00Z'
  },
  {
    id: 'user-042',
    name: 'Noa Shapiro',
    email: 'noa.shapiro@securevault.il',
    avatarUrl: 'https://i.pravatar.cc/150?u=noa-shapiro',
    role: UserRole.User,
    companyId: 'comp-012',
    isActive: true,
    lastLogin: '2024-12-18T06:00:00Z',
    createdAt: '2020-07-22T09:30:00Z'
  },

  // AeroSpace Dynamics (comp-013) - Aerospace
  {
    id: 'user-043',
    name: 'Christopher Evans',
    email: 'christopher.evans@aerospacedyn.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=christopher-evans',
    role: UserRole.Admin,
    companyId: 'comp-013',
    isActive: true,
    lastLogin: '2024-12-18T14:30:00Z',
    createdAt: '2010-07-10T08:00:00Z'
  },
  {
    id: 'user-044',
    name: 'Dr. Amanda Hughes',
    email: 'amanda.hughes@aerospacedyn.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=amanda-hughes',
    role: UserRole.Manager,
    companyId: 'comp-013',
    isActive: true,
    lastLogin: '2024-12-17T12:00:00Z',
    createdAt: '2011-11-25T10:30:00Z'
  },
  {
    id: 'user-045',
    name: 'Kevin Wright',
    email: 'kevin.wright@aerospacedyn.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=kevin-wright',
    role: UserRole.User,
    companyId: 'comp-013',
    isActive: true,
    lastLogin: '2024-12-18T09:00:00Z',
    createdAt: '2014-06-18T07:45:00Z'
  },

  // GourmetChef Foods (comp-014) - Food & Beverage
  {
    id: 'user-046',
    name: 'Jean-Pierre Dubois',
    email: 'jeanpierre.dubois@gourmetchef.fr',
    avatarUrl: 'https://i.pravatar.cc/150?u=jeanpierre-dubois',
    role: UserRole.Admin,
    companyId: 'comp-014',
    isActive: true,
    lastLogin: '2024-12-18T08:45:00Z',
    createdAt: '2016-03-25T09:00:00Z'
  },
  {
    id: 'user-047',
    name: 'Marie Laurent',
    email: 'marie.laurent@gourmetchef.fr',
    avatarUrl: 'https://i.pravatar.cc/150?u=marie-laurent',
    role: UserRole.Manager,
    companyId: 'comp-014',
    isActive: true,
    lastLogin: '2024-12-17T17:00:00Z',
    createdAt: '2017-08-10T10:30:00Z'
  },
  {
    id: 'user-048',
    name: 'Antoine Moreau',
    email: 'antoine.moreau@gourmetchef.fr',
    avatarUrl: 'https://i.pravatar.cc/150?u=antoine-moreau',
    role: UserRole.User,
    companyId: 'comp-014',
    isActive: true,
    lastLogin: '2024-12-18T07:00:00Z',
    createdAt: '2019-01-05T08:00:00Z'
  },

  // Stellar Entertainment (comp-015) - Media & Entertainment
  {
    id: 'user-049',
    name: 'Alexandra Stone',
    email: 'alexandra.stone@stellarent.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=alexandra-stone',
    role: UserRole.Admin,
    companyId: 'comp-015',
    isActive: true,
    lastLogin: '2024-12-18T15:00:00Z',
    createdAt: '2017-12-01T10:00:00Z'
  },
  {
    id: 'user-050',
    name: 'Tyler Brooks',
    email: 'tyler.brooks@stellarent.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=tyler-brooks',
    role: UserRole.Manager,
    companyId: 'comp-015',
    isActive: true,
    lastLogin: '2024-12-17T14:30:00Z',
    createdAt: '2018-06-20T11:00:00Z'
  },

  // BuildRight Construction (comp-016) - Construction
  {
    id: 'user-051',
    name: 'Ahmed Al-Rashid',
    email: 'ahmed.alrashid@buildright.ae',
    avatarUrl: 'https://i.pravatar.cc/150?u=ahmed-alrashid',
    role: UserRole.Admin,
    companyId: 'comp-016',
    isActive: true,
    lastLogin: '2024-12-18T05:00:00Z',
    createdAt: '2013-04-15T08:00:00Z'
  },
  {
    id: 'user-052',
    name: 'Fatima Hassan',
    email: 'fatima.hassan@buildright.ae',
    avatarUrl: 'https://i.pravatar.cc/150?u=fatima-hassan',
    role: UserRole.Manager,
    companyId: 'comp-016',
    isActive: true,
    lastLogin: '2024-12-17T16:00:00Z',
    createdAt: '2014-09-28T10:30:00Z'
  },
  {
    id: 'user-053',
    name: 'Omar Khalil',
    email: 'omar.khalil@buildright.ae',
    avatarUrl: 'https://i.pravatar.cc/150?u=omar-khalil',
    role: UserRole.User,
    companyId: 'comp-016',
    isActive: true,
    lastLogin: '2024-12-18T04:30:00Z',
    createdAt: '2016-02-14T09:00:00Z'
  },

  // PharmaCore Industries (comp-017) - Pharmaceuticals
  {
    id: 'user-054',
    name: 'Dr. Stefan Richter',
    email: 'stefan.richter@pharmacore.ch',
    avatarUrl: 'https://i.pravatar.cc/150?u=stefan-richter',
    role: UserRole.Admin,
    companyId: 'comp-017',
    isActive: true,
    lastLogin: '2024-12-18T07:30:00Z',
    createdAt: '2011-09-10T08:00:00Z'
  },
  {
    id: 'user-055',
    name: 'Dr. Isabelle Dupont',
    email: 'isabelle.dupont@pharmacore.ch',
    avatarUrl: 'https://i.pravatar.cc/150?u=isabelle-dupont',
    role: UserRole.Manager,
    companyId: 'comp-017',
    isActive: true,
    lastLogin: '2024-12-17T13:00:00Z',
    createdAt: '2012-04-22T10:00:00Z'
  },
  {
    id: 'user-056',
    name: 'Martin Keller',
    email: 'martin.keller@pharmacore.ch',
    avatarUrl: 'https://i.pravatar.cc/150?u=martin-keller',
    role: UserRole.User,
    companyId: 'comp-017',
    isActive: true,
    lastLogin: '2024-12-18T06:15:00Z',
    createdAt: '2015-08-30T09:30:00Z'
  },

  // TravelWise Tours (comp-018) - Travel & Tourism
  {
    id: 'user-057',
    name: 'Jack Williams',
    email: 'jack.williams@travelwise.au',
    avatarUrl: 'https://i.pravatar.cc/150?u=jack-williams',
    role: UserRole.Admin,
    companyId: 'comp-018',
    isActive: true,
    lastLogin: '2024-12-18T00:30:00Z',
    createdAt: '2015-02-20T08:00:00Z'
  },
  {
    id: 'user-058',
    name: 'Sophie Taylor',
    email: 'sophie.taylor@travelwise.au',
    avatarUrl: 'https://i.pravatar.cc/150?u=sophie-taylor',
    role: UserRole.Manager,
    companyId: 'comp-018',
    isActive: true,
    lastLogin: '2024-12-17T22:15:00Z',
    createdAt: '2016-07-08T10:30:00Z'
  },
  {
    id: 'user-059',
    name: 'Liam O\'Connor',
    email: 'liam.oconnor@travelwise.au',
    avatarUrl: 'https://i.pravatar.cc/150?u=liam-oconnor',
    role: UserRole.User,
    companyId: 'comp-018',
    isActive: true,
    lastLogin: '2024-12-17T23:45:00Z',
    createdAt: '2018-11-22T09:00:00Z'
  },

  // SmartHome Devices (comp-019) - Consumer Electronics
  {
    id: 'user-060',
    name: 'Chen Wei',
    email: 'chen.wei@smarthome.cn',
    avatarUrl: 'https://i.pravatar.cc/150?u=chen-wei',
    role: UserRole.Admin,
    companyId: 'comp-019',
    isActive: true,
    lastLogin: '2024-12-18T01:00:00Z',
    createdAt: '2018-06-30T08:00:00Z'
  },
  {
    id: 'user-061',
    name: 'Liu Yang',
    email: 'liu.yang@smarthome.cn',
    avatarUrl: 'https://i.pravatar.cc/150?u=liu-yang',
    role: UserRole.Manager,
    companyId: 'comp-019',
    isActive: true,
    lastLogin: '2024-12-17T18:00:00Z',
    createdAt: '2019-02-14T10:00:00Z'
  },
  {
    id: 'user-062',
    name: 'Zhang Min',
    email: 'zhang.min@smarthome.cn',
    avatarUrl: 'https://i.pravatar.cc/150?u=zhang-min',
    role: UserRole.User,
    companyId: 'comp-019',
    isActive: true,
    lastLogin: '2024-12-18T00:15:00Z',
    createdAt: '2020-09-05T09:30:00Z'
  },

  // LegalEase Partners (comp-020) - Legal Services
  {
    id: 'user-063',
    name: 'Victoria Morgan',
    email: 'victoria.morgan@legalease.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=victoria-morgan',
    role: UserRole.Admin,
    companyId: 'comp-020',
    isActive: true,
    lastLogin: '2024-12-18T10:45:00Z',
    createdAt: '2014-08-25T09:00:00Z'
  },
  {
    id: 'user-064',
    name: 'Daniel Brooks',
    email: 'daniel.brooks@legalease.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=daniel-brooks',
    role: UserRole.Manager,
    companyId: 'comp-020',
    isActive: true,
    lastLogin: '2024-12-17T15:30:00Z',
    createdAt: '2015-12-10T10:30:00Z'
  },
  {
    id: 'user-065',
    name: 'Rebecca Harris',
    email: 'rebecca.harris@legalease.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=rebecca-harris',
    role: UserRole.User,
    companyId: 'comp-020',
    isActive: true,
    lastLogin: '2024-12-18T09:30:00Z',
    createdAt: '2017-05-18T08:00:00Z'
  }
];
