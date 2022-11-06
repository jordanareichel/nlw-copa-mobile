import React, { createContext, useEffect, useState } from "react";
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import {api} from '../api/connection/index';

WebBrowser.maybeCompleteAuthSession();
 
interface UserProps {
  name: string;
  avatarUrl: string
}

export interface AuthContextProps  {
  user: UserProps;
  isUserLoading: boolean;
  SignIn: () => Promise<void>;
}

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthContextProvider({children}: AuthContextProviderProps) {
  const [isUserLoading, setIsUserLoading] = useState<boolean>(false);
  const [user, setUser ] = useState<UserProps>({} as UserProps);

  const [request, response, prompAsync] = Google.useAuthRequest({
    clientId: '540842376417-coanrd5bmftus4i5vvak3k061hk7io7p.apps.googleusercontent.com',
    redirectUri: AuthSession.makeRedirectUri({useProxy: true}), 
    scopes: ['profile', 'email']
  });

  useEffect(() => {
    if(response?.type === 'success' && response.authentication?.accessToken) {
      signInWithGoogle(response.authentication.accessToken);
    }
  }, [response]); 

  async function SignIn() { 
    try { 
      setIsUserLoading(true);

      await prompAsync();

    }catch(err) {
      console.log(err);

    } finally {
      setIsUserLoading(false);
    }
  }

  async function signInWithGoogle(access_token: string) {
    try {
      setIsUserLoading(true);
      
      const response = await api.post('/users', { access_token });

      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      console.log(response.data.token);

      const userInfoResponse = await api.get('/me');
      setUser(userInfoResponse.data.user);
    }catch(err) {
      console.log(err);
    }finally {
      setIsUserLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{
      SignIn,
      isUserLoading,
      user,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

