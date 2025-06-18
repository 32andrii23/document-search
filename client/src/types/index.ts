export interface Document {
  id: string;
  filename: string;
  uploadDate: string;
  content: string;
  type: "pdf" | "docx";
}

export interface SearchResult {
  document: Document;
  highlights: string[];
}

export interface User {
  email: string;
}
