import { useEffect , useState} from "react";
import { AuthContext } from "./AuthContext";


function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [loggedUser, setLoggedUser] = useState(false);

    function logout() {
        setToken(null)
        setLoggedUser(false)
    }

    useEffect(() => {
        localStorage.setItem("token", token);
        if (token && token !== "null") {
            console.log(typeof token);
            setLoggedUser(true);
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{ token, setToken, logout, loggedUser, setLoggedUser}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
