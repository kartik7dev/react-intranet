import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import axios from '../api/axios'
const LOGIN_URL = '/auth'
const REFRESH_TOKEN_URL = '/auth/refresh'

const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT'
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...(
        // if payload (user) is provided, then is authenticated
        user
          ? ({
            isAuthenticated: true,
            isLoading: false,
            user
          })
          : ({
            isLoading: false
          })
      )
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const { token, user } = action.payload;


    return {
      ...state,
      isAuthenticated: true,
      user,token
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null
    };
  }
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;
    let user = null;
    
    try {
      isAuthenticated = window.sessionStorage.getItem('authenticated') === 'true';
      if (isAuthenticated) {
        const user = window.sessionStorage.getItem('user');
        dispatch({
          type: HANDLERS.INITIALIZE,
          payload: user
        });
      } else {
        dispatch({
          type: HANDLERS.INITIALIZE
        });
      }
    } catch (err) {
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error(`Server responded with status code ${err.response.status}`);
        console.error(`Error message: ${err.response.data}`);
      } else if (err.request) {
        // The request was made but no response was received
        console.error('No response received from server');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error(`Error message: ${err.message}`);
      }
    }
  
    dispatch({
      type: HANDLERS.INITIALIZE,
      payload: user || undefined
    });

  
  };

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const signIn = async (username, password) => {
    try{
      const response = await axios.post(LOGIN_URL,
        JSON.stringify({username,password}),
        {
          headers: {'Content-Type': 'application/json'},
          withCredentials : false
        })

    if (response.statusText != 'OK') {
      throw new Error('Please check your username and password');
    }

    // const { token, user } = await response.json();
    const { token, user } = response.data;
    window.sessionStorage.setItem('user',user)
    window.sessionStorage.setItem('authenticated',true)
    
    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: { token, user }
    });
    } catch (err) {
      console.error(err);
  
      throw err;
    }
  };

  const signOut = () => {
    window.sessionStorage.removeItem('authenticated')
    localStorage.removeItem('user');
    dispatch({
      type: HANDLERS.SIGN_OUT
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);