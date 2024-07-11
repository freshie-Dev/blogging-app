import { createContext, useContext } from "react";

const AuthContext = createContext();

const AuthContextProvider = ({ children, isUserSignedIn }) => {
  return (
    <AuthContext.Provider value={{ isUserSignedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthContextProvider, useAuth };
