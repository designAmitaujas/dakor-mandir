import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import {
  Icon,
  IconButton,
  Image,
  Link,
  ScrollView,
  Text,
  VStack,
  View,
  useToast,
} from "native-base";

import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { useFetch } from "use-http";
import * as Yup from "yup";
import {
  CustomAlert,
  CustomButton,
  CustomInput,
} from "../../components/CustomForm";
import { useAppState } from "../../store/store";
import axios from "axios";

interface IInitialValues {
  username: string;
  password: string;
}

const initialValue: IInitialValues = {
  username: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required(),
});

export interface Root {
  success: boolean;
  msg: string;
  data: Data;
}
export interface Data {
  EmployeeId: number;
  FirstName: string;
  LastName: string;
  EmployeeCode: string;
  UploadImage: string;
  username: string;
  Mobile: string;
  DesignationId: number;
  Department: string;
  ReminderHead: string;
  AllowChatting: any;
  AllowPasswordModule: any;
  PasswordManager: any;
  IsAdmin: boolean;
}

const Login = () => {
  const { navigate } = useNavigation();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const { setAuthTrue } = useAppState();
  const { post, response } = useFetch<Root>("/Master/Login");
  const myToast = useToast();

  useEffect(() => {
    if (response.data) {
      console.log("REsponse ", response.data);
    }
  }, [response]);

  const handleSubmit = async (values: IInitialValues) => {
    try {
      await post({
        username: values.username,
        password: values.password,
      })
        .then((res) => {
          console.log(res.data);
          if (res.success) {
            myToast.show({
              title: res.msg,
              placement: "top",
              render: () => (
                <CustomAlert
                  colorScheme="success"
                  status="success"
                  resMsg={res.msg}
                />
              ),
            });

            setAuthTrue({
              username: res.data.username,

              isAdmin: res.data.IsAdmin,
              isAuth: true,
            });
            //@ts-ignore
            navigate("Home");
          } else {
            myToast.show({
              title: res.msg,
              placement: "top",
              render: () => (
                <CustomAlert
                  colorScheme="info"
                  status="info"
                  resMsg={res.msg}
                />
              ),
            });
          }
        })

        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
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
                      name="username"
                      label="Email Address"
                      currentValue={values.username}
                      errMsg={errors.username}
                      placeholder="Your Email Address"
                      setFieldValue={setFieldValue}
                      isRequired={true}
                      isInvalid={!!touched.username && !!errors.username}
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
                                color="#1A237E"
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
                        color: "#313031",
                        fontWeight: "medium",
                        fontSize: "sm",
                        textDecoration: "none",
                      }}
                    >
                      Forgot Password ?
                    </Link>

                    <CustomButton
                      name="Login"
                      mt="8"
                      mb={8}
                      borderRadius={25}
                      w={48}
                      h={12}
                      alignSelf={"center"}
                      bg={"#ffda67"}
                      leftIcon={
                        <Icon as={FontAwesome5} name="lock" mr="1" size="sm" />
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
