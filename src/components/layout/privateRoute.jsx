/* eslint-disable react/prop-types */
import { Navigate, Route, Routes } from "react-router-dom";

export const PrivateRoute = (props) => {
  const { element, isAuthenticated, fallbackPath } = props;
  return isAuthenticated ? (
    <Routes>{/* Wrap the Route in a Routes component */}
      <Route path="/*" element={element} />
    </Routes>
  ) : (
    <Navigate to={fallbackPath} replace />
  );
};

export default PrivateRoute;
