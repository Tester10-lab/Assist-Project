import React, { Suspense } from 'react';
import { useERP } from './context/ERPContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { ModuleKey } from './types/erp';

// Default exports are required for React.lazy
const moduleMap: Record<ModuleKey, React.LazyExoticComponent<React.ComponentType<any>>> = {
  dashboard: React.lazy(() => import('./components/modules/DashboardModule').then(m => ({ default: m.DashboardModule }))),
  analytics: React.lazy(() => import('./components/modules/AnalyticsModule').then(m => ({ default: m.AnalyticsModule }))),
  crm_pipeline: React.lazy(() => import('./components/modules/CRMPipelineModule').then(m => ({ default: m.CRMPipelineModule }))),
  kanban: React.lazy(() => import('./components/modules/KanbanBoardModule').then(m => ({ default: m.KanbanBoardModule }))),
  inspections: React.lazy(() => import('./components/modules/InspectionsModule').then(m => ({ default: m.InspectionsModule }))),
  quote_builder: React.lazy(() => import('./components/modules/QuoteBuilderModule').then(m => ({ default: m.QuoteBuilderModule }))),
  instaquote_portal: React.lazy(() => import('./components/modules/InstaQuotePortalModule').then(m => ({ default: m.InstaQuotePortalModule }))),
  contracts: React.lazy(() => import('./components/modules/ContractSignatureModule').then(m => ({ default: m.ContractSignatureModule }))),
  payments_feedback: React.lazy(() => import('./components/modules/PaymentFeedbackModule').then(m => ({ default: m.PaymentFeedbackModule }))),
  business_calculators: React.lazy(() => import('./components/modules/BusinessCalculatorsModule').then(m => ({ default: m.BusinessCalculatorsModule }))),
  employee_hub: React.lazy(() => import('./components/modules/EmployeeHubModule').then(m => ({ default: m.EmployeeHubModule }))),
  job_costing: React.lazy(() => import('./components/modules/JobCostingExpensesModule').then(m => ({ default: m.JobCostingExpensesModule }))),
  crew_management: React.lazy(() => import('./components/modules/ProjectCrewModule').then(m => ({ default: m.ProjectCrewModule }))),
  inventory: React.lazy(() => import('./components/modules/MaterialInventoryModule').then(m => ({ default: m.MaterialInventoryModule }))),
  warranties: React.lazy(() => import('./components/modules/WarrantyManagementModule').then(m => ({ default: m.WarrantyManagementModule }))),
  maintenance: React.lazy(() => import('./components/modules/RecurringMaintenanceModule').then(m => ({ default: m.RecurringMaintenanceModule }))),
  notifications: React.lazy(() => import('./components/modules/NotificationCenterModule').then(m => ({ default: m.NotificationCenterModule }))),
  audit_logs: React.lazy(() => import('./components/modules/AuditLogTimelineModule').then(m => ({ default: m.AuditLogTimelineModule }))),
  settings: React.lazy(() => import('./components/modules/SettingsModule').then(m => ({ default: m.SettingsModule })))
};

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center text-rose-600 font-bold bg-white rounded-xl shadow m-8 border border-rose-200">
          <h2>Something went wrong loading this module.</h2>
          <button className="mt-4 px-4 py-2 bg-rose-100 text-rose-800 rounded" onClick={() => window.location.reload()}>Reload</button>
        </div>
      );
    }
    return this.props.children;
  }
}

const ModuleRenderer = () => {
  const { activeModule, setActiveModule } = useERP();
  const Module = moduleMap[activeModule];

  if (!Module) {
    return (
      <div className="p-8 m-8 bg-white rounded-xl shadow border border-slate-200 text-center">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Module "{activeModule}" not found.</h2>
        <button 
          onClick={() => setActiveModule('dashboard')}
          className="px-4 py-2 bg-emerald-600 text-white rounded font-bold hover:bg-emerald-700"
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto bg-slate-50 relative">
      <ErrorBoundary>
        <Suspense fallback={
          <div className="flex items-center justify-center h-full min-h-[400px]">
            <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        }>
          <Module />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export const ERPApp: React.FC = () => {
  const { authUser } = useERP();

  if (!authUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4 text-slate-800">Authentication Required</h2>
          <button onClick={() => window.location.href = '/'} className="px-6 py-2 bg-brand-900 text-white rounded font-bold">Return to Website</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-900 selection:bg-emerald-500/30 selection:text-emerald-900">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <ModuleRenderer />
      </div>
    </div>
  );
};
