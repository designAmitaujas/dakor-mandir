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

const Login = () => {
  const { navigate } = useNavigation();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const handleSubmit = () => {
    // @ts-ignore
    navigate(Home);
  };
  const handleLogin = () => {
    // @ts-ignore
    navigate(Home);
  };

  const Forgot = () => {
    //@ts-ignore
    navigate("ForgotPassword");
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
                  {/* <Image
                    alignSelf={"center"}
                    mt={16}
                    h={20}
                    w={80}
                    resizeMode="contain"
                    alt="Image not found"
                    source={require("../../../assets/logo2.png")}
                  /> */}
                  <VStack
                    bg={"#ffda67"}
                    h={"72"}
                    borderBottomLeftRadius={80}
                    borderBottomRightRadius={80}
                    // borderBottomRadius={"full"}
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
                  {/* <Text
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
                  </Text> */}
                  <Text
                    mt={8}
                    fontSize={"40"}
                    fontWeight={"semibold"}
                    alignSelf={"center"}
                  >
                    Login
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
                    <CustomInput
                      // secureTextEntry={true}
                      isRequired={true}
                      borderColor={"#000"}
                      w={"72"}
                      name="password"
                      label="Password"
                      currentValue={values.password}
                      errMsg={errors.password}
                      placeholder="Your password"
                      setFieldValue={setFieldValue}
                      bgColor="white"
                      isInvalid={!!touched.password && !!errors.password}
                      type={show ? "text" : "password"}
                      leftElement={
                        <Icon
                          as={Ionicons}
                          name="key-outline"
                          size={5}
                          ml="3"
                          color="#000"
                        />
                      }
                      rightElement={
                        <IconButton
                          mr={0.5}
                          borderRadius={10}
                          onPress={handleClick}
                          icon={
                            show ? (
                              <Icon
                                as={Ionicons}
                                name="eye"
                                size={5}
                                color="#000"
                              />
                            ) : (
                              <Icon
                                as={Ionicons}
                                name="eye-off"
                                size={5}
                                color="#000"
                              />
                            )
                          }
                        />
                      }
                    />

                    <Link
                      alignSelf={"flex-end"}
                      onPress={Forgot}
                      _text={{
                        fontWeight: "medium",
                        fontSize: "md",
                        textDecoration: "none",
                      }}
                    >
                      Forgot Password ?
                    </Link>

                    {/* <Button
                        mt="6"
                        borderRadius={25}
                        w={"48"}
                        h={12}
                        alignSelf={"center"}
                        bgColor={"#313031"}
                        shadow={"2"}
                        //@ts-ignore
                        onPress={handleSubmit}
                        leftIcon={isSubmitting === true ? <Spinner /> : null}
                        isSubmitting={isSubmitting}
                      >
                        Log In
                      </Button> */}

                    <CustomButton
                      name="Login"
                      mt="5"
                      mb={5}
                      borderRadius={25}
                      w={"48"}
                      h={12}
                      onPress={handleLogin}
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

export default Login;
