import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NativeBaseProvider, extendTheme } from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import { CachePolicies, Provider as HttpProvider } from "use-http";

import "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

import {
  Mulish_200ExtraLight,
  Mulish_200ExtraLight_Italic,
  Mulish_300Light,
  Mulish_300Light_Italic,
  Mulish_400Regular,
  Mulish_400Regular_Italic,
  Mulish_500Medium,
  Mulish_500Medium_Italic,
  Mulish_600SemiBold,
  Mulish_600SemiBold_Italic,
  Mulish_700Bold,
  Mulish_700Bold_Italic,
  Mulish_800ExtraBold,
  Mulish_800ExtraBold_Italic,
  Mulish_900Black,
  Mulish_900Black_Italic,
  useFonts,
} from "@expo-google-fonts/mulish";
import { Entypo } from "@expo/vector-icons";
import { useNetInfo } from "@react-native-community/netinfo";
import AppLoading from "expo-app-loading";
import { NoInternet } from "../screens/AppLoader";

const httpProviderConfig = {
  cachePolicy: CachePolicies.NO_CACHE,
  suspense: false,
  retries: 0,
};

const AppProvider = ({ children }) => {
  const { isConnected } = useNetInfo();

  const [fontsLoaded] = useFonts({
    Mulish_200ExtraLight,
    Mulish_300Light,
    Mulish_400Regular,
    Mulish_500Medium,
    Mulish_600SemiBold,
    Mulish_700Bold,
    Mulish_800ExtraBold,
    Mulish_900Black,
    Mulish_200ExtraLight_Italic,
    Mulish_300Light_Italic,
    Mulish_400Regular_Italic,
    Mulish_500Medium_Italic,
    Mulish_600SemiBold_Italic,
    Mulish_700Bold_Italic,
    Mulish_800ExtraBold_Italic,
    Mulish_900Black_Italic,
  });

  const theme = extendTheme({
    fontConfig: {
      Mulish: {
        300: {
          normal: "Mulish_300Light",
        },
        400: {
          normal: "Mulish_400Regular",
        },
        500: {
          normal: "Mulish_500Medium",
        },
        600: {
          normal: "Mulish_600SemiBold",
        },
        700: {
          normal: "Mulish_700Bold",
        },
      },
    },
    fonts: {
      heading: "Mulish",
      body: "Mulish",
      mono: "Mulish",
    },
    colors: {
      black: {
        50: "#eceef9",
        100: "#c5cbec",
        200: "#D3D3D3",
        300: "#808080",
        400: "#696969",
        500: "#5263c6",
        600: "#313031",
        700: "#4B4953",
        800: "#322E32",
        900: "#211F21",
      },
    },
  });
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

  if (fontsLoaded === false) {
    return <AppLoading />;
  } else {
    return (
      <>
        <NativeBaseProvider theme={theme}>
          <NavigationContainer onReady={onLayoutRootView}>
            <HttpProvider
              url="https://welfare-legends-biz-tablets.trycloudflare.com/api"
              options={httpProviderConfig}
            >
              {isConnected ? children : <NoInternet />}
            </HttpProvider>
          </NavigationContainer>
        </NativeBaseProvider>
      </>
    );
  }
};

export default AppProvider;
