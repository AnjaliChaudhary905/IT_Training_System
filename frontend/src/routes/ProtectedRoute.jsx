import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRoles = [] }) => {
    const { user, isAuthenticated, loading } = useSelector(
        (state) => state.auth
    );

    // Wait until authentication state is checked
    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#F5A623]" />

                    <p className="mt-4 text-sm text-gray-500">
                        Checking authentication...
                    </p>
                </div>
            </div>
        );
    }

    // User is not logged in
    if (!isAuthenticated || !user) {
        return <Navigate to="/login" replace />;
    }

    // User does not have permission
    if (
        allowedRoles.length > 0 &&
        !allowedRoles.includes(user.role?.toLowerCase())
    ) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;