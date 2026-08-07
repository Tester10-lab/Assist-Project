// ASSIST Roofing ERP Core Types

export type PerspectiveMode = 'nepal' | 'melbourne';

export type StageId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type KanbanColumnId = 
  | 'lead' 
  | 'inspection' 
  | 'quote' 
  | 'negotiation' 
  | 'won' 
  | 'materials_ready' 
  | 'crew_assigned' 
  | 'in_progress' 
  | 'qc' 
  | 'completed' 
  | 'review' 
  | 'referral';

export type PaymentStageId = 1 | 2 | 3 | 4;

export type EstimateType = 'standard' | 'options' | 'package' | 'quick';

export interface OptionTier {
  name: 'Good (Standard Colorbond)' | 'Better (Ultra Coastal Colorbond)' | 'Best (Architectural Standing Seam)';
  description: string;
  totalAmount: number;
  monthlyFinancing: number;
  features: string[];
}

export interface PaymentMilestone {
  stage: PaymentStageId;
  percentage: number; // 30, 30, 30, 10
  name: string;
  amount: number;
  status: 'pending' | 'invoiced' | 'paid' | 'overdue';
  dueDate: string;
  paidDate?: string;
  invoiceNumber?: string;
}

export interface CustomerFeedback {
  stage: PaymentStageId;
  stageName: string;
  rating: number; // 1 to 5 stars
  comments: string;
  submittedAt: string;
  followUpRequired: boolean;
}

export interface DefectItem {
  id: string;
  location: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  photoUrl: string;
  remedialAction: string;
  asCode: string;
}

export interface AS4349InspectionReport {
  id: string;
  inspectorName: string;
  inspectionDate: string;
  roofType: string;
  overallCondition: 'Good' | 'Fair' | 'Poor' | 'Critical Repair Needed';
  defects: DefectItem[];
  roofCamPhotosCount: number;
  clientNotes: string;
  signedOff: boolean;
}

export interface QuoteLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  category: 'Materials' | 'Labor' | 'Safety & Scaffolding' | 'Waste Removal';
}

export interface Quote {
  id: string;
  quoteNumber: string;
  createdDate: string;
  validUntil: string;
  estimateType: EstimateType;
  lineItems: QuoteLineItem[];
  optionTiers?: OptionTier[];
  subtotal: number;
  gstAmount: number;
  totalAmount: number;
  monthlyFinancingPayment?: number; // Affirm/Klarna split e.g. $495/mo
  status: 'draft' | 'sent' | 'viewed' | 'accepted' | 'declined';
  clientViewedAt?: string;
  viewCount: number;
}

export interface TimeEntry {
  id: string;
  employeeName: string; // e.g. "Batshal", "Peter"
  role: string;
  clockIn: string;
  clockOut?: string;
  locationAddress: string;
  gpsCoordinates: { lat: number; lng: number };
  gpsVerified: boolean;
  status: 'active' | 'completed';
}

export interface ExpenseItem {
  id: string;
  date: string;
  category: 'Materials' | 'Fuel & Travel' | 'Equipment Repair' | 'Subcontractor' | 'Safety';
  vendor: string;
  amount: number;
  leadId?: string;
  description: string;
  receiptAttached: boolean;
}

export interface JobCosting {
  contractValue: number;
  materialCost: number;
  laborCost: number;
  equipmentCost: number;
  grossProfit: number;
  overheadAllocation: number; // 15% standard overhead
  netProfit: number;
  netMarginPercent: number;
}

export interface Lead {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  source: 'Google Ads' | 'Meta Ads' | 'SEO' | 'Yard Signs' | 'Local Networking';
  aiQualificationScore: number;
  aiQualified: boolean;
  aiQualificationNotes: string;
  stage: StageId;
  kanbanColumn: KanbanColumnId;
  assignedInspector: 'Peter' | 'Batshal';
  googleCalendarSynced: boolean;
  inspectionScheduledTime?: string;
  inspectionReport?: AS4349InspectionReport;
  quote?: Quote;
  contractSigned: boolean;
  contractSignedDate?: string;
  signatureDataUrl?: string;
  
  paymentMilestones: PaymentMilestone[];
  totalProjectValue: number;
  jobCosting?: JobCosting;
  
  feedbacks: CustomerFeedback[];
  
  crewAssigned: boolean;
  crewLeader: string;
  crewMembersCount: number;
  materialsReady: boolean;
  qcPassed: boolean;
  projectCompletedDate?: string;
  
  googleReviewSent: boolean;
  googleReviewClicked: boolean;
  referralNurtureStage: 'None' | '30-Day' | '90-Day' | '365-Day';
  createdAt: string;
  tags: string[];
}

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: 'Roof Sheets' | 'Gutters & Flashings' | 'Insulation & Sarking' | 'Fasteners' | 'Safety Gear';
  unit: 'sheet' | 'meter' | 'roll' | 'box' | 'pack';
  inStock: number;
  allocatedToProjects: number;
  minStockLevel: number;
  unitCost: number;
  supplierName: string;
  warehouseLocation: string;
  barcode: string;
  lastRestocked: string;
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  leadTimeDays: number;
  rating: number;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplierName: string;
  orderDate: string;
  expectedDelivery: string;
  status: 'draft' | 'ordered' | 'received' | 'cancelled';
  totalAmount: number;
  itemsCount: number;
}

export interface Warranty {
  id: string;
  certificateNumber: string;
  leadId: string;
  customerName: string;
  address: string;
  issueDate: string;
  workmanshipExpiry: string;
  materialsExpiry: string;
  status: 'active' | 'expiring_soon' | 'expired';
  warrantyPdfUrl: string;
  claimsCount: number;
}

export interface WarrantyClaim {
  id: string;
  claimNumber: string;
  warrantyId: string;
  customerName: string;
  issueDescription: string;
  reportedDate: string;
  status: 'pending_inspection' | 'approved' | 'repair_scheduled' | 'resolved' | 'rejected';
  inspectorName: string;
  repairDate?: string;
}

export interface MaintenancePlan {
  id: string;
  customerName: string;
  address: string;
  planType: '30-Day Initial' | '6-Month Gutter' | '12-Month Annual' | '24-Month Bi-Annual' | '36-Month Major';
  nextScheduledDate: string;
  status: 'upcoming' | 'completed' | 'overdue';
  annualRevenueValue: number;
  autoRemindEnabled: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 
    | 'new_lead' 
    | 'inspection_assigned' 
    | 'quote_overdue' 
    | 'contract_signed' 
    | 'material_shortage' 
    | 'crew_dispatched' 
    | 'project_delayed' 
    | 'warranty_expiring' 
    | 'review_received' 
    | 'referral_submitted' 
    | 'automation_failed'
    | 'payment_received'
    | 'feedback_received';
  channel: 'in_app' | 'email' | 'sms';
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  module: string;
  details: string;
  ipAddress: string;
}
