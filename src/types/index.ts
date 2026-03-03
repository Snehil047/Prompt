export interface LocationCoordinates {
  lat: number | string;
  lng: number | string;
}

export interface WasteReport {
  id: string;
  imageUrl: string;
  location: LocationCoordinates;
  locality: string;
  address: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
  createdAt: string;
}

export interface ReportFormValues {
  image: File | null;
  lat: string;
  lng: string;
  locality: string;
  address: string;
  description: string;
}

