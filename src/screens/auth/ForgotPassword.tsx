import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import {
  Box,
  HStack,
  Icon,
  IconButton,
  Image,
  Link,
  ScrollView,
  Spinner,
  Text,
  VStack,
  View,
} from "native-base";

import React, { useState } from "react";
import * as Yup from "yup";
import BottomTab from "../BottomTab";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { CustomButton, CustomInput } from "../../components/CustomForm";
import Home from "../Home";

const initialValue = {
  email: "dakortemple@gmail.com",
  password: "123456789",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(6).max(18).required(),
});

const ForgotPassword = () => {
  const { navigate } = useNavigation();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const handleSubmit = () => {};

  const backtologin = () => {
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
          }) => {
            return (
              <>
                <ScrollView bg={"white"} h={"full"}>
                  <Image
                    alignSelf={"center"}
                    mt={16}
                    h={20}
                    w={80}
                    resizeMode="contain"
                    alt="Image not found"
                    source={require("../../../assets/logo2.png")}
                  />
                  <Text
                    fontSize={"2xl"}
                    fontWeight={"bold"}
                    mt={2}
                    color={"#862125"}
                    alignSelf={"center"}
                  >
                    શ્રી રણછોડરાયજી મહારાજ મંદિર ટ્રસ્ટ
                  </Text>
                  <Text
                    fontSize={"xl"}
                    color={"#ef0e14"}
                    alignSelf={"center"}
                    fontWeight={"semibold"}
                  >
                    ડાકોર ટેમ્પલ કમિટી
                  </Text>
                  <Text
                    mt={16}
                    fontSize={"40"}
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
                      label="Email Address"
                      currentValue={values.email}
                      errMsg={errors.email}
                      placeholder="Your Email Address"
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
                      onPress={backtologin}
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
            );
          }}
        </Formik>
      </View>
    </>
  );
};

export default ForgotPassword;
