import React, { useState, useEffect } from "react";
import Login from "./screens/auth/Login";
import BottomTab from "./screens/BottomTab";
import { createStackNavigator } from "@react-navigation/stack";
import * as SplashScreen from "expo-splash-screen";

import Home from "./screens/Home";
import QRScanner from "./screens/QrScanner";
import ForgotPassword from "./screens/auth/ForgotPassword";

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      {/* <Stack.Screen name="BottomTab" component={BottomTab} /> */}
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="QrScanner" component={QRScanner} />
    </Stack.Navigator>
  );
};

export default Routes;
