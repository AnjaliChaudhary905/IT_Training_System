import { useDispatch, useSelector } from "react-redux";

import {
    setUser,
    clearUser,
    setAuthLoading,
} from "../store/slices/authSlice";

import {
    loginUser,
    logoutUser,
    getCurrentUser,
} from "../services/authService";

const useAuth = () => {
    const dispatch = useDispatch();

    const { user, isAuthenticated, loading } = useSelector(
        (state) => state.auth
    );

    const login = async (data) => {
        const response = await loginUser(data);

        if (response.success) {
            localStorage.setItem("token", response.data.token);

            dispatch(setUser(response.data.user));
        }

        return response;
    };

    const logout = async () => {
        try {
            await logoutUser();
        } finally {
            localStorage.removeItem("token");
            dispatch(clearUser());
        }
    };

    const getMe = async () => {
        try {
            dispatch(setAuthLoading(true));

            const response = await getCurrentUser();

            if (response.success) {
                dispatch(setUser(response.data));
            } else {
                localStorage.removeItem("token");
                dispatch(clearUser());
            }

            return response;
        } catch  {
            localStorage.removeItem("token");
            dispatch(clearUser());

            return null;
        }
    };

    return {
        user,
        isAuthenticated,
        loading,
        login,
        logout,
        getMe,
    };
};

export default useAuth;