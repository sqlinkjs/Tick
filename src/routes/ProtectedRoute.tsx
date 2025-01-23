import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/authProvider";

const ProtectedRoute = () => {
  const auth = useAuth();
  if (!auth || !auth.token) {
    return <Navigate to="/login" />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ProtectedRoute;
