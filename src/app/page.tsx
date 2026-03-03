"use client";

import { useState, useMemo } from "react";
import {
  PlusCircle,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  MapPin,
  TrendingUp,
} from "lucide-react";
import DashboardTable from "@/components/DashboardTable";
import ReportModal from "@/components/ReportModal";
import { WasteReport, ReportFormValues } from "@/types";
import Toast from "@/components/Toast";

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reports, setReports] = useState<WasteReport[]>([]);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleReportSubmit = (values: ReportFormValues) => {
    try {
      const newReport: WasteReport = {
        id: Math.random().toString(36).substring(2, 9),
        imageUrl: values.image ? URL.createObjectURL(values.image) : "",
        location: { lat: values.lat, lng: values.lng },
        locality: values.locality,
        address: values.address,
        description: values.description,
        status: "Pending",
        createdAt: new Date().toISOString(),
      };

      setReports((prev) => [newReport, ...prev]);
      setIsModalOpen(false);
      showToast("Issue reported successfully", "success");
    } catch (error) {
      showToast("Failed to submit report. Please try again.", "error");
    }
  };

  // Calculate statistics
  const stats = useMemo(() => {
    const pending = reports.filter((r) => r.status === "Pending").length;
    const inProgress = reports.filter((r) => r.status === "In Progress").length;
    const resolved = reports.filter((r) => r.status === "Resolved").length;

    return {
      total: reports.length,
      pending,
      inProgress,
      resolved,
      resolutionRate:
        reports.length > 0 ? Math.round((resolved / reports.length) * 100) : 0,
    };
  }, [reports]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95">
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          className="fixed top-6 right-6 z-50"
          iconSuccess={<CheckCircle2 className="w-5 h-5" />}
          iconError={<AlertCircle className="w-5 h-5" />}
        />
      )}

      {/* Header Section */}
      <div className="border-b border-border bg-card/30 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-accent-foreground" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Waste Management
                </h1>
              </div>
              <p className="text-muted-foreground text-sm sm:text-base">
                Track and manage waste issues in your community
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-accent-foreground font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-accent/20 active:scale-95"
            >
              <PlusCircle className="w-5 h-5" />
              Report Issue
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Reports */}
          <div className="group rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm p-6 hover:border-accent/30 hover:bg-card/60 transition-all duration-300">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">
                  Total Reports
                </p>
                <p className="text-3xl sm:text-4xl font-bold text-foreground">
                  {stats.total}
                </p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                <MapPin className="w-5 h-5 text-blue-400" />
              </div>
            </div>
          </div>

          {/* Pending */}
          <div className="group rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm p-6 hover:border-amber-500/30 hover:bg-card/60 transition-all duration-300">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">
                  Pending
                </p>
                <p className="text-3xl sm:text-4xl font-bold text-amber-400">
                  {stats.pending}
                </p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                <AlertCircle className="w-5 h-5 text-amber-400" />
              </div>
            </div>
          </div>

          {/* In Progress */}
          <div className="group rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm p-6 hover:border-blue-500/30 hover:bg-card/60 transition-all duration-300">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">
                  In Progress
                </p>
                <p className="text-3xl sm:text-4xl font-bold text-blue-400">
                  {stats.inProgress}
                </p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                <TrendingUp className="w-5 h-5 text-blue-400" />
              </div>
            </div>
          </div>

          {/* Resolution Rate */}
          <div className="group rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm p-6 hover:border-emerald-500/30 hover:bg-card/60 transition-all duration-300">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">
                  Resolution Rate
                </p>
                <p className="text-3xl sm:text-4xl font-bold text-emerald-400">
                  {stats.resolutionRate}%
                </p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Reports Table Section */}
        <div className="space-y-4">
          <div className="flex items-baseline gap-2">
            <h2 className="text-2xl font-bold text-foreground">
              Recent Reports
            </h2>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-accent/10 text-accent">
              {reports.length} total
            </span>
          </div>
          <DashboardTable reports={reports} />
        </div>
      </div>

      {/* Reporting Modal */}
      <ReportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleReportSubmit}
      />
    </div>
  );
}
