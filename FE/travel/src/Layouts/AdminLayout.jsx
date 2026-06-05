import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export default function AdminLayout({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen">
      <main>
            <Outlet />
       </main>
    </div>
  );
}
