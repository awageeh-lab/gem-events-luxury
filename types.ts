
export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface ItineraryItem {
  day: number;
  location: string;
  activity: string;
  detail: string;
}

export enum EventType {
  WEDDING = 'Wedding',
  CORPORATE = 'Corporate',
  VIP_TOUR = 'VIP Tour',
  PRIVATE_GALA = 'Private Gala'
}
