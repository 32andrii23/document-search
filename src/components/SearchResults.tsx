import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Calendar } from "lucide-react";
import type { SearchResult as ApiSearchResult } from "@/hooks/useSearch";
import { highlightText } from "@/lib/highlight";

interface SearchResultsProps {
  results: ApiSearchResult[];
}

export function SearchResults({ results }: SearchResultsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Search Results ({results.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-4">
            {results.map((result) => (
              <div key={result.document_id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4" />
                    <span className="font-medium">{result.filename}</span>
                    <Badge variant="secondary">{result.score.toFixed(2)}</Badge>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Calendar className="h-3 w-3" />
                    {new Date(result.uploaded_at).toLocaleDateString()}
                  </div>
                </div>
                <div className="space-y-2">
                  {result.highlight.map((highlight, index) => (
                    <div
                      key={index}
                      className="text-sm bg-gray-50 dark:bg-gray-800 p-2 rounded"
                    >
                      ...{highlightText(highlight)}...
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
