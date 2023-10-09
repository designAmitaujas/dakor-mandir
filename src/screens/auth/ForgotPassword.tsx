import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ErrorMessage, Formik } from "formik";
import { Alert, IconButton, useToast } from "native-base";
import {
  Box,
  HStack,
  Icon,
  Image,
  Link,
  ScrollView,
  Text,
  VStack,
  View,
} from "native-base";
import * as Yup from "yup";
import axios from "axios";
import { CustomButton, CustomInput } from "../../components/CustomForm";
import { FontAwesome5 } from "@expo/vector-icons";

export interface Root {
  AdminLoginId: number;
  UserName: string;
}

const initialValue: Root = {
  AdminLoginId: 1,
  UserName: " ",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
});

const ForgotPassword = () => {
  const toast = useToast();

  const { navigate } = useNavigation();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const handleSubmit = async (values) => {
    try {
      const apiUrl =
        "http://dakor.amitaujas.com/webapi/api/Master/Forgotpassword";

      const response = await axios.post(apiUrl, {
        Username: values.email,
      });

      if (response.data && response.data.success) {
        // Email sent successfully
        console.log(response.data);

        toast.show({
          render: ({ onClose }) => (
            <Box
              bg="emerald.500"
              px="2"
              py="1"
              rounded="sm"
              my={5}
              mx={3}
              alignItems="center"
              justifyContent="center"
              flexDirection="row"
            >
              <Text color="white" fontSize="md" fontWeight="semibold">
                Email has been sent to your registered email address
              </Text>
              <IconButton
                ml={2}
                onPress={onClose}
                icon={
                  <Icon as={FontAwesome5} name="times" color="white" size={4} />
                }
                size="sm"
                variant="unstyled"
                _focus={{ outlineColor: "none" }}
              />
            </Box>
          ),
          duration: 3000, // Toast will be shown for 3 seconds
          placement: "top", // You can change the placement to 'bottom' or 'center' if needed
        });

        // You can navigate to a success screen or show a success message here
      } else {
        // Handle the case where the password reset email was not sent
        console.error(response.data.message);

        toast.show({
          render: ({ onClose }) => (
            <Box
              bg="emerald.500"
              px="2"
              py="1"
              rounded="sm"
              my={5}
              mx={3}
              alignItems="center"
              justifyContent="center"
              flexDirection="row"
            >
              <Text color="white" fontSize="md" fontWeight="semibold">
                Enter the correct Username
              </Text>
              <IconButton
                ml={2}
                onPress={onClose}
                icon={
                  <Icon as={FontAwesome5} name="times" color="white" size={4} />
                }
                size="sm"
                variant="unstyled"
                _focus={{ outlineColor: "none" }}
              />
            </Box>
          ),
          duration: 3000, // Toast will be shown for 3 seconds
          placement: "top", // You can change the placement to 'bottom' or 'center' if needed
        });
        // You can display an error message to the user
      }
    } catch (error) {
      // Handle API error
      console.error("API Error:", error);
    }
  };

  const backToLogin = () => {
    // Navigate back to the login screen
    //@ts-ignore
    navigate("Login");
  };

  return (
    <>
      <View bg={"white"} h={"full"}>
        <Formik
          initialValues={initialValue}
          // validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            handleSubmit,
            values,
            touched,
            errors,
            handleChange,
            setFieldValue,
            isSubmitting,
          }) => (
            <>
              <ScrollView bg={"white"} h={"full"}>
                <VStack
                  bg={"#ffda67"}
                  h={"72"}
                  borderBottomLeftRadius={80}
                  borderBottomRightRadius={80}
                >
                  <Image
                    alignSelf={"center"}
                    mt={12}
                    h={32}
                    w={80}
                    resizeMode="contain"
                    alt="Image not found"
                    source={require("../../../assets/dakor2.png")}
                  />
                  <Image
                    alignSelf={"center"}
                    h={20}
                    w={80}
                    resizeMode="contain"
                    alt="Image not found"
                    source={require("../../../assets/dakor-3.png")}
                  />
                </VStack>
                <Text
                  mt={8}
                  fontSize={"31"}
                  fontWeight={"semibold"}
                  alignSelf={"center"}
                >
                  Forgot Password
                </Text>
                <VStack space={2} alignSelf={"center"} mt={"5"}>
                  <CustomInput
                    w={"72"}
                    borderColor={"#000"}
                    name="email"
                    label="Enter Your UserName"
                    currentValue={values.email}
                    errMsg={ErrorMessage.email}
                    placeholder="Your UserName"
                    setFieldValue={setFieldValue}
                    color={"#000"}
                    isRequired={true}
                    isInvalid={!!touched.email && !!errors.email}
                    leftElement={
                      <Icon
                        as={FontAwesome5}
                        name="user"
                        size={4}
                        ml="3"
                        color="#000"
                      />
                    }
                    bgColor="white"
                  />

                  <CustomButton
                    name="Submit"
                    mt="8"
                    mb={3}
                    borderRadius={25}
                    w={"48"}
                    h={12}
                    alignSelf={"center"}
                    bg={"#ffda67"}
                    shadow={3}
                    leftIcon={
                      <Icon
                        as={FontAwesome5}
                        name="lock"
                        mr="1"
                        size="sm"
                        color={"black"}
                      />
                    }
                    isSubmitting={isSubmitting}
                    onSubmit={handleSubmit}
                  />
                  <Link
                    alignSelf={"center"}
                    onPress={backToLogin}
                    _text={{
                      textDecoration: "none",
                    }}
                  >
                    <HStack alignItems={"center"} space={1}>
                      <Text fontSize={"xl"} fontWeight={"bold"} mb={1}>
                        →
                      </Text>
                      <Text fontWeight={"semibold"} fontSize={"md"}>
                        Back to login
                      </Text>
                    </HStack>
                  </Link>
                </VStack>
              </ScrollView>
            </>
          )}
        </Formik>
      </View>
    </>
  );
};

export default ForgotPassword;
