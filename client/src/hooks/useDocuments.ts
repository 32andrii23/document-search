import { useState, useEffect } from "react";
import type { Document, User } from "@/types";

export function useDocuments(user: User | null) {
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    if (user) {
      loadUserDocuments(user.email);
    } else {
      setDocuments([]);
    }
  }, [user]);

  const loadUserDocuments = (userEmail: string) => {
    const savedDocs = localStorage.getItem(`fileSearcher_docs_${userEmail}`);
    if (savedDocs) {
      setDocuments(JSON.parse(savedDocs));
    }
  };

  const saveUserDocuments = (userEmail: string, docs: Document[]) => {
    localStorage.setItem(
      `fileSearcher_docs_${userEmail}`,
      JSON.stringify(docs)
    );
  };

  const addDocument = (doc: Document) => {
    if (!user) return;

    const updatedDocs = [...documents, doc];
    setDocuments(updatedDocs);
    saveUserDocuments(user.email, updatedDocs);
  };

  const deleteDocument = (docId: string) => {
    if (!user) return;

    const updatedDocs = documents.filter((doc) => doc.id !== docId);
    setDocuments(updatedDocs);
    saveUserDocuments(user.email, updatedDocs);
  };

  return { documents, addDocument, deleteDocument };
}
