import React from 'react'
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold} from '@expo-google-fonts/roboto';
import { NativeBaseProvider, StatusBar} from 'native-base';
import { THEME } from './src/styles/theme';
import { Loader } from './src/components/Loader';
import { AuthContextProvider } from './src/contexts/Auth';
import { SignIn } from './src/screens/SignIn';
import Routes from './src/navigation/Routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular, 
    Roboto_500Medium, 
    Roboto_700Bold
  });


  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
        <StatusBar barStyle='light-content' backgroundColor={"transparent"} translucent/>
        {fontsLoaded ? <Routes/> : ( <Loader />)}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}

