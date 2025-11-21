export type EventTypes = {
  id: string;
  documentId: string;
  title: string;
  description: string;
  location: string;
  date: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};
export type PreCongregations = {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  category: string;
  imageLink: string;
  eventLink: string;
};
export type PreviousEvents = {
  id: string;
  documentId: string;
  title: string;
  description: string;
  location: string;
  date: string;
  eventLink?: string | null;
  image?: string;
};
export type BlogType = {
  id: string;
  documentId: string;
  title: string;
  summary: string;
  author: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  description: string;
};
export type MagazineType = {
  id: string;
  documentId: string;
  title: string;
  slug: string;
  date: string;
  magazineLink: string;
  image?: string;
};

export type LegalDocs = {
  id: string;
  documentId: string;
  title: string;
  fileLink: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};
