import React from "react";
import { SafeAreaView } from "react-native";
import Routes from "./src/Routes";
import AppProvider from "./src/components/AppProvider";
import { State } from "react-native-gesture-handler";
import { StatusBar } from "native-base";

const App = () => {
  return (
    <AppProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar hidden={false} />
        <Routes />
      </SafeAreaView>
    </AppProvider>
  );
};

export default App;
