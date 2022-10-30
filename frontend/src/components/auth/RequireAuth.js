import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import NotFound from "../../pages/NotFound";

const RequireAuth = ({ roles }) => {
  const { auth } = useAuth();
  const userRoles = auth?.user?._roles.map((role) => role.role);
  const location = useLocation();

  if (!auth?.token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!userRoles?.find((role) => roles.includes(role))) {
    return <NotFound />;
  }

  return <Outlet />;
};

export default RequireAuth;
