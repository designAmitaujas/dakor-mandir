import React, { useState, useEffect, useRef } from "react";
// import { Audio } from "expo-av";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const successSound = new Audio.Sound();

const QRScanner: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [scannedQRs, setScannedQRs] = useState<string[]>([]);

  const scrollLineY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");

      // await successSound.loadAsync(require("../../assets/sound.mp3")); // Replace with your sound file
    })();
  }, []);

  useEffect(() => {
    let animation: Animated.CompositeAnimation | undefined;

    const animateScrollLine = () => {
      scrollLineY.setValue(0);
      animation = Animated.timing(scrollLineY, {
        toValue: 1,
        duration: 1500, // Adjust the duration as needed
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

    if (scannedQRs.includes(data)) {
      // If the same QR code is scanned again, show "Sorry."
      setScannedData("Sorry");
    } else {
      // If a new QR code is scanned, mark it as "Success" and store it in the array.
      setScannedData("Success");
      setScannedQRs([...scannedQRs, data]);

      // Play the success sound
      // await successSound.replayAsync();
    }
  };

  const resetScanner = () => {
    setScanned(false);
    setScannedData(null);
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Display a custom view behind the scanner */}
      <View style={styles.scannerContainer}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.scanner}
        />
        {/* Add a scrolling line animation */}
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

      {scanned && (
        <View style={styles.feedbackContainer}>
          <Text style={styles.feedbackText}>{scannedData}</Text>
          <Text style={styles.feedbackText}>
            QR Codes Scanned: {scannedQRs.length}
          </Text>
          <TouchableOpacity
            style={styles.scanAgainButton}
            onPress={resetScanner}
          >
            <Text style={styles.scanAgainText}>Scan Again</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

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
    fontSize: 20,
    color: "white",
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
