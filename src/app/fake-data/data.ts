import { CardType } from '../components/constants';
type DatabaseCard = Omit<CardType, 'borderColor' | 'buttonColor' | 'scrollbarColor'>;

// prettier-ignore
export const fakeCardData: DatabaseCard[] = [
  { id: 'card-0', primary: '#FFCDD2', accent: '#530B67', author: 'Design Co', lastUpdated: "2025-04-07T18:00:00.000Z" },
  { id: 'card-1', primary: '#C8E6C9', accent: '#0D47A1', author: 'Design Co', lastUpdated: "2025-04-05T12:00:00.000Z" },
  { id: 'card-2', primary: '#FFCDD2', accent: '#212121', author: 'Design Co', lastUpdated: "2025-04-07T14:00:00.000Z" },
  { id: 'card-3', primary: '#FFF9C4', accent: '#1B5E20', author: 'Design Co', lastUpdated: "2025-04-01T12:00:00.000Z" },
  { id: 'card-4', primary: '#263238', accent: '#FFFDE7', author: 'Design Co', lastUpdated: "2025-04-08T11:28:00.000Z" },
  { id: 'card-5', primary: '#F8BBD0', accent: '#BF360C', author: 'Design Co', lastUpdated: "2025-04-03T12:00:00.000Z" },
  { id: 'card-6', primary: '#D1C4E9', accent: '#4A148C', author: 'Design Co', lastUpdated: "2025-04-08T09:00:00.000Z" },
  { id: 'card-7', primary: '#DCEDC8', accent: '#0D47A1', author: 'Design Co', lastUpdated: "2025-04-07T12:00:00.000Z" },
  { id: 'card-8', primary: '#B2DFDB', accent: '#004D40', author: 'Design Co', lastUpdated: "2025-04-07T22:00:00.000Z" },
  { id: 'card-9', primary: '#F8BBD0', accent: '#B71C1C', author: 'Design Co', lastUpdated: "2025-04-08T07:00:00.000Z" },
  { id: 'card-10', primary: '#FFE0B2', accent: '#530B67', author: 'Design Co', lastUpdated: "2025-04-06T12:00:00.000Z" },
  { id: 'card-11', primary: '#37474F', accent: '#E3F2FD', author: 'Design Co', lastUpdated: "2025-04-04T12:00:00.000Z" },
  { id: 'card-12', primary: '#FFCDD2', accent: '#530B67', author: 'Design Co', lastUpdated: "2025-04-08T11:20:00.000Z" },
  { id: 'card-13', primary: '#FFE0B2', accent: '#212121', author: 'Design Co', lastUpdated: "2025-04-08T11:04:00.000Z" },
  { id: 'card-14', primary: '#B2EBF2', accent: '#1B5E20', author: 'Design Co', lastUpdated: "2025-04-07T12:00:00.000Z" },
  { id: 'card-15', primary: '#FFCCBC', accent: '#BF360C', author: 'Design Co', lastUpdated: "2025-04-05T12:00:00.000Z" },
  { id: 'card-16', primary: '#CFD8DC', accent: '#4A148C', author: 'Design Co', lastUpdated: "2025-04-07T19:00:00.000Z" },
  { id: 'card-17', primary: '#D7CCC8', accent: '#004D40', author: 'Design Co', lastUpdated: "2025-04-01T12:00:00.000Z" },
  { id: 'card-18', primary: '#FFCDD2', accent: '#B71C1C', author: 'Design Co', lastUpdated: "2025-04-08T00:00:00.000Z" },
  { id: 'card-19', primary: '#FFCCBC', accent: '#530B67', author: 'Design Co', lastUpdated: "2025-04-08T11:11:00.000Z" },
  { id: 'card-20', primary: '#FFECB3', accent: '#0D47A1', author: 'Design Co', lastUpdated: "2025-04-04T12:00:00.000Z" },
  { id: 'card-21', primary: '#C8E6C9', accent: '#1B5E20', author: 'Design Co', lastUpdated: "2025-04-01T12:00:00.000Z" },
  { id: 'card-22', primary: '#BBDEFB', accent: '#212121', author: 'Design Co', lastUpdated: "2025-04-08T08:00:00.000Z" },
  { id: 'card-23', primary: '#FFCDD2', accent: '#BF360C', author: 'Design Co', lastUpdated: "2025-04-08T11:55:00.000Z" },
  { id: 'card-24', primary: '#FFECB3', accent: '#4A148C', author: 'Design Co', lastUpdated: "2025-04-08T11:06:00.000Z" }
];
