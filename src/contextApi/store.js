import { createContext, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation, Navigate } from 'react-router-dom'

const initialState = {
    user: null
};

const AuthContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case 'login': return { user: action.payload }
        case 'logout': return { user: null }

        default:
            throw new Error();
    }
}

export const AuthProvider = ({ children }) => {

    const [activeUser, dispatch] = useReducer(reducer, initialState);

    return <AuthContext.Provider value={{ activeUser, dispatch }} >{children}</AuthContext.Provider>

}

export const AuthConsumer = () => {
    return useContext(AuthContext);
}

export const RequireAuth = ({ children }) => {
    const { activeUser } = AuthConsumer();
    // const navigate = useNavigate();
    const location = useLocation();

    const role = activeUser?.user?.roleId;

    return (role === 1 || role === 2) ? (children) : <Navigate to={"/signin"} replace state={{ path: location.pathName }} />
}