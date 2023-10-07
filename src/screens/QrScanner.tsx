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
  Box,
} from "native-base";
import { BarCodeScanner } from "expo-barcode-scanner";
import { ActivityIndicator } from "react-native";
import { Animated, Easing, StyleSheet } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useFetch } from "use-http";
import { Vibration } from "react-native";

interface GetReceiptRoot {
  success: boolean;
  msg: string;
  data: GetReceiptData;
}

interface GetReceiptData {
  bhogsevaId: number;
  TransactionId: string;
  Name: string;
  Mobile: string;
  Amount: string;
  Bhogname: string;
  Date: string;
  Prasad: boolean;
}

interface GetMandirTrustRoot {
  success: boolean;
  msg: string;
  data: GetMandirTrustData;
}

interface GetMandirTrustData {
  MandirId: number;
  Transactionid: string;
  Name: string;
  Mobileno: string;
  Amount: string;
  MandirTrust: string;
  Prasad: boolean;
}

interface AlreadyReceivedRoot {
  success: boolean;
  msg: string;
  data: string;
}

interface MandirTrustRoot {
  success: boolean;
  msg: string;
  data: string;
}

function QRScreen() {
  const isFocused = useIsFocused();

  if (isFocused === true) return <QRScanner />;

  return <></>;
}

function QRScanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [info, setInfo] = useState(null);
  const [info1, setInfo1] = useState(null);

  const [scannedData, setScannedData] = useState<string | null>(null);
  const [scannedQRs, setScannedQRs] = useState<string[]>([]);
  const { goBack } = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [receiptData, setReceiptData] = useState<GetReceiptData | null>(null);

  const { post: getReceipt, response: getReceiptResponse } =
    useFetch<GetReceiptRoot>();
  const { post: alreadyReceived, response: alreadyReceivedResponse } =
    useFetch<AlreadyReceivedRoot>();
  const { post: getMandirTrust, response: getMandirTrustResponse } =
    useFetch<GetMandirTrustRoot>();
  const { post: mandirTrustReceived, response: MandirTrustReceivedResponse } =
    useFetch<MandirTrustRoot>();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const scrollLineY = useRef(new Animated.Value(0)).current;

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

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    setScanned(true);
    setIsLoading(true); // Set loading state when data is being fetched
    try {
      let firstApiSuccess = false;
      let secondApiSuccess = false;

      // First Get Receipt
      await getReceipt("/Master/GetReceipt", {
        TransactionId: data,
      }).then(async (res: GetReceiptRoot) => {
        if (res.success) {
          firstApiSuccess = true;
          //True
          if (res.data.Prasad) {
            setScannedData("Already Scanned , Not Eligible for Prasad");
            await Vibration.vibrate(); // Vibrate the device
            console.log("Already Scanned");
          }
          //False
          else {
            await alreadyReceived(
              `/Master/AlreadyReceived/${res.data.bhogsevaId}`
            )
              .then((newRes: AlreadyReceivedRoot) => {
                if (newRes.success) {
                  setScannedData("Eligible For Prasad");
                  console.log("Done");
                } else {
                  console.log(newRes.msg);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      });

      // Second API Call
      await getMandirTrust("/Master/GetMandirTrust", {
        TransactionId: data,
      }).then(async (res: GetMandirTrustRoot) => {
        if (res.success) {
          secondApiSuccess = true;
          //True
          if (res.data.Prasad) {
            setScannedData("Already Scanned , Not Eligible for Prasad");
            await Vibration.vibrate(); // Vibrate the device
            console.log("Already Scanned");
          }
          //False
          else {
            await mandirTrustReceived(
              `/Master/MandirTrustReceived/${res.data.MandirId}`
            )
              .then((newRes: MandirTrustRoot) => {
                if (newRes.success) {
                  setScannedData("Eligible For Prasad");
                  console.log("Done");
                } else {
                  console.log(newRes.msg);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      });

      // If neither of the API calls succeeded, print "Id Not Found"
      if (!firstApiSuccess && !secondApiSuccess) {
        setScannedData("QR CODE DOES NOT MATCH");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false); // Turn off loading state after data fetching is complete
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
          <Button onPress={() => console.log("Scanned")}>Scan Again</Button>
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
        <ScrollView>
          {scanned && (
            <>
              <VStack
                mt={5}
                bg={"#fff"}
                mx={5}
                p={2}
                alignItems={"center"}
                justifyContent={"center"}
              >
                {isLoading ? (
                  <ActivityIndicator size="large" color="#000" />
                ) : (
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
                      <Text w={"25%"} fontSize={"md"} fontWeight={"semibold"}>
                        Date
                      </Text>
                      <Text w={"10%"}>:</Text>
                      <Text w={"65%"} fontSize={"md"}>
                        {getReceiptResponse.data?.data?.Date || "-"}
                      </Text>
                    </HStack>
                    {/* Display Name, Mobile, and Amount properties */}
                    <HStack mx={3} w={"100%"}>
                      <Text w={"25%"} fontSize={"md"} fontWeight={"semibold"}>
                        Name
                      </Text>
                      <Text w={"10%"}>:</Text>
                      <Text w={"65%"} fontSize={"md"}>
                        {getReceiptResponse.data?.data?.Name ||
                          getMandirTrustResponse.data?.data?.Name ||
                          "Name not available"}
                      </Text>
                    </HStack>

                    <HStack mx={3} w={"100%"}>
                      <Text w={"25%"} fontSize={"md"} fontWeight={"semibold"}>
                        Mobile
                      </Text>
                      <Text w={"10%"}>:</Text>
                      <Text w={"65%"} fontSize={"md"}>
                        {getReceiptResponse.data?.data?.Mobile ||
                          getMandirTrustResponse.data?.data?.Mobileno ||
                          "-"}
                      </Text>
                    </HStack>
                    <HStack mx={3} w={"100%"}>
                      <Text w={"25%"} fontSize={"md"} fontWeight={"semibold"}>
                        Amount
                      </Text>
                      <Text w={"10%"}>:</Text>
                      <Text w={"65%"} fontSize={"md"}>
                        {getReceiptResponse.data?.data?.Amount ||
                          getMandirTrustResponse.data?.data?.Amount ||
                          "-"}
                      </Text>
                    </HStack>
                  </VStack>
                )}

                <Text
                  mt={16}
                  fontWeight={"bold"}
                  fontSize={"2xl"}
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
