import {
  View,
  Text,
  Box,
  HStack,
  Image,
  Icon,
  ScrollView,
  Button,
  Alert,
  IconButton,
  CloseIcon,
  useToast,
  Pressable,
} from "native-base";
import React, { useEffect, useState } from "react";
import { VStack } from "native-base";
import Lottie from "lottie-react-native";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  Ionicons,
  AntDesign,
} from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
const logo = require("../../assets/logo.png");
import moment from "moment";

import * as Calendar from "expo-calendar";
import { Platform, TextInput, ToastAndroid } from "react-native";
import { useNavigation } from "@react-navigation/native";

import QRScanner from "./QrScanner";

const Home = () => {
  const { navigate } = useNavigation();

  const networking = () => {
    // @ts-ignore
    navigate("Networking");
  };
  const logout = () => {
    // @ts-ignore
    navigate("Login");
  };
  const scan = () => {
    // @ts-ignore
    navigate("QrScanner");
  };

  return (
    <VStack bg={"#ffda67"} flex={1}>
      <Box
        h={"16"}
        // py={1.5}

        justifyContent={"center"}
      >
        <HStack mx={4} justifyContent={"space-between"} alignItems={"center"}>
          <Image source={logo} alt="logo" resizeMode="contain" h={12} w={48} />
          <TouchableOpacity onPress={logout}>
            <Ionicons name="power" size={28} />
          </TouchableOpacity>
        </HStack>
      </Box>
      <ScrollView pt={5} pb={5} mt={20}>
        <VStack
          bg={"white"}
          borderRadius={12}
          w={"80"}
          alignSelf={"center"}
          p={8}
        >
          <AntDesign name="camera" size={24} style={{ alignSelf: "center" }} />
          <Text fontSize={"md"} textAlign={"center"} mt={2}>
            Please move your camera{"\n"}over the QR Code
          </Text>
          <Box h={48} w={56} alignSelf={"center"} mt={8} mb={8}>
            <Lottie
              source={require("../../assets/animation_lmou7pd6.json")}
              autoPlay
              loop
            />
          </Box>
          <Button
            borderRadius={10}
            bg={"#000"}
            // onPress={() => setScanned(false)}
            onPress={scan}
            w={"40"}
            alignSelf={"center"}
            _pressed={{ backgroundColor: "orange.400" }}
          >
            <HStack alignItems={"center"} space={2}>
              <AntDesign name="camera" size={24} color="#fff" />
              <Text color={"white"}>Scan QR Code</Text>
            </HStack>
          </Button>
        </VStack>
      </ScrollView>
    </VStack>
  );
};

export default Home;
