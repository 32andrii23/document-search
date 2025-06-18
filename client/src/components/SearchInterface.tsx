"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Search } from "lucide-react";
import { toast } from "sonner";
import { SearchResults } from "@/components/SearchResults";
import type { Document, SearchResult } from "@/types";

interface SearchInterfaceProps {
  documents: Document[];
  onDeleteDocument: (docId: string) => void;
}

export function SearchInterface({
  documents,
  onDeleteDocument,
}: SearchInterfaceProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const results: SearchResult[] = documents
      .filter(
        (doc) =>
          doc.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.filename.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .map((doc) => {
        const content = doc.content.toLowerCase();
        const query = searchQuery.toLowerCase();
        const highlights: string[] = [];

        // Find highlights in content
        let index = content.indexOf(query);
        while (index !== -1 && highlights.length < 3) {
          const start = Math.max(0, index - 30);
          const end = Math.min(doc.content.length, index + query.length + 30);
          const highlight = doc.content.substring(start, end);
          highlights.push(highlight);
          index = content.indexOf(query, index + 1);
        }

        return { document: doc, highlights };
      });

    setSearchResults(results);

    // Show search result toast
    if (results.length > 0) {
      toast.success(
        `Found ${results.length} result${
          results.length === 1 ? "" : "s"
        } for "${searchQuery}"`
      );
    } else {
      toast.info(`No results found for "${searchQuery}"`);
    }
  };

  const handleDeleteFromSearch = (docId: string) => {
    const doc = documents.find((d) => d.id === docId);
    onDeleteDocument(docId);

    // Update search results
    setSearchResults((prev) =>
      prev.filter((result) => result.document.id !== docId)
    );

    if (doc) {
      toast.success(`${doc.filename} deleted successfully`);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Search Documents</CardTitle>
          <CardDescription>
            Search through your uploaded documents by filename or content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              placeholder="Enter search query..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button onClick={handleSearch}>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {searchResults.length > 0 && (
        <SearchResults
          results={searchResults}
          searchQuery={searchQuery}
          onDeleteDocument={handleDeleteFromSearch}
        />
      )}

      {searchQuery && searchResults.length === 0 && (
        <Alert>
          <AlertDescription>
            No documents found matching your search query.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
