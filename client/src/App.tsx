import { useAuth } from "@/hooks/useAuth";
import { AuthForm } from "@/components/AuthForm";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "./components/Header";

const App = () => {
  const { user, isLoading, login, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  if (!user) {
    return (
      <>
        <AuthForm onAuth={login} isLoading={isLoading} />
        <Toaster />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header user={user} onLogout={handleLogout} />

      <Toaster />
    </div>
  );
};

export default App;
