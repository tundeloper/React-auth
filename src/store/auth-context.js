import React, { useReducer } from "react";

export const AuthContext = React.createContext({
  token: null,
  isLogedIn: false,
  login: (token) => {},
  logout: () => {},
});

const AuthContextProvider = (props) => {
  const authReducer = (_, action) => {
    if (action.type === "LOGIN") {
      return {
        token: action.token,
      };
    }

    if (action.type === "LOGOUT") {
      return { token: null };
    }
  };

  const [auth, dispatch] = useReducer(authReducer, { token: null });

  const isLogedIn = !!auth.token;

  const loginHandler = (token) => {
    console.log(token);
    dispatch({ type: "LOGIN", token: token });
  };

  const logoutHandler = () => {
    dispatch({ type: "LOGOUT" });
  };

  const authValue = {
    token: auth.token,
    isLogedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={authValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
