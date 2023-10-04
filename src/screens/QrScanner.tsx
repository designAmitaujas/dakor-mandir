import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  Button,
  HStack,
  VStack,
  Icon,
  Image,
  ScrollView,
} from "native-base";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Box } from "native-base";
import { Animated, Easing, StyleSheet } from "react-native";
import Lottie from "lottie-react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const QRScanner = () => {
  const isFocused = useIsFocused();

  if (isFocused === true) return <QRScreen />;

  return <></>;
};

function QRScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [info, setInfo] = useState(null);
  const [info1, setInfo1] = useState(null);

  const [scannedData, setScannedData] = useState<string | null>(null);
  const [scannedQRs, setScannedQRs] = useState<string[]>([]);
  const { goBack } = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const scrollLineY = useRef(new Animated.Value(0)).current;

  //   useEffect(() => {
  //     (async () => {
  //       const { status } = await BarCodeScanner.requestPermissionsAsync();
  //       setHasPermission(status === "granted");

  //       // await successSound.loadAsync(require("../../assets/sound.mp3")); // Replace with your sound file
  //     })();
  //   }, []);

  useEffect(() => {
    let animation: Animated.CompositeAnimation | undefined;

    const animateScrollLine = () => {
      scrollLineY.setValue(0);
      animation = Animated.timing(scrollLineY, {
        toValue: 1,
        duration: 2000, // Adjust the duration as needed
        easing: Easing.linear,
        useNativeDriver: false,
      });

      if (scanned) {
        animation.start(() => {
          if (scanned) {
            animateScrollLine();
          }
        });
      } else {
        if (animation) {
          animation.stop();
        }
      }
    };

    animateScrollLine();

    return () => {
      if (animation) {
        animation.stop();
      }
    };
  }, [scanned]);

  // const handleBarCodeScanned = ({ data }) => {
  //   setScanned(true);

  //   setInfo(data);

  //   // Handle scanned QR code here
  // };

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    setScanned(true);

    if (scannedQRs.includes(data)) {
      // If the same QR code is scanned again, show "Sorry."
      setScannedData("Already Received Prasad...");
    } else {
      // If a new QR code is scanned, mark it as "Success" and store it in the array.
      setScannedData("Pending Prasad...");
      setScannedQRs([...scannedQRs, data]);

      // Play the success sound
      // await successSound.replayAsync();
    }
  };

  const handleScanAgain = () => {
    console.log("Handle Scan ???");
    setScanned(false);
  };

  const resetScanner = () => {
    setScanned(false);
    setScannedData(null);
  };

  const renderScanner = () => {
    if (!scanned) {
      return <BarCodeScanner onBarCodeScanned={handleBarCodeScanned} />;
    } else {
      return (
        <View>
          <Text>QR Code scanned!</Text>
          <Button onPress={() => console.log("Scannned")}>Scan Again</Button>
        </View>
      );
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  if (!scanned) {
    return (
      <>
        {/* <View
          flex={1}
          justifyContent={"center"}
          alignItems={"center"}
          bg={"#ffda67"}
        >
          <Box alignItems={"center"} justifyContent={"center"}>
            <Text fontSize={"xl"} fontWeight={"bold"} textAlign={"center"}>
              Please move your camera{"\n"}over the QR Code
            </Text>
          </Box>

          <BarCodeScanner
            style={{
              width: "100%",
              height: "100%",
            }}
            onBarCodeScanned={handleBarCodeScanned}
          />
        </View> */}
        <View flex={1} alignItems={"center"}>
          <HStack
            alignSelf={"flex-start"}
            alignItems={"center"}
            bg={"#ffda67"}
            w={"full"}
            p={2}
          >
            <Button
              bg="transparent"
              colorScheme={"white"}
              onPress={goBack}
              leftIcon={
                <Icon
                  size="md"
                  as={<FontAwesome5 name="arrow-left" />}
                  color="black"
                />
              }
            />
            <Text
              fontSize={"xl"}
              fontWeight={"bold"}
              textAlign={"center"}
              ml={20}
            >
              Scan QR Code
            </Text>
          </HStack>
          <Text
            fontSize={"xl"}
            fontWeight={"bold"}
            textAlign={"center"}
            mt={24}
          >
            Please move your camera{"\n"}over the QR Code
          </Text>
          <View
            mt={8}
            width={"85%"}
            height={"45%"}
            // overflow={"hidden"}
            borderRadius={10}
            borderWidth={2}
            borderColor={"#000"}
          >
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={{ width: "100%", height: "100%" }}
            />
            <Animated.View
              style={[
                styles.scrollLine,
                {
                  transform: [
                    {
                      translateY: scrollLineY.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 300], // Scroll from top (0) to bottom (300)
                      }),
                    },
                  ],
                },
              ]}
            />
          </View>
        </View>
      </>
    );
  }

  return (
    <>
      <View bg={"white"} flex={1}>
        <ScrollView>
          <HStack
            alignSelf={"flex-start"}
            alignItems={"center"}
            bg={"#ffda67"}
            w={"full"}
            p={2}
          >
            <Button
              bg="transparent"
              colorScheme={"white"}
              onPress={goBack}
              leftIcon={
                <Icon
                  size="md"
                  as={<FontAwesome5 name="arrow-left" />}
                  color="black"
                />
              }
            />
            <Text
              fontSize={"xl"}
              fontWeight={"bold"}
              textAlign={"center"}
              ml={20}
            >
              User Receipt
            </Text>
          </HStack>
          {scanned && (
            <>
              {/* <Box h={"48"} w={"48"} alignSelf={"center"}>
                <Lottie
                  source={require("../../assets/91068-message-sent-successfully-plane.json")}
                  autoPlay
                  loop
                />
              </Box> */}
              <Image
                mt={16}
                h={20}
                alignSelf={"center"}
                resizeMode="contain"
                alt="Image not found"
                source={require("../../assets/dakor-3.png")}
              />

              <VStack
                mt={5}
                bg={"#fff"}
                mx={5}
                p={2}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <VStack
                  space={3}
                  bg={"#fff"}
                  borderRadius={10}
                  borderWidth={2}
                  borderColor={"#ffda67"}
                  shadow={5}
                  p={3}
                >
                  <HStack mx={3} w={"100%"}>
                    <Text w={"25%"} fontSize={"lg"} fontWeight={"semibold"}>
                      Date
                    </Text>
                    <Text w={"10%"}>:</Text>
                    <Text w={"65%"} fontSize={"lg"}>
                      29/08/2023
                    </Text>
                  </HStack>
                  <HStack mx={3} w={"100%"}>
                    <Text w={"25%"} fontSize={"lg"} fontWeight={"semibold"}>
                      Name
                    </Text>
                    <Text w={"10%"}>:</Text>
                    <Text w={"65%"} fontSize={"lg"}>
                      {info}Jash Vadgama
                    </Text>
                  </HStack>
                  <HStack mx={3} w={"100%"}>
                    <Text w={"25%"} fontSize={"lg"} fontWeight={"semibold"}>
                      Rs.
                    </Text>
                    <Text w={"10%"}>:</Text>
                    <Text w={"65%"} fontSize={"lg"}>
                      2000
                    </Text>
                  </HStack>
                </VStack>

                <Text
                  mt={20}
                  fontWeight={"bold"}
                  fontSize={"4xl"}
                  textAlign={"center"}
                >
                  {scannedData}
                </Text>

                <Button
                  mt={8}
                  borderRadius={10}
                  bg={"#000"}
                  onPress={resetScanner}
                  _pressed={{ backgroundColor: "orange.400" }}
                >
                  <HStack alignItems={"center"} space={2}>
                    <AntDesign name="camera" size={24} color="#fff" />
                    <Text color={"#fff"}>Click to scan again</Text>
                  </HStack>
                </Button>
              </VStack>
            </>
          )}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scannerContainer: {
    width: "80%",
    aspectRatio: 1,
    overflow: "hidden",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000",
  },
  scanner: {
    width: "100%",
    height: "100%",
  },
  feedbackContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingVertical: 20,
  },
  feedbackText: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 10,
  },
  scanAgainButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  scanAgainText: {
    fontSize: 16,
    color: "white",
  },
  scrollLine: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: "#FF0000", // Customize the scroll line color
  },
});

export default QRScanner;
