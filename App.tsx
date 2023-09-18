import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { NativeBaseProvider, StatusBar, extendTheme } from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import * as Font from "expo-font";
import "react-native-gesture-handler";
SplashScreen.preventAutoHideAsync();

import Routes from "./src/Routes";
import { SafeAreaView } from "react-native";
import { Entypo } from "@expo/vector-icons";

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync(Entypo.font);
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <>
      <NativeBaseProvider>
        <NavigationContainer onReady={onLayoutRootView}>
          <SafeAreaView style={{ flex: 1 }}>
            <StatusBar hidden={false} />
            <Routes />
          </SafeAreaView>
        </NavigationContainer>
      </NativeBaseProvider>
    </>
  );
};

export default App;
