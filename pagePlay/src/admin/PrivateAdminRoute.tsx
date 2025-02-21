import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const PrivateAdminRoute = () => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("alluser")
        .select("role")
        .eq("email", session.user.email)
        .single();

      if (error || !data || data.role !== "admin") {
        setIsAdmin(false);
      } else {
        setIsAdmin(true);
      }

      setLoading(false);
    };

    checkAdminSession();

    // Listen for auth state changes (prevents refresh loop)
    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      checkAdminSession();
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (loading) return <p>Loading...</p>;
  return isAdmin ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateAdminRoute;
