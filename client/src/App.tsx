import { AuthForm } from "@/components/AuthForm";
import { DocumentUpload } from "@/components/DocumentUpload";
import { Toaster } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { useDocuments } from "@/hooks/useDocuments";
import { Header } from "@/components/Header";
import { DocumentList } from "@/components/DocumentsList";
import { SearchInterface } from "@/components/SearchInterface";

const App = () => {
  const { user, isLoading, login, logout } = useAuth();
  const { documents, deleteDocument } = useDocuments();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {user ? (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <Header user={user} onLogout={handleLogout} />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Tabs defaultValue="search" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="search">Search Documents</TabsTrigger>
                <TabsTrigger value="upload">Upload Document</TabsTrigger>
                <TabsTrigger value="manage">Manage Documents</TabsTrigger>
              </TabsList>

              <TabsContent value="search">
                <SearchInterface
                  documents={documents}
                  onDeleteDocument={deleteDocument}
                />
              </TabsContent>

              <TabsContent value="upload">
                <DocumentUpload />
              </TabsContent>

              <TabsContent value="manage">
                <DocumentList documents={documents} onDelete={deleteDocument} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      ) : (
        <AuthForm onAuth={login} isLoading={isLoading} />
      )}

      <Toaster position="top-center" />
    </>
  );
};

export default App;
