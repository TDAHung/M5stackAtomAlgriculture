/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import AppNavigation from './src/navigation';
import messaging from "@react-native-firebase/messaging"

function App(): JSX.Element {
  // Register background handler
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
  return (
    <AppNavigation />
  );
}


export default App;
