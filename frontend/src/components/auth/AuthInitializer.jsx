import { useEffect } from "react";
import { useDispatch } from "react-redux";

import useAuth from "../../hooks/useAuth";
import { clearUser } from "../../store/slices/authSlice";

const AuthInitializer = ({ children }) => {
    const dispatch = useDispatch();
    const { getMe } = useAuth();

    useEffect(() => {
        const initializeAuth = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                dispatch(clearUser());
                return;
            }

            await getMe();
        };

        initializeAuth();
    }, []);

    return children;
};

export default AuthInitializer;