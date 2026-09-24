/**
 * Mock user database for NovaPulse authentication demo.
 */
export const MOCK_USERS = [
  {
    id: "usr_01",
    name: "Alex Dev",
    email: "alex.dev@novapulse.io",
    password: "Password123!",
    role: "Senior Cloud Architect",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    tier: "Enterprise Pro",
    lastLogin: "2026-09-23 10:14 PM",
    stats: {
      projectsActive: 14,
      apiCallsToday: "148.2k",
      uptime: "99.98%"
    }
  },
  {
    id: "usr_02",
    name: "Elena Rostova",
    email: "elena.lead@novapulse.io",
    password: "SuperNova2026#",
    role: "Product Director",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    tier: "Executive Admin",
    lastLogin: "2026-09-23 08:30 PM",
    stats: {
      projectsActive: 28,
      apiCallsToday: "412.0k",
      uptime: "100.0%"
    }
  },
  {
    id: "usr_03",
    name: "Marcus Vance",
    email: "marcus@novapulse.io",
    password: "MockPassword2026",
    role: "Full Stack Engineer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    tier: "Developer Standard",
    lastLogin: "2026-09-22 04:15 PM",
    stats: {
      projectsActive: 6,
      apiCallsToday: "45.1k",
      uptime: "99.95%"
    }
  }
];
