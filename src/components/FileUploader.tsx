import { useCallback, useState } from 'react';
import { UploadCloud, X } from 'lucide-react';

interface FileUploaderProps {
  onFileSelect: (file: File | null) => void;
  error?: string;
}

export default function FileUploader({ onFileSelect, error }: FileUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) processFile(file);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const processFile = (file: File) => {
    setPreview(URL.createObjectURL(file));
    onFileSelect(file);
  };

  const clearFile = () => {
    setPreview(null);
    onFileSelect(null);
  };

  return (
    <div className="w-full">
      {!preview ? (
        <label
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer hover:bg-slate-50 transition-colors ${
            error ? 'border-red-400 bg-red-50' : 'border-slate-300 bg-slate-50'
          }`}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <UploadCloud className={`w-8 h-8 mb-3 ${error ? 'text-red-500' : 'text-slate-400'}`} />
            <p className="mb-2 text-sm text-slate-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-slate-400">PNG, JPG, or WEBP (MAX. 5MB)</p>
          </div>
          <input type="file" className="hidden" accept="image/*" onChange={handleChange} />
        </label>
      ) : (
        <div className="relative w-full h-40 rounded-xl overflow-hidden border border-slate-200">
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          <button type="button" onClick={clearFile} className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full hover:bg-black/70 backdrop-blur-sm transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      {error && <p className="mt-1.5 text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
}

