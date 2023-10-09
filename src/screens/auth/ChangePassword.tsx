import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import {
  Box,
  HStack,
  Icon,
  Image,
  Link,
  ScrollView,
  Text,
  Toast,
  VStack,
  View,
} from "native-base";
import * as Yup from "yup";
import axios from "axios";
import { CustomButton, CustomInput } from "../../components/CustomForm";
import { FontAwesome5 } from "@expo/vector-icons";
import { Alert, IconButton, useToast } from "native-base";

export interface Root {
  AdminLoginId: number;
  ChangePassword: string;
  OldPassword: string;
  ConfirmPassword: string;
}

const initialValue: Root = {
  AdminLoginId: 1,
  OldPassword: "",
  ChangePassword: "",
  ConfirmPassword: "",
};

const validationSchema = Yup.object().shape({
  OldPassword: Yup.string().required("Old Password is required"),
  ChangePassword: Yup.string()
    .min(6, "New Password must be at least 6 characters")
    .required("New Password is required"),
  ConfirmPassword: Yup.string()
    .oneOf([Yup.ref("ChangePassword"), null], "Passwords must match")
    .required("Confirm New Password is required"),
});

const ChangePassword = () => {
  const { navigate } = useNavigation();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (values: Root) => {
    try {
      const apiUrl =
        "http://dakor.amitaujas.com/webapi/api/Master/Changepassword";

      const response = await axios.post(apiUrl, values);

      if (response.data && response.data.success) {
        console.log(response.data);
        Toast.show({
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
                Password change successful
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
        // Password change successful
        // You can optionally navigate to the login screen here
        //@ts-ignore
        navigate("Login");
      } else {
        // Handle the case where the password change failed
        const error =
          response.data && response.data.msg
            ? response.data.msg
            : "Password change failed";
        // console.error("Password change failed:", error);
        // Set the error message state

        Toast.show({
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
                Old Password Is Incorrect{" "}
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
        setErrorMessage(error);
      }
    } catch (err) {
      // Handle API error
      console.error("API Error:", err);
      // Set the error message state
      setErrorMessage("An error occurred while communicating with the server.");
    }
  };

  const backToLogin = () => {
    //@ts-ignore
    navigate("Login");
  };

  return (
    <>
      <View bg={"white"} h={"full"}>
        <Formik
          initialValues={initialValue}
          validationSchema={validationSchema}
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
                  mt={2}
                  fontSize={"xl"}
                  fontWeight={"semibold"}
                  alignSelf={"center"}
                >
                  Change Password
                </Text>
                <VStack space={2} alignSelf={"center"} mt={"5"}>
                  <CustomInput
                    w={"72"}
                    borderColor={"#000"}
                    name="OldPassword"
                    label="Old Password"
                    currentValue={values.OldPassword}
                    errMsg={errors.OldPassword}
                    placeholder="Old Password"
                    setFieldValue={setFieldValue}
                    color={"#000"}
                    isRequired={true}
                    isInvalid={!!touched.OldPassword && !!errors.OldPassword}
                    leftElement={
                      <Icon
                        as={FontAwesome5}
                        name="lock"
                        size={4}
                        ml="3"
                        color="#000"
                      />
                    }
                    bgColor="white"
                    secureTextEntry={true}
                  />

                  <CustomInput
                    w={"72"}
                    borderColor={"#000"}
                    name="ChangePassword"
                    label="New Password"
                    currentValue={values.ChangePassword}
                    errMsg={errorMessage}
                    placeholder="New Password"
                    setFieldValue={setFieldValue}
                    color={"#000"}
                    isRequired={true}
                    isInvalid={
                      !!touched.ChangePassword && !!errors.ChangePassword
                    }
                    leftElement={
                      <Icon
                        as={FontAwesome5}
                        name="lock"
                        size={4}
                        ml="3"
                        color="#000"
                      />
                    }
                    bgColor="white"
                    secureTextEntry={true}
                  />

                  <CustomInput
                    w={"72"}
                    borderColor={"#000"}
                    name="ConfirmPassword"
                    label="Confirm New Password"
                    currentValue={values.ConfirmPassword}
                    errMsg={errorMessage}
                    placeholder="Confirm New Password"
                    setFieldValue={setFieldValue}
                    color={"#000"}
                    isRequired={true}
                    isInvalid={
                      !!touched.ConfirmPassword && !!errors.ConfirmPassword
                    }
                    leftElement={
                      <Icon
                        as={FontAwesome5}
                        name="lock"
                        size={4}
                        ml="3"
                        color="#000"
                      />
                    }
                    bgColor="white"
                    secureTextEntry={true}
                  />

                  <CustomButton
                    name="Change"
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

export default ChangePassword;
