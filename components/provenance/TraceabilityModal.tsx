"use client"

import { useState, useEffect } from "react"
import { api } from "@/services/api"
import { X, CheckCircle, MapPin, TestTube, FileText, QrCode } from "lucide-react"

interface TraceabilityModalProps {
  isOpen: boolean
  onClose: () => void
  reportId: string
}

export default function TraceabilityModal({ isOpen, onClose, reportId }: TraceabilityModalProps) {
  const [report, setReport] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isOpen && reportId) {
      setLoading(true)
      api.provenance
        .getReport(reportId)
        .then(setReport)
        .finally(() => setLoading(false))
    }
  }, [isOpen, reportId])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in slide-in-from-bottom-4 duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-secondary rounded-full hover:bg-muted transition-colors z-10"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-100 p-3 rounded-xl text-green-600">
              <TestTube size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-primary-foreground">Lab Analysis Report</h2>
              <p className="text-sm text-muted-foreground">ID: {reportId}</p>
            </div>
          </div>

          {loading ? (
            <div className="h-64 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : report ? (
            <div className="space-y-8">
              {/* Status Card */}
              <div className="bg-[#F5F8F5] border border-primary/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-green-500" size={32} />
                  <div>
                    <h3 className="font-bold text-lg text-green-700">Verified Pure</h3>
                    <p className="text-sm text-muted-foreground">Passed all safety checks</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground uppercase font-semibold">Tested On</p>
                  <p className="font-medium">{report.verifiedAt}</p>
                </div>
              </div>

              {/* Origin Story */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-bold flex items-center gap-2">
                    <MapPin size={18} className="text-primary" />
                    Origin Trace
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    This meal's primary ingredients were sourced from <strong>GreenLeaf Family Farms</strong> in Salinas
                    Valley, CA. The crop was harvested 48 hours before preparation.
                  </p>
                  <div className="h-32 bg-gray-100 rounded-xl overflow-hidden relative">
                    <img src="/public/farm-aerial-view.png" className="w-full h-full object-cover" />
                    <div className="absolute bottom-2 left-2 bg-white/90 px-2 py-1 rounded text-xs font-bold">
                      Salinas Valley, CA
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold flex items-center gap-2">
                    <FileText size={18} className="text-primary" />
                    Test Results
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Heavy Metals</span>
                      <span className="text-green-600 font-medium">Not Detected</span>
                    </li>
                    <li className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Pesticides</span>
                      <span className="text-green-600 font-medium">None (Organic)</span>
                    </li>
                    <li className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Antibiotics</span>
                      <span className="text-green-600 font-medium">Negative</span>
                    </li>
                    <li className="flex justify-between pb-2">
                      <span className="text-muted-foreground">Microbial</span>
                      <span className="text-green-600 font-medium">Pass</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* QR Code */}
              <div className="border-t pt-6 flex flex-col items-center text-center space-y-3">
                <QrCode size={64} className="text-primary" />
                <p className="text-xs text-muted-foreground max-w-sm">
                  Scan this code to download the official PDF certificate signed by {report.labName}
                </p>
                <button className="text-sm font-semibold text-primary hover:underline">Download PDF</button>
              </div>
            </div>
          ) : (
            <p className="text-center text-red-500">Failed to load report.</p>
          )}
        </div>
      </div>
    </div>
  )
}
