export interface Place {
  id: string;
  name: string;
  description?: string;
  category?: string;
  notes?: string;
  latitude?: number;
  longitude?: number;
  hasCoordinates?: false;
}
