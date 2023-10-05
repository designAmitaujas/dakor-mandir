import React from "react";
import { SafeAreaView } from "react-native";
import Routes from "./src/Routes";
import AppProvider from "./src/components/AppProvider";

const App = () => {
  return (
    <AppProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Routes />
      </SafeAreaView>
    </AppProvider>
  );
};

export default App;
