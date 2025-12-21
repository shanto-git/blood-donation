import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading, roleLoading, userStatus } = useContext(AuthContext);
  const location = useLocation();

  if (loading || roleLoading) {
    return (
      <p className="text-center py-10">
        <span className="loading loading-spinner text-secondary"></span>
      </p>
    );
  }

  if (!user || !userStatus=='active' ) {
    return <Navigate to="/login" state={location.pathname} replace />;
  }

  return children;
};

export default PrivateRoute;
