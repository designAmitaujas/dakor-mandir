import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import capitalize from "lodash/capitalize";
import { Center, HStack, Icon, Pressable, Text, View } from "native-base";
import React, { FC, memo, useEffect, useState } from "react";
import isEqual from "react-fast-compare";
import HomeScreen from "./Home";
import { TouchableOpacity } from "react-native-gesture-handler";
import Home from "./Home";
import QRScanner from "./QrScanner";
import ProfileScreen from "./profile/ProfileDetails";

const Tab = createBottomTabNavigator();

const PressableIcons: FC<{
  selected: number;
  indexNumber: number;
  setSelected: (value: React.SetStateAction<number>) => void;
  defaultName: string | any;
  outlineName: string | any;
  name: string;
}> = memo(
  ({ selected, setSelected, defaultName, outlineName, indexNumber, name }) => {
    const manageIndex = () => setSelected(indexNumber);

    return (
      <Pressable flex={1} onPress={manageIndex}>
        <Center>
          <Icon
            mr="2"
            mb="1"
            as={
              // <MaterialIcons
              //   name={selected === indexNumber ? defaultName : outlineName}
              // />
              <Ionicons
                name={selected === indexNumber ? defaultName : outlineName}
              />
            }
            color="#31409b"
            size="lg"
          />
          <Text mr="2" color="#31409b" fontSize="12">
            {capitalize(name)}
          </Text>
        </Center>
      </Pressable>
    );
  },
  isEqual
);

const BottomNavigation = memo((props: any) => {
  const [selected, setSelected] = useState(0);
  const { navigate } = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    // if (selected === 0 && props.state.index !== 0) {
    //   // @ts-ignore
    //   navigate("Home");
    //   setSelected(0);
    // }

    if (selected === 1 && props.state.index !== 1) {
      // @ts-ignore
      navigate("Qr Scanner");
      setSelected(1);
    }

    // if (selected === 2 && props.state.index !== 2) {
    //   // @ts-ignore
    //   navigate("Profile");
    //   setSelected(2);
    // }
  }, [selected, props.state, isFocused]);

  return (
    <>
      <View>
        <HStack alignItems="center" alignSelf={"center"}>
          {/* <PressableIcons
            selected={selected}
            setSelected={setSelected}
            defaultName="home"
            outlineName="home-outline"
            indexNumber={0}
            name="Home"
          /> */}
          <PressableIcons
            selected={selected}
            setSelected={setSelected}
            defaultName="qr-code"
            outlineName="qr-code-outline"
            indexNumber={1}
            name="Qr Scanner"
          />

          {/* <PressableIcons
            selected={selected}
            setSelected={setSelected}
            defaultName="person-circle"
            outlineName="person-circle-outline"
            indexNumber={2}
            name="Profile"
          /> */}
        </HStack>
      </View>
    </>
  );
}, isEqual);

const BottomTab = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomNavigation {...props} />}
      screenOptions={{ headerShown: false }}
      initialRouteName={"Home"}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Qr Scanner" component={QRScanner} />

      {/* <Tab.Screen name="Profile" component={ProfileScreen} /> */}
    </Tab.Navigator>
  );
};

export default BottomTab;
