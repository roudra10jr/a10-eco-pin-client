import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../Providers/AuthContext";
import LoadingBar from "../Pages/LoadingBar";

const PrivateRoute = ({ children }) => {
	const { user, loading } = useContext(AuthContext);

	const location = useLocation();
	//console.log(location);

	if (loading) {
		return <LoadingBar></LoadingBar>;
	}

	if (user) {
		return children;
	}
	return <Navigate state={location.pathname} to="/login"></Navigate>;
};

export default PrivateRoute;
