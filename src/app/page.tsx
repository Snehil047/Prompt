"use client";

import { useState, useMemo } from "react";
import {
  PlusCircle,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  MapPin,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import DashboardTable from "@/components/DashboardTable";
import ReportModal from "@/components/ReportModal";
import { WasteReport, ReportFormValues } from "@/types";
import Toast from "@/components/Toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

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

  // Generate chart data
  const chartData = useMemo(() => {
    return [
      { day: "Mon", reports: Math.floor(Math.random() * 20) + 5 },
      { day: "Tue", reports: Math.floor(Math.random() * 20) + 8 },
      { day: "Wed", reports: Math.floor(Math.random() * 20) + 12 },
      { day: "Thu", reports: Math.floor(Math.random() * 20) + 6 },
      { day: "Fri", reports: Math.floor(Math.random() * 20) + 15 },
      { day: "Sat", reports: Math.floor(Math.random() * 20) + 18 },
      { day: "Sun", reports: Math.floor(Math.random() * 20) + 22 },
    ];
  }, []);

  // Calculate trend (mock data for percentage changes)
  const totalTrend = 26.01;
  const pendingTrend = -24.2;
  const inProgressTrend = 18.3;
  const resolutionTrend = 12.5;

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
        {/* Analytics Overview */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Analytics Overview
          </h2>

          {/* Stats Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Total Reports Card */}
            <div className="group rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm p-6 hover:border-blue-500/30 hover:bg-card/60 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                  <MapPin className="w-6 h-6 text-blue-400" />
                </div>
              </div>
              <p className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                {stats.total.toLocaleString()}
              </p>
              <p className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
                Total Reports
              </p>
              <div className="flex items-center gap-1">
                <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-semibold text-emerald-400">
                  +{totalTrend.toFixed(2)}%
                </span>
              </div>
            </div>

            {/* Pending Card */}
            <div className="group rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm p-6 hover:border-purple-500/30 hover:bg-card/60 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                  <AlertCircle className="w-6 h-6 text-purple-400" />
                </div>
              </div>
              <p className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                {stats.pending.toLocaleString()}
              </p>
              <p className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
                Pending
              </p>
              <div className="flex items-center gap-1">
                <ArrowDownRight className="w-4 h-4 text-red-400" />
                <span className="text-xs font-semibold text-red-400">
                  {pendingTrend.toFixed(1)}%
                </span>
              </div>
            </div>

            {/* In Progress Card */}
            <div className="group rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm p-6 hover:border-yellow-500/30 hover:bg-card/60 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center group-hover:bg-yellow-500/30 transition-colors">
                  <BarChart3 className="w-6 h-6 text-yellow-400" />
                </div>
              </div>
              <p className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                {stats.inProgress.toLocaleString()}
              </p>
              <p className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
                In Progress
              </p>
              <div className="flex items-center gap-1">
                <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-semibold text-emerald-400">
                  +{inProgressTrend.toFixed(1)}%
                </span>
              </div>
            </div>

            {/* Resolution Rate Card */}
            <div className="group rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm p-6 hover:border-emerald-500/30 hover:bg-card/60 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                </div>
              </div>
              <p className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                {stats.resolutionRate}%
              </p>
              <p className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
                Engagement Rate
              </p>
              <div className="flex items-center gap-1">
                <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-semibold text-emerald-400">
                  +{resolutionTrend.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Engagement Chart */}
          <div className="lg:col-span-1 rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm p-6">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-foreground mb-1">
                Most Recent Activity
              </h3>
              <p className="text-xs text-muted-foreground">
                Engagement metrics
              </p>
            </div>

            {/* Circular Progress Chart */}
            <div className="flex flex-col items-center justify-center py-8">
              <div className="relative w-40 h-40 flex items-center justify-center">
                <svg
                  className="w-full h-full transform -rotate-90"
                  viewBox="0 0 160 160"
                >
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="12"
                    className="text-muted/20"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="12"
                    strokeDasharray={`${70 * Math.PI * (stats.resolutionRate / 100) * 2} ${70 * Math.PI * 2}`}
                    strokeLinecap="round"
                    className="transition-all duration-500"
                  />
                  <defs>
                    <linearGradient
                      id="gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="rgb(34, 197, 94)" />
                      <stop offset="100%" stopColor="rgb(59, 130, 246)" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-emerald-400">
                    {stats.resolved.toLocaleString()}
                  </span>
                  <span className="text-xs text-muted-foreground mt-1">
                    Resolved
                  </span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-6">
                You are at {stats.resolutionRate}% of your goal
              </p>
            </div>
          </div>

          {/* Growth Chart */}
          <div className="lg:col-span-2 rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-1">
                  Report Growth
                </h3>
                <p className="text-xs text-muted-foreground">Weekly trend</p>
              </div>
              <div className="bg-emerald-500/20 px-3 py-1 rounded-full">
                <span className="text-xs font-semibold text-emerald-400">
                  +22% growth rate
                </span>
              </div>
            </div>

            {/* Bar Chart */}
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--color-border)"
                  vertical={false}
                />
                <XAxis
                  dataKey="day"
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                  }}
                  formatter={(value) => [value, "Reports"]}
                />
                <Bar
                  dataKey="reports"
                  fill="var(--color-primary)"
                  radius={[8, 8, 0, 0]}
                  isAnimationActive={true}
                />
              </BarChart>
            </ResponsiveContainer>
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
