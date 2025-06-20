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
import { useSearch } from "@/hooks/useSearch";
import type { SearchResult as ApiSearchResult } from "@/hooks/useSearch";

export function SearchInterface() {
  const [searchQuery, setSearchQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const { data, isLoading, isError } = useSearch(submittedQuery);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSubmittedQuery("");
      toast.info("Please enter a search query");
      return;
    }
    setSubmittedQuery(searchQuery);
  };

  const results: ApiSearchResult[] = data?.data?.results || [];

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
            <Button onClick={handleSearch} disabled={isLoading}>
              <Search className="h-4 w-4 mr-2" />
              {isLoading ? "Searching..." : "Search"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {isError && (
        <Alert>
          <AlertDescription>
            Error occurred while searching. Please try again.
          </AlertDescription>
        </Alert>
      )}

      {results.length > 0 && <SearchResults results={results} />}

      {submittedQuery && !isLoading && results.length === 0 && !isError && (
        <Alert>
          <AlertDescription>
            No documents found matching your search query.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
