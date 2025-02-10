import { createContext, useEffect, useReducer } from "react";

import { PublicClientApplication } from "@azure/msal-browser";

import { MsalProvider, useMsal, useIsAuthenticated } from "@azure/msal-react";

import Loading from "app/components/MatxLoading";
 
// MSAL Configuration

const msalConfig = {

  auth: {

    clientId: "083a7996-d80f-4323-b294-23b9008132e7", // Replace with your Azure AD app's client ID

    authority: 'https://login.microsoftonline.com/ea3033f5-f488-48e0-ab17-b07a87e18085', // Azure AD Authority

    redirectUri: window.location.origin,

  },

};
 
const msalInstance = new PublicClientApplication(msalConfig);
 
const initialAuthState = {

  user: null,

  isInitialized: false,

  isAuthenticated: false

};
 
const reducer = (state, action) => {

  switch (action.type) {

    case "MSAL_AUTH_STATE_CHANGED": {

      const { isAuthenticated, user } = action.payload;

      return { ...state, isAuthenticated, isInitialized: true, user };

    }
 
    default: {

      return state;

    }

  }

};
 
const AuthContext = createContext({

  ...initialAuthState,

  method: "MSAL"

});
 
export const AuthProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialAuthState);
 
  const signInWithMicrosoft = async () => {

    try {

      // Use msalInstance to trigger the loginPopup method

      const response = await msalInstance.loginPopup({

        scopes: ["user.read"], // Add scopes that you need

      });
 
      dispatch({

        type: "MSAL_AUTH_STATE_CHANGED",

        payload: {

          isAuthenticated: true,

          user: {

            id: response.account.homeAccountId,

            email: response.account.username,

            name: response.account.name,

          }

        }

      });

    } catch (error) {

      console.error("Login failed", error);

    }

  };
 
  const logout = () => {

    msalInstance.logoutPopup().then(() => {

      dispatch({

        type: "MSAL_AUTH_STATE_CHANGED",

        payload: { isAuthenticated: false, user: null }

      });

    }).catch(err => console.error("Logout failed", err));

  };
 
  useEffect(() => {

    // Handle authentication status changes

    const checkAuthStatus = async () => {

      const currentAccount = msalInstance.getAllAccounts()[0];

      if (currentAccount) {

        dispatch({

          type: "MSAL_AUTH_STATE_CHANGED",

          payload: {

            isAuthenticated: true,

            user: {

              id: currentAccount.homeAccountId,

              email: currentAccount.username,

              name: currentAccount.name,

            }

          }

        });

      } else {

        dispatch({

          type: "MSAL_AUTH_STATE_CHANGED",

          payload: { isAuthenticated: false, user: null }

        });

      }

    };
 
    checkAuthStatus();
 
  }, []); // Runs once on component mount
 
  if (!state.isInitialized) return <Loading />;
 
  return (
    <MsalProvider instance={msalInstance}>
<AuthContext.Provider

      value={{

        ...state,

        logout,

        signInWithMicrosoft,

        method: "MSAL",

      }}>

      {children}
</AuthContext.Provider>
</MsalProvider>
  );

};
 
// Wrap your application with MsalProvider at a higher level (like App.js)

export const AppWithMsal = ({ children }) => (
<MsalProvider instance={msalInstance}>
<AuthProvider>

      {children}
</AuthProvider>
</MsalProvider>

);
 
export default AuthContext;

 