import { Formik, Form, Field } from 'formik';
import { X, MapPin } from 'lucide-react';
import FileUploader from './FileUploader';
import { ReportFormValues } from '@/types';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: ReportFormValues) => void;
}

export default function ReportModal({ isOpen, onClose, onSubmit }: ReportModalProps) {
  if (!isOpen) return null;

  const validate = (values: ReportFormValues) => {
    const errors: Partial<Record<keyof ReportFormValues, string>> = {};
    if (!values.image) errors.image = 'An image of the issue is required.';
    if (!values.lat || !values.lng) errors.lat = 'Precise location is required.';
    if (!values.locality) errors.locality = 'Locality name is required.';
    if (!values.address) errors.address = 'Street address is required.';
    if (!values.description) errors.description = 'Please describe the issue.';
    return errors;
  };

  const handleMockLocation = (setFieldValue: (field: string, value: unknown) => void) => {
    // Mocking Geolocation API for demo purposes
    setFieldValue('lat', '28.4595');
    setFieldValue('lng', '77.0266');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex justify-between items-center z-10">
          <h3 className="text-lg font-bold text-slate-900">Report New Issue</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <Formik
            initialValues={{ image: null, lat: '', lng: '', locality: '', address: '', description: '' }}
            validate={validate}
            onSubmit={(values, { resetForm }) => {
              onSubmit(values);
              resetForm();
            }}
          >
            {({ setFieldValue, errors, touched, isSubmitting }) => (
              <Form className="space-y-6">
                
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Photo of the Issue *</label>
                  <FileUploader 
                    onFileSelect={(file) => setFieldValue('image', file)} 
                    error={touched.image && typeof errors.image === 'string' ? errors.image : undefined} 
                  />
                </div>

                {/* Location Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2 flex items-center justify-between">
                     <label className="block text-sm font-medium text-slate-700">Exact Location *</label>
                     <button
                       type="button"
                       onClick={() => handleMockLocation(setFieldValue)}
                       className="text-xs flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
                     >
                       <MapPin className="w-3 h-3 mr-1" /> Detect Location
                     </button>
                  </div>
                  <div>
                    <Field
                      name="lat"
                      placeholder="Latitude"
                      className={`w-full px-4 py-2.5 rounded-lg border bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all ${
                        errors.lat && touched.lat ? 'border-red-300' : 'border-slate-200'
                      }`}
                    />
                  </div>
                  <div>
                    <Field
                      name="lng"
                      placeholder="Longitude"
                      className={`w-full px-4 py-2.5 rounded-lg border bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all ${
                        errors.lat && touched.lng ? 'border-red-300' : 'border-slate-200'
                      }`}
                    />
                  </div>
                  {errors.lat && touched.lat && (
                    <p className="text-xs text-red-500 sm:col-span-2 font-medium">{errors.lat}</p>
                  )}
                </div>

                {/* Locality & Address */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Locality Name *</label>
                  <Field
                    name="locality"
                    placeholder="e.g., Downtown Sector 4"
                    className={`w-full px-4 py-2.5 rounded-lg border bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all ${
                      errors.locality && touched.locality ? 'border-red-300' : 'border-slate-200'
                    }`}
                  />
                  {errors.locality && touched.locality && (
                    <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.locality}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Street Address *</label>
                  <Field
                    name="address"
                    as="textarea"
                    rows={2}
                    placeholder="Full street address..."
                    className={`w-full px-4 py-2.5 rounded-lg border bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none ${
                      errors.address && touched.address ? 'border-red-300' : 'border-slate-200'
                    }`}
                  />
                  {errors.address && touched.address && (
                    <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.address}</p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Issue Description *</label>
                  <Field
                    name="description"
                    as="textarea"
                    rows={3}
                    placeholder="Describe the waste problem..."
                    className={`w-full px-4 py-2.5 rounded-lg border bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none ${
                      errors.description && touched.description ? 'border-red-300' : 'border-slate-200'
                    }`}
                  />
                  {errors.description && touched.description && (
                    <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.description}</p>
                  )}
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Report'}
                  </button>
                </div>

              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

