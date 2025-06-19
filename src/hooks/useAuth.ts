import { useState, useEffect } from "react";
import { toast } from "sonner";
import type { User } from "@/types";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("fileSearcher_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string) => {
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (!email.includes("@")) {
        setIsLoading(false);
        toast.error("Please enter a valid email address");
        throw new Error("Invalid email");
      }

      const userData = { email };
      setUser(userData);
      localStorage.setItem("fileSearcher_user", JSON.stringify(userData));

      toast.success(`Welcome, ${email}!`);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error instanceof Error && error.message !== "Invalid email") {
        toast.error("Failed to sign in. Please try again.");
      }
      throw error;
    }
  };

  const logout = () => {
    const userEmail = user?.email;
    setUser(null);
    localStorage.removeItem("fileSearcher_user");

    if (userEmail) {
      toast.success("Successfully signed out");
    }
  };

  return { user, isLoading, login, logout };
};
