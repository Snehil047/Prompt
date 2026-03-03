'use client';

import { useState } from 'react';
import { PlusCircle, CheckCircle2, AlertCircle } from 'lucide-react';
import DashboardTable from '@/components/DashboardTable';
import ReportModal from '@/components/ReportModal';
import { WasteReport, ReportFormValues } from '@/types';
import Toast from '@/components/Toast';

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reports, setReports] = useState<WasteReport[]>([]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleReportSubmit = (values: ReportFormValues) => {
    try {
      const newReport: WasteReport = {
        id: Math.random().toString(36).substring(2, 9),
        imageUrl: values.image ? URL.createObjectURL(values.image) : '',
        location: { lat: values.lat, lng: values.lng },
        locality: values.locality,
        address: values.address,
        description: values.description,
        status: 'Pending',
        createdAt: new Date().toISOString(),
      };

      setReports((prev) => [newReport, ...prev]);
      setIsModalOpen(false);
      showToast('Issue reported successfully', 'success');
    } catch (error) {
      showToast('Failed to submit report. Please try again.', 'error');
    }
  };

  return (
    <div className="space-y-6 relative">
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          className="fixed top-20 right-8 z-50"
          iconSuccess={<CheckCircle2 className="w-5 h-5 mr-2" />}
          iconError={<AlertCircle className="w-5 h-5 mr-2" />}
        />
      )}

      {/* Action Bar */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Logged Issues</h2>
          <p className="text-sm text-slate-500 mt-1">Manage and track reported waste problems in your area.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Report New Issue
        </button>
      </div>

      {/* Data Table */}
      <DashboardTable reports={reports} />

      {/* Reporting Modal */}
      <ReportModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleReportSubmit} 
      />
    </div>
  );
}

