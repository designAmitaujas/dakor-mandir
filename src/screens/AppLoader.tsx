import LottieView from "lottie-react-native";
import { HStack, Image, Text, View } from "native-base";
import React from "react";

const RestHeader = () => {
  return (
    <>
      <HStack
        w={"100%"}
        justifyContent={"space-between"}
        py={2}
        px={5}
        bg={"#1A237E"}
        alignItems={"center"}
      >
        <Image
          w={"12"}
          h={"10"}
          resizeMode="contain"
          alt="Image not found"
          source={require("../../assets/adaptive-icon.png")}
        />
        <Text fontSize={"lg"} fontWeight={"bold"} color={"white"}>
          Aatapi QMS
        </Text>
      </HStack>
    </>
  );
};

const NoInternet = () => {
  return (
    <>
      <RestHeader />
      <View flex={1}>
        <LottieView
          autoPlay
          source={require("../../assets/no-internet.json")}
        />
      </View>
    </>
  );
};

export { NoInternet };
