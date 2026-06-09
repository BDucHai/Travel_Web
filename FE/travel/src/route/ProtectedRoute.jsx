import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ component: Component, roles }) {
  const {user} = useAuth();
  if (!roles.includes(user?.user_roles?.name)) {
    return <Navigate to="/403" replace />;
  }
  return <Component />;
}
