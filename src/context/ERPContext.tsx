import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  PerspectiveMode, 
  Lead, 
  InventoryItem, 
  Supplier, 
  PurchaseOrder, 
  Warranty, 
  WarrantyClaim, 
  MaintenancePlan, 
  Notification, 
  AuditLog,
  PaymentStageId,
  StageId,
  KanbanColumnId,
  TimeEntry,
  ExpenseItem,
  AuthUser,
  ModuleKey
} from '../types/erp';

const initialLeads: Lead[] = [
  {
    id: 'LEAD-1001',
    customerName: 'Marcus Vance',
    phone: '+61 412 890 123',
    email: 'm.vance@melbourne-res.com.au',
    address: '42 Toorak Road, South Yarra VIC 3141',
    source: 'Google Ads',
    aiQualificationScore: 94,
    aiQualified: true,
    aiQualificationNotes: 'Roof leaking over master bedroom after recent storm. House built 1998, metal Colorbond roof.',
    stage: 3,
    kanbanColumn: 'inspection',
    assignedInspector: 'Peter',
    googleCalendarSynced: true,
    inspectionScheduledTime: 'Today at 2:00 PM',
    totalProjectValue: 24500,
    jobCosting: {
      contractValue: 24500,
      materialCost: 8850,
      laborCost: 5200,
      equipmentCost: 2540,
      grossProfit: 7910,
      overheadAllocation: 3675,
      netProfit: 4235,
      netMarginPercent: 17.28
    },
    paymentMilestones: [
      { stage: 1, percentage: 30, name: 'Stage 1: 30% Booking Deposit', amount: 7350, status: 'paid', dueDate: '2026-08-01', paidDate: '2026-08-01', invoiceNumber: 'INV-1001-S1' },
      { stage: 2, percentage: 30, name: 'Stage 2: 30% Material Delivery', amount: 7350, status: 'invoiced', dueDate: '2026-08-10', invoiceNumber: 'INV-1001-S2' },
      { stage: 3, percentage: 30, name: 'Stage 3: 30% Roof Installation', amount: 7350, status: 'pending', dueDate: '2026-08-18' },
      { stage: 4, percentage: 10, name: 'Stage 4: 10% Final Sign-Off', amount: 2450, status: 'pending', dueDate: '2026-08-25' },
    ],
    feedbacks: [
      { stage: 1, stageName: 'Stage 1: Booking & AI Qualification', rating: 5, comments: 'AI Receptionist qualified me in less than 2 mins!', submittedAt: '2026-08-01 09:30', followUpRequired: false },
      { stage: 2, stageName: 'Stage 2: Quotation & Material Setup', rating: 5, comments: 'Clear line items and fast 24h quote turnaround.', submittedAt: '2026-08-02 11:15', followUpRequired: false },
    ],
    inspectionReport: {
      id: 'INSP-1001',
      inspectorName: 'Batshal',
      inspectionDate: '2026-08-06',
      roofType: 'Corrugated Colorbond Steel (Monument Grey)',
      overallCondition: 'Poor',
      roofCamPhotosCount: 14,
      clientNotes: 'Flashing near chimney rusted through; valley gutters clogged creating backflow under sarking.',
      signedOff: true,
      defects: [
        { id: 'DEF-01', location: 'North Chimney Flashing', severity: 'critical', description: 'Rusted lead flashing causing active water entry during rain', photoUrl: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?w=600&auto=format&fit=crop', remedialAction: 'Replace flashing with custom Colorbond apron and counter flashing', asCode: 'AS 4349.1 Cl 3.4' },
        { id: 'DEF-02', location: 'Valley Gutter - West Elevation', severity: 'high', description: 'Heavy corrosion and insufficient drop clearance', photoUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop', remedialAction: 'Install 450mm Colorbond valley tray with Gutter Foam guard', asCode: 'AS 4349.1 Cl 4.1' }
      ]
    },
    quote: {
      id: 'QT-1001',
      quoteNumber: 'EST-2026-891',
      createdDate: '2026-08-06',
      validUntil: '2026-08-20',
      estimateType: 'options',
      status: 'sent',
      viewCount: 4,
      clientViewedAt: '2026-08-06 10:11',
      subtotal: 22272.73,
      gstAmount: 2227.27,
      totalAmount: 24500,
      monthlyFinancingPayment: 680,
      optionTiers: [
        { name: 'Good (Standard Colorbond)', description: '0.42 BMT Colorbond Custom Orb with 10-yr workmanship warranty.', totalAmount: 24500, monthlyFinancing: 680, features: ['Colorbond Standard', 'R4.0 Insulation', '10-Yr Workmanship'] },
        { name: 'Better (Ultra Coastal Colorbond)', description: '0.48 BMT Marine-grade Colorbond Ultra with high-salinity corrosion protection.', totalAmount: 28900, monthlyFinancing: 795, features: ['Colorbond Ultra Coastal', 'R5.0 Insulation', '15-Yr Workmanship'] },
        { name: 'Best (Architectural Standing Seam)', description: 'Premium European Standing Seam profile with concealed fasteners.', totalAmount: 36500, monthlyFinancing: 990, features: ['Architectural Standing Seam', 'R6.0 Insulation', '20-Yr Workmanship'] }
      ],
      lineItems: [
        { id: 'LI-1', description: 'Remove old corrugated tin and dispose', quantity: 180, unitPrice: 35, total: 6300, category: 'Waste Removal' },
        { id: 'LI-2', description: 'Supply & Install Colorbond Custom Orb 0.42 BMT Monument', quantity: 180, unitPrice: 65, total: 11700, category: 'Materials' },
        { id: 'LI-3', description: 'Heavy Duty Roof Sarking & Bradford R4.0 Insulation', quantity: 180, unitPrice: 22, total: 3960, category: 'Materials' },
        { id: 'LI-4', description: 'Perimeter Safety Guardrail Scaffolding (AS 1576)', quantity: 1, unitPrice: 2540, total: 2540, category: 'Safety & Scaffolding' }
      ]
    },
    contractSigned: false,
    crewAssigned: false,
    crewLeader: 'Batshal',
    crewMembersCount: 4,
    materialsReady: true,
    qcPassed: false,
    googleReviewSent: false,
    googleReviewClicked: false,
    referralNurtureStage: 'None',
    createdAt: '2026-08-01 09:15',
    tags: ['Urgent Storm Damage', 'Full Replacement']
  },
  {
    id: 'LEAD-1002',
    customerName: 'Sarah Jenkins',
    phone: '+61 401 554 321',
    email: 's.jenkins@brighton.net.au',
    address: '15 Esplanade, Brighton VIC 3186',
    source: 'Meta Ads',
    aiQualificationScore: 88,
    aiQualified: true,
    aiQualificationNotes: 'Wants full roof restoration & re-pointing for terracotta tile roof.',
    stage: 7,
    kanbanColumn: 'in_progress',
    assignedInspector: 'Batshal',
    googleCalendarSynced: true,
    totalProjectValue: 18000,
    jobCosting: {
      contractValue: 18000,
      materialCost: 5400,
      laborCost: 4800,
      equipmentCost: 1500,
      grossProfit: 6300,
      overheadAllocation: 2700,
      netProfit: 3600,
      netMarginPercent: 20.00
    },
    paymentMilestones: [
      { stage: 1, percentage: 30, name: 'Stage 1: 30% Booking Deposit', amount: 5400, status: 'paid', dueDate: '2026-07-15', paidDate: '2026-07-15', invoiceNumber: 'INV-1002-S1' },
      { stage: 2, percentage: 30, name: 'Stage 2: 30% Material Delivery', amount: 5400, status: 'paid', dueDate: '2026-07-28', paidDate: '2026-07-28', invoiceNumber: 'INV-1002-S2' },
      { stage: 3, percentage: 30, name: 'Stage 3: 30% Roof Installation', amount: 5400, status: 'invoiced', dueDate: '2026-08-07', invoiceNumber: 'INV-1002-S3' },
      { stage: 4, percentage: 10, name: 'Stage 4: 10% Final Sign-Off', amount: 1800, status: 'pending', dueDate: '2026-08-15' },
    ],
    feedbacks: [
      { stage: 1, stageName: 'Stage 1: Booking & AI Qualification', rating: 5, comments: 'Fast response.', submittedAt: '2026-07-15', followUpRequired: false },
      { stage: 2, stageName: 'Stage 2: Quotation & Material Setup', rating: 5, comments: 'Materials delivered right on time.', submittedAt: '2026-07-28', followUpRequired: false },
      { stage: 3, stageName: 'Stage 3: Mid-Project Work-In-Progress', rating: 4, comments: 'Batshal and 4-man crew working fast!', submittedAt: '2026-08-06', followUpRequired: false },
    ],
    contractSigned: true,
    contractSignedDate: '2026-07-15',
    crewAssigned: true,
    crewLeader: 'Batshal',
    crewMembersCount: 4,
    materialsReady: true,
    qcPassed: false,
    googleReviewSent: false,
    googleReviewClicked: false,
    referralNurtureStage: 'None',
    createdAt: '2026-07-14 14:20',
    tags: ['Restoration', 'Tile Roof']
  }
];

const initialInventory: InventoryItem[] = [
  { id: 'INV-001', sku: 'CB-MON-042', name: 'Colorbond Custom Orb 0.42 BMT (Monument)', category: 'Roof Sheets', unit: 'sheet', inStock: 340, allocatedToProjects: 180, minStockLevel: 100, unitCost: 42.50, supplierName: 'Stramit Roofing Products', warehouseLocation: 'Bay A-12', barcode: '9312345000012', lastRestocked: '2026-08-01' },
  { id: 'INV-002', sku: 'CB-DUS-042', name: 'Colorbond Custom Orb 0.42 BMT (Dune)', category: 'Roof Sheets', unit: 'sheet', inStock: 45, allocatedToProjects: 40, minStockLevel: 50, unitCost: 42.50, supplierName: 'Lysaght Australia', warehouseLocation: 'Bay A-14', barcode: '9312345000029', lastRestocked: '2026-07-20' },
  { id: 'INV-003', sku: 'SARK-HD-60', name: 'Heavy Duty Thermatech Roof Sarking (60m Roll)', category: 'Insulation & Sarking', unit: 'roll', inStock: 18, allocatedToProjects: 8, minStockLevel: 10, unitCost: 185.00, supplierName: 'Bradford Insulation', warehouseLocation: 'Rack B-04', barcode: '9312345000036', lastRestocked: '2026-07-25' }
];

const initialSuppliers: Supplier[] = [
  { id: 'SUP-01', name: 'Stramit Roofing Products', contactPerson: 'John Dsouza', phone: '+61 3 9700 1100', email: 'orders@stramit.com.au', leadTimeDays: 2, rating: 4.9 },
  { id: 'SUP-02', name: 'Lysaght Australia', contactPerson: 'Sarah Mitchell', phone: '+61 3 9540 2200', email: 'sales@lysaght.com', leadTimeDays: 3, rating: 4.7 }
];

const initialPurchaseOrders: PurchaseOrder[] = [
  { id: 'PO-9001', poNumber: 'PO-2026-104', supplierName: 'Stramit Roofing Products', orderDate: '2026-08-04', expectedDelivery: '2026-08-08', status: 'ordered', totalAmount: 7650, itemsCount: 180 }
];

const initialWarranties: Warranty[] = [
  { id: 'WAR-5001', certificateNumber: 'ASSIST-WAR-2026-088', leadId: 'LEAD-1003', customerName: 'David Miller', address: '88 Glenferrie Rd, Hawthorn VIC', issueDate: '2026-07-20', workmanshipExpiry: '2036-07-20', materialsExpiry: '2051-07-20', status: 'active', warrantyPdfUrl: '#', claimsCount: 0 }
];

const initialMaintenancePlans: MaintenancePlan[] = [
  { id: 'MNT-3001', customerName: 'David Miller', address: '88 Glenferrie Rd, Hawthorn VIC', planType: '30-Day Initial', nextScheduledDate: '2026-08-20', status: 'upcoming', annualRevenueValue: 450, autoRemindEnabled: true }
];

const initialNotifications: Notification[] = [
  { id: 'NOTIF-1', title: 'New Lead Qualified 24/7', message: 'AI Receptionist qualified Marcus Vance (South Yarra). Storm damage.', type: 'new_lead', channel: 'in_app', timestamp: '09:18 AM', read: false, priority: 'high' }
];

const initialAuditLogs: AuditLog[] = [
  { id: 'LOG-01', timestamp: '2026-08-06 09:15', user: 'System Admin', action: 'System Scaffolding Completed', module: 'System', details: 'Initialized ERP System with 15 Modules', ipAddress: '120.147.22.10' }
];

const initialTimeEntries: TimeEntry[] = [
  { id: 'TIME-101', employeeName: 'Batshal', role: 'Crew Leader', clockIn: '07:30 AM', locationAddress: '42 Toorak Rd, South Yarra VIC', gpsCoordinates: { lat: -37.8389, lng: 144.9922 }, gpsVerified: true, status: 'active' },
  { id: 'TIME-102', employeeName: 'Peter', role: 'Sales Executive', clockIn: '08:00 AM', locationAddress: '15 Esplanade, Brighton VIC', gpsCoordinates: { lat: -37.9064, lng: 144.9856 }, gpsVerified: true, status: 'active' }
];

const initialExpenses: ExpenseItem[] = [
  { id: 'EXP-501', date: '2026-08-05', category: 'Materials', vendor: 'Stramit Roofing', amount: 4250, leadId: 'LEAD-1001', description: 'Custom Orb Colorbond Sheets Monument', receiptAttached: true },
  { id: 'EXP-502', date: '2026-08-06', category: 'Fuel & Travel', vendor: 'Shell South Yarra', amount: 145, description: 'Fuel for Crew Work Truck #03', receiptAttached: true }
];

interface ERPContextType {
  mode: PerspectiveMode;
  setMode: (mode: PerspectiveMode) => void;
  activeModule: ModuleKey;
  setActiveModule: (module: ModuleKey) => void;
  authUser: AuthUser | null;
  logout: () => void;
  leads: Lead[];
  inventory: InventoryItem[];
  suppliers: Supplier[];
  purchaseOrders: PurchaseOrder[];
  warranties: Warranty[];
  warrantyClaims: WarrantyClaim[];
  maintenancePlans: MaintenancePlan[];
  notifications: Notification[];
  auditLogs: AuditLog[];
  timeEntries: TimeEntry[];
  expenses: ExpenseItem[];
  
  // Actions
  updateLeadStage: (leadId: string, stage: StageId, kanbanColumn?: KanbanColumnId) => void;
  recordPayment: (leadId: string, paymentStage: PaymentStageId) => void;
  addFeedback: (leadId: string, stage: PaymentStageId, rating: number, comments: string) => void;
  addLead: (leadData: Partial<Lead>) => void;
  restockItem: (itemId: string, qty: number) => void;
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;
  triggerGoogleReview: (leadId: string) => void;
  clockInEmployee: (employeeName: string, role: string, address: string) => void;
  clockOutEmployee: (entryId: string) => void;
  addExpense: (expense: Partial<ExpenseItem>) => void;
}

const ERPContext = createContext<ERPContextType | undefined>(undefined);

export const ERPProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<PerspectiveMode>('nepal');
  const [activeModule, setActiveModule] = useState<ModuleKey>('dashboard');
  const [authUser, setAuthUser] = useState<AuthUser | null>(() => {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole') as any;
    if (token && role) {
      return { id: '1', name: localStorage.getItem('userName') || 'System Admin', role: role, email: 'admin@assist.com' };
    }
    return null;
  });

  useEffect(() => {
    const handleAuthChange = () => {
      const token = localStorage.getItem('authToken');
      const role = localStorage.getItem('userRole') as any;
      if (token && role) {
        setAuthUser({ id: '1', name: localStorage.getItem('userName') || 'System Admin', role: role, email: 'admin@assist.com' });
      } else {
        setAuthUser(null);
      }
    };
    window.addEventListener('auth-change', handleAuthChange);
    return () => window.removeEventListener('auth-change', handleAuthChange);
  }, []);

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    setAuthUser(null);
    setActiveModule('dashboard');
    window.dispatchEvent(new Event('auth-change'));
  };
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [suppliers] = useState<Supplier[]>(initialSuppliers);
  const [purchaseOrders] = useState<PurchaseOrder[]>(initialPurchaseOrders);
  const [warranties] = useState<Warranty[]>(initialWarranties);
  const [warrantyClaims] = useState<WarrantyClaim[]>([]);
  const [maintenancePlans] = useState<MaintenancePlan[]>(initialMaintenancePlans);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(initialAuditLogs);
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>(initialTimeEntries);
  const [expenses, setExpenses] = useState<ExpenseItem[]>(initialExpenses);

  const addAuditLog = (user: string, action: string, module: string, details: string) => {
    const newLog: AuditLog = {
      id: `LOG-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      user,
      action,
      module,
      details,
      ipAddress: '120.147.22.10'
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const updateLeadStage = (leadId: string, stage: StageId, kanbanColumn?: KanbanColumnId) => {
    setLeads(prev => prev.map(l => {
      if (l.id === leadId) {
        const updatedColumn = kanbanColumn || (
          stage === 1 ? 'lead' :
          stage === 2 ? 'inspection' :
          stage === 3 ? 'inspection' :
          stage === 4 ? 'quote' :
          stage === 5 ? 'negotiation' :
          stage === 6 ? 'won' :
          stage === 7 ? 'in_progress' :
          stage === 8 ? 'review' : 'referral'
        );
        return { ...l, stage, kanbanColumn: updatedColumn };
      }
      return l;
    }));
    addAuditLog('System Admin', `Updated Lead Stage to ${stage}`, 'Pipeline', `Lead ID: ${leadId}`);
  };

  const recordPayment = (leadId: string, paymentStage: PaymentStageId) => {
    setLeads(prev => prev.map(l => {
      if (l.id === leadId) {
        const updatedMilestones = l.paymentMilestones.map(m => {
          if (m.stage === paymentStage) {
            return {
              ...m,
              status: 'paid' as const,
              paidDate: new Date().toISOString().substring(0, 10),
              invoiceNumber: `INV-${leadId.replace('LEAD-', '')}-S${paymentStage}`
            };
          }
          return m;
        });

        const allPaid = updatedMilestones.every(m => m.status === 'paid');
        const paidMilestone = updatedMilestones.find(m => m.stage === paymentStage);

        const newNotif: Notification = {
          id: `NOTIF-${Date.now()}`,
          title: `Stage ${paymentStage} Payment Received (${paidMilestone?.percentage}%)`,
          message: `${l.customerName} paid $${paidMilestone?.amount.toLocaleString()}. Receipt generated.`,
          type: 'payment_received',
          channel: 'in_app',
          timestamp: 'Just now',
          read: false,
          priority: 'high'
        };
        setNotifications(n => [newNotif, ...n]);

        return {
          ...l,
          paymentMilestones: updatedMilestones,
          qcPassed: allPaid ? true : l.qcPassed,
          stage: allPaid ? 8 : l.stage,
          kanbanColumn: allPaid ? 'completed' : l.kanbanColumn
        };
      }
      return l;
    }));
    addAuditLog('System Admin', `Recorded Stage ${paymentStage} Payment`, 'Payments', `Lead ID: ${leadId}`);
  };

  const addFeedback = (leadId: string, stage: PaymentStageId, rating: number, comments: string) => {
    setLeads(prev => prev.map(l => {
      if (l.id === leadId) {
        const newFeedback = {
          stage,
          stageName: `Stage ${stage} Feedback`,
          rating,
          comments,
          submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
          followUpRequired: rating < 4
        };

        return { ...l, feedbacks: [...l.feedbacks, newFeedback] };
      }
      return l;
    }));
    addAuditLog('Customer Portal', `Submitted Feedback for Stage ${stage}`, 'Customer Feedback', `Rating: ${rating} stars`);
  };

  const addLead = (leadData: Partial<Lead>) => {
    const totalVal = leadData.totalProjectValue || 22000;
    const newLead: Lead = {
      id: `LEAD-${1000 + leads.length + 1}`,
      customerName: leadData.customerName || 'New Customer',
      phone: leadData.phone || '+61 400 000 000',
      email: leadData.email || 'client@example.com',
      address: leadData.address || 'Melbourne VIC',
      source: leadData.source || 'Google Ads',
      aiQualificationScore: 92,
      aiQualified: true,
      aiQualificationNotes: 'Qualified via AI Receptionist 24/7.',
      stage: 1,
      kanbanColumn: 'lead',
      assignedInspector: 'Peter',
      googleCalendarSynced: true,
      totalProjectValue: totalVal,
      jobCosting: {
        contractValue: totalVal,
        materialCost: totalVal * 0.35,
        laborCost: totalVal * 0.25,
        equipmentCost: totalVal * 0.10,
        grossProfit: totalVal * 0.30,
        overheadAllocation: totalVal * 0.15,
        netProfit: totalVal * 0.15,
        netMarginPercent: 15.00
      },
      paymentMilestones: [
        { stage: 1, percentage: 30, name: 'Stage 1: 30% Booking Deposit', amount: totalVal * 0.3, status: 'pending', dueDate: 'Immediate' },
        { stage: 2, percentage: 30, name: 'Stage 2: 30% Material Delivery', amount: totalVal * 0.3, status: 'pending', dueDate: 'Day 5' },
        { stage: 3, percentage: 30, name: 'Stage 3: 30% Roof Installation', amount: totalVal * 0.3, status: 'pending', dueDate: 'Day 12' },
        { stage: 4, percentage: 10, name: 'Stage 4: 10% Final Sign-Off', amount: totalVal * 0.1, status: 'pending', dueDate: 'Day 15' },
      ],
      feedbacks: [],
      contractSigned: false,
      crewAssigned: false,
      crewLeader: 'Batshal',
      crewMembersCount: 4,
      materialsReady: false,
      qcPassed: false,
      googleReviewSent: false,
      googleReviewClicked: false,
      referralNurtureStage: 'None',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      tags: ['New Lead']
    };
    setLeads(prev => [newLead, ...prev]);
    addAuditLog('System Admin', 'Captured New Lead', 'CRM', `Customer: ${newLead.customerName}`);
  };

  const restockItem = (itemId: string, qty: number) => {
    setInventory(prev => prev.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          inStock: item.inStock + qty,
          lastRestocked: new Date().toISOString().substring(0, 10)
        };
      }
      return item;
    }));
    addAuditLog('Inventory Manager', `Restocked Item +${qty}`, 'Inventory ERP', `SKU Item ID: ${itemId}`);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearAllNotifications = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const triggerGoogleReview = (leadId: string) => {
    setLeads(prev => prev.map(l => {
      if (l.id === leadId) {
        return {
          ...l,
          googleReviewSent: true,
          googleReviewClicked: true,
          stage: 9,
          kanbanColumn: 'referral'
        };
      }
      return l;
    }));
    addAuditLog('Automation Engine', 'Triggered Google Review Multiplier', 'Marketing', `Lead ID: ${leadId}`);
  };

  const clockInEmployee = (employeeName: string, role: string, address: string) => {
    const newEntry: TimeEntry = {
      id: `TIME-${Date.now()}`,
      employeeName,
      role,
      clockIn: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      locationAddress: address,
      gpsCoordinates: { lat: -37.8136, lng: 144.9631 },
      gpsVerified: true,
      status: 'active'
    };
    setTimeEntries(prev => [newEntry, ...prev]);
    addAuditLog('EmployeeHub', `GPS Clock-In by ${employeeName}`, 'TimeTracker Pro', address);
  };

  const clockOutEmployee = (entryId: string) => {
    setTimeEntries(prev => prev.map(t => {
      if (t.id === entryId) {
        return {
          ...t,
          clockOut: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'completed' as const
        };
      }
      return t;
    }));
    addAuditLog('EmployeeHub', 'GPS Clock-Out', 'TimeTracker Pro', `Entry ID: ${entryId}`);
  };

  const addExpense = (expense: Partial<ExpenseItem>) => {
    const newExpense: ExpenseItem = {
      id: `EXP-${Date.now()}`,
      date: new Date().toISOString().substring(0, 10),
      category: expense.category || 'Materials',
      vendor: expense.vendor || 'Supplier',
      amount: expense.amount || 0,
      description: expense.description || 'Business Expense',
      receiptAttached: true
    };
    setExpenses(prev => [newExpense, ...prev]);
    addAuditLog('Financial ERP', `Logged Expense $${newExpense.amount}`, 'Expenses', newExpense.description);
  };

  return (
    <ERPContext.Provider value={{
      mode,
      setMode,
      activeModule,
      setActiveModule,
      authUser,
      logout,
      leads,
      inventory,
      suppliers,
      purchaseOrders,
      warranties,
      warrantyClaims,
      maintenancePlans,
      notifications,
      auditLogs,
      timeEntries,
      expenses,
      updateLeadStage,
      recordPayment,
      addFeedback,
      addLead,
      restockItem,
      markNotificationRead,
      clearAllNotifications,
      triggerGoogleReview,
      clockInEmployee,
      clockOutEmployee,
      addExpense
    }}>
      {children}
    </ERPContext.Provider>
  );
};

export const useERP = () => {
  const context = useContext(ERPContext);
  if (!context) {
    throw new Error('useERP must be used within an ERPProvider');
  }
  return context;
};
