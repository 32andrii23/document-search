export interface Document {
  id: number;
  userEmail: string;
  filename: string;
  s3Url: string;
  uploadedAt: string;
}

export interface SearchResult {
  document: Document;
  highlights: string[];
}

export interface User {
  email: string;
}
