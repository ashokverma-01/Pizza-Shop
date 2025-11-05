import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AppContext from "../../context/AppContext";

const ProtectedRoute = ({ children }) => {
  const { isLogin } = useContext(AppContext);
  if (!isLogin) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
