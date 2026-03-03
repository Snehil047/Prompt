import { WasteReport } from '@/types';
import { MapPin, Clock } from 'lucide-react';

export default function DashboardTable({ reports }: { reports: WasteReport[] }) {
  if (reports.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-12 text-center shadow-sm">
        <p className="text-slate-500">No issues reported yet. Click "Report New Issue" to start.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-700 uppercase font-semibold border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">Image</th>
              <th className="px-6 py-4">Locality / Address</th>
              <th className="px-6 py-4">Issue Description</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {reports.map((report) => (
              <tr key={report.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                    <img src={report.imageUrl} alt="Waste issue" className="w-full h-full object-cover" />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-900">{report.locality}</div>
                  <div className="flex items-start text-xs text-slate-500 mt-1 max-w-[200px]">
                    <MapPin className="w-3 h-3 mr-1 mt-0.5 shrink-0" />
                    <span className="truncate">{report.address}</span>
                  </div>
                </td>
                <td className="px-6 py-4 max-w-xs">
                  <p className="truncate text-slate-700">{report.description}</p>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
                    {report.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-slate-500">
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {new Date(report.createdAt).toLocaleDateString()}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

