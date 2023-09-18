import React, { useState, useEffect } from "react";
import { Text, View, Button, HStack } from "native-base";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Box } from "native-base";
import { StyleSheet } from "react-native";
import Lottie from "lottie-react-native";

export default function QRScanner({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [info, setInfo] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    console.log("OInfpo =  ", info);
  }, [info]);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    // setInfo({ data });
    setInfo(data);
    console.log("Scannedd Data   = ", data);

    // Handle scanned QR code here
  };

  const handleScanAgain = () => {
    console.log("Handle Scan ???");
    setScanned(false);
  };

  const renderScanner = () => {
    if (!scanned) {
      return <BarCodeScanner onBarCodeScanned={handleBarCodeScanned} />;
    } else {
      return (
        <View style={styles.scanAgainContainer}>
          <Text style={styles.scannedText}>QR Code scanned!</Text>
          <Button onPress={() => console.log("Scannned")} title="Scan Again" />
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
        <View flex={1} justifyContent={"center"} alignItems={"center"}>
          <Box alignItems={"center"} justifyContent={"center"}>
            <Text fontSize={"2xl"} color={"white"} fontWeight={"semibold"}>
              Place the QR code inside the area
            </Text>
            <Text fontSize={"xl"} color={"white"} fontWeight={"semibold"}>
              Scanning will start automatically
            </Text>
          </Box>

          <BarCodeScanner onBarCodeScanned={handleBarCodeScanned} />
        </View>
      </>
    );
  }

  return (
    <>
      <View bg={"white"} flex={1}>
        <Box h={"48"} w={"48"} alignSelf={"center"} mt={"32"}>
          <Lottie
            source={require("../../assets/91068-message-sent-successfully-plane.json")}
            autoPlay
            loop
          />
        </Box>

        <Box
          bg={"white"}
          borderRadius={10}
          shadow={5}
          mx={5}
          p={3}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Text fontSize={"2xl"}>Attendance Marked For</Text>

          <HStack mx={5} w={"100%"}>
            <Text w={"30%"} fontSize={"md"} fontWeight={"semibold"}>
              Attendee Id
            </Text>
            <Text w={"10%"}>:</Text>
            <Text w={"60%"} fontSize={"md"}>
              {info}
            </Text>
          </HStack>
          <HStack w={"100%"}>
            <Text w={"30%"} fontSize={"md"} fontWeight={"semibold"}>
              Name
            </Text>
            <Text w={"10%"}>:</Text>
            <Text w={"60%"} fontSize={"md"}>
              Anomynous Shah
            </Text>
          </HStack>
          <HStack w={"100%"}>
            <Text w={"30%"} fontSize={"md"} fontWeight={"semibold"}>
              Seminar
            </Text>
            <Text w={"10%"}>:</Text>
            <Text w={"60%"} fontSize={"md"}>
              Python Seminar
            </Text>
          </HStack>
        </Box>

        <View
          position={"relative"}
          justifyContent={"flex-end"}
          alignItems={"center"}
          mb={50}
          flex={1}
        >
          <Button
            borderRadius={10}
            position={"absolute"}
            bg={"lightBlue.400"}
            onPress={() => setScanned(false)}
          >
            Scan Again
          </Button>
        </View>
      </View>
    </>
  );
}
