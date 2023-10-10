import capitalize from "lodash/capitalize";
import toString from "lodash/toString";
import moment from "moment";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControl,
  HStack,
  IAlertProps,
  ICheckboxProps,
  Input,
  ISelectProps,
  ITextAreaProps,
  Pressable,
  Select,
  Spinner,
  Stack,
  Text,
  TextArea,
  VStack,
  WarningOutlineIcon,
} from "native-base";
import { IButtonProps } from "native-base/lib/typescript/components/primitives/Button/types";
import { IInputProps } from "native-base/lib/typescript/components/primitives/Input/types";
import React, { memo, useEffect, useState } from "react";
import isEqual from "react-fast-compare";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import useRunAfterInteraction from "../hooks/useRunAfterInteraction";
import { Feather, MaterialIcons } from "@expo/vector-icons";

interface ICustomInput extends IInputProps {
  name: string;
  label: string;
  placeholder: string;
  errMsg: string;
  currentValue: string | number;
  setFieldValue: (arg0: string, arg1: string) => void;
  isRequired: boolean;
  isInvalid: boolean;
}

interface ICustomTextArea extends ITextAreaProps {
  name: string;
  label: string;
  placeholder: string;
  errMsg: string;
  currentValue: string | number;
  setFieldValue: (arg0: string, arg1: string) => void;
  isRequired: boolean;
  isInvalid: boolean;
}

interface ICustomButton extends IButtonProps {
  name: string;
  isSubmitting: boolean;
  onSubmit: () => void;
}

interface ICustomSelect extends ISelectProps {
  isRequired: boolean;
  isInvalid: boolean;
  label: string;
  options: { label: string; value: string }[];
  name: string;
  setFieldValue: (arg0: string, arg1: string) => void;
  initValue?: string;
  errMsg: string;
  placeholder: string;
}

interface ICustomCheckBox extends ICheckboxProps {
  isRequired: boolean;
  isInvalid: boolean;
  label: string;
  errMsg: string;
  name: string;
  setFieldValue: (arg0: string, arg1: boolean) => void;
  currValue: boolean;
}

interface ICustomAlert extends IAlertProps {
  colorScheme: string;
  status: string;
  resMsg: string;
}

interface ICustomDateTimePicker {
  name: string;
  label: string;
  type: string;
  helperText: string;
  errMsg: string;
  value: string;
  placeholder: string;
  setFieldValue: (arg0: string, arg1: string) => void;
  isReadOnly: boolean;
  isRequired: boolean;
  isInvalid: boolean;
  is24Hour: boolean;
  mode: string;
}

export const CustomInput: React.FC<ICustomInput> = memo((props) => {
  const {
    setFieldValue,
    currentValue,
    errMsg,
    label,
    name,
    placeholder,
    isRequired,
    isInvalid,
    keyboardType,
  } = props;

  const handleChangeText = (val: string) => {
    setFieldValue(name, val);
  };

  return (
    <>
      <FormControl isRequired={isRequired} isInvalid={isInvalid}>
        {label && (
          <FormControl.Label fontWeight={"bold"} color={"gray.500"}>
            {label + " "}
          </FormControl.Label>
        )}
        <Input
          {...props}
          keyboardType={keyboardType}
          placeholder={placeholder}
          value={toString(currentValue)}
          onChangeText={handleChangeText}
          borderRadius={"md"}
          color={"gray.500"}
          bg={"white"}
          fontSize={"sm"}
        />
      </FormControl>
      <Stack w={"100%"} mt={-1.5}>
        {isInvalid ? (
          <>
            <CustomError errMsg={errMsg?.toLowerCase()} />
          </>
        ) : (
          <></>
        )}
      </Stack>
    </>
  );
}, isEqual);

export const CustomTextArea: React.FC<ICustomTextArea> = memo((props) => {
  const {
    setFieldValue,
    currentValue,
    errMsg,
    label,
    name,
    placeholder,
    isRequired,
    isInvalid,
    keyboardType,
  } = props;

  const handleChangeText = (val: string) => {
    setFieldValue(name, val);
  };

  return (
    <>
      <FormControl isRequired={isRequired} isInvalid={isInvalid}>
        {label && (
          <FormControl.Label fontWeight={"bold"} color={"gray.500"}>
            {label + " "}
          </FormControl.Label>
        )}
        {/* <Input
          {...props}
          keyboardType={keyboardType}
          placeholder={placeholder}
          value={toString(currentValue)}
          onChangeText={handleChangeText}
          borderRadius={"md"}
          color={"gray.500"}
          bg={"white"}
          fontSize={"sm"}
        /> */}
        <TextArea
          {...props}
          keyboardType={keyboardType}
          placeholder={placeholder}
          value={toString(currentValue)}
          onChangeText={handleChangeText}
          borderRadius={"md"}
          color={"gray.500"}
          bg={"white"}
          fontSize={"sm"}
          autoCompleteType={false}
        />
      </FormControl>
      <Stack w={"100%"} mt={-1.5}>
        {isInvalid ? (
          <>
            <CustomError errMsg={errMsg?.toLowerCase()} />
          </>
        ) : (
          <></>
        )}
      </Stack>
    </>
  );
}, isEqual);

export const CustomSelect: React.FC<ICustomSelect> = memo((props) => {
  const {
    isRequired,
    isInvalid,
    label,
    options,
    name,
    setFieldValue,
    initValue,
    errMsg,
    placeholder,
  } = props;

  const [val, setValue] = useState("");
  const [key, setKey] = useState(Math.random());

  useEffect(() => {
    if (initValue) {
      setValue(initValue);
      setKey(Math.random());
    }
  }, [initValue]);

  const handleValueChange = (e: string) => {
    if (e) {
      setValue(e);
      setFieldValue(name, e);
    }
  };

  return (
    <>
      <FormControl isRequired={isRequired} isInvalid={isInvalid}>
        <FormControl.Label fontWeight={"bold"} color={"gray.500"}>
          {label + " "}
        </FormControl.Label>
      </FormControl>
      <Select
        key={key}
        {...props}
        selectedValue={val}
        onValueChange={handleValueChange}
        placeholder={placeholder}
        borderRadius={"md"}
        fontSize={"sm"}
        dropdownIcon={
          <MaterialIcons
            name="arrow-drop-down"
            size={30}
            color="#1A237E"
            style={{ marginRight: 8 }}
          />
        }
        _selectedItem={{
          bg: "gray.300",
          endIcon: (
            <Feather
              name="check"
              size={18}
              color="#000000"
              style={{ marginTop: 2 }}
            />
          ),
        }}
      >
        {options.map((item) => {
          return (
            <Select.Item
              key={item.label + item.value}
              label={capitalize(item.label)}
              value={item.value}
              fontSize={"sm"}
            />
          );
        })}
      </Select>
      <Stack w={"100%"} mt={-1.5}>
        {isInvalid ? (
          <>
            <CustomError errMsg={errMsg?.toLowerCase()} />
          </>
        ) : (
          <></>
        )}
      </Stack>
    </>
  );
}, isEqual);

export const CustomCheckBox: React.FC<ICustomCheckBox> = memo((props) => {
  const {
    isInvalid,
    isRequired,
    label,
    errMsg,
    value,
    setFieldValue,
    name,
    currValue,
  } = props;

  const handleCheckBox = (val: boolean) => {
    setFieldValue(name, val);
  };

  return (
    <FormControl isRequired={isRequired} isInvalid={isInvalid}>
      <FormControl.Label fontWeight={"bold"}>
        <HStack space={6}>
          <Checkbox
            shadow={2}
            value="test"
            accessibilityLabel="This is a dummy checkbox"
            defaultIsChecked={currValue}
            onChange={handleCheckBox}
          >
            {capitalize(label) + " "}
          </Checkbox>
        </HStack>
      </FormControl.Label>
      <FormControl.ErrorMessage>{capitalize(errMsg)}</FormControl.ErrorMessage>
    </FormControl>
  );
}, isEqual);

export const CustomAlert: React.FC<ICustomAlert> = memo((props) => {
  const { colorScheme, status, resMsg } = props;

  return (
    <Alert
      w="100%"
      variant={"left-accent"}
      colorScheme={colorScheme}
      status={status}
    >
      <VStack space={2} flexShrink={1} w="100%">
        <HStack
          flexShrink={1}
          space={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <HStack space={2} flexShrink={1} alignItems="center">
            <Alert.Icon />
            <Text>{resMsg}</Text>
          </HStack>
        </HStack>
      </VStack>
    </Alert>
  );
}, isEqual);

export const CustomButton: React.FC<ICustomButton> = memo((props) => {
  const { isSubmitting, name, onSubmit } = props;

  return (
    <Button
      {...props}
      onPress={onSubmit}
      leftIcon={isSubmitting === true ? <Spinner /> : props.leftIcon || null}
    >
      <Text fontWeight={"medium"} color={"white"}>
        {name}
      </Text>
    </Button>
  );
}, isEqual);

export const CustomDateTimePicker: React.FC<ICustomDateTimePicker> = memo(
  (props) => {
    const {
      name,
      label,
      type,
      helperText,
      errMsg,
      value,
      placeholder,
      setFieldValue,
      isReadOnly,
      isRequired,
      isInvalid,
      is24Hour = false,
      mode,
    } = props;

    const [selectedTime, setSelectedTime] = useState(null);
    const [timepickerVisible, setTimepickerVisible] = useState(false);

    const handleTimeSelect = (time) => {
      setSelectedTime(time);
      setFieldValue(name, time);
      setTimepickerVisible(false);
    };

    const showTimePicker = () => {
      setTimepickerVisible(true);
    };

    const hideTimePicker = () => {
      setTimepickerVisible(false);
    };

    useRunAfterInteraction(() => {
      setFieldValue(name, value);
    }, [value]);

    return (
      <>
        <Pressable onPress={showTimePicker}>
          <Box alignItems="center">
            <Box>
              <FormControl isRequired={isRequired}>
                <Stack w={"100%"}>
                  <FormControl.Label>{label}</FormControl.Label>
                  <Input
                    borderColor={"#1A237E"}
                    borderRadius={"md"}
                    w={"100%"}
                    //@ts-ignore
                    type={type}
                    defaultValue={value}
                    placeholder={placeholder}
                    isReadOnly={isReadOnly}
                    isInvalid={isInvalid}
                    value={
                      selectedTime
                        ? moment(selectedTime).format("DD-MM-YYYY")
                        : value
                        ? moment(value).format("DD-MM-YYYY")
                        : "DD-MM-YYYY"
                    }
                  />
                </Stack>
              </FormControl>
              <Stack w={"100%"} mt={-1.5}>
                {isInvalid ? (
                  <>
                    <CustomError errMsg={errMsg} />
                  </>
                ) : (
                  <></>
                )}
              </Stack>
            </Box>
          </Box>
        </Pressable>
        <DateTimePickerModal
          isVisible={timepickerVisible}
          //@ts-ignore
          mode={mode}
          timePickerModeAndroid="default"
          onConfirm={handleTimeSelect}
          onCancel={hideTimePicker}
          is24Hour={is24Hour}
        />
      </>
    );
  },
  isEqual
);

interface ICustomDatePicker {
  name: string;
  label: string;
  type: string;
  helperText: string;
  errMsg: string;
  value: string;
  placeholder: string;
  setFieldValue: (arg0: string, arg1: string) => void;
  isReadOnly: boolean;
  isRequired: boolean;
  isInvalid: boolean;
  is24Hour: boolean;
  mode: string;
}

export const CustomDatePicker: React.FC<ICustomDatePicker> = memo((props) => {
  const {
    name,
    label,
    type,
    helperText,
    errMsg,
    value,
    placeholder,
    setFieldValue,
    isReadOnly,
    isRequired,
    isInvalid,
    is24Hour = false,
    mode,
  } = props;

  const [selectedTime, setSelectedTime] = useState(null);
  const [timepickerVisible, setTimepickerVisible] = useState(false);

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setFieldValue(name, time);
    setTimepickerVisible(false);
  };

  const showTimePicker = () => {
    setTimepickerVisible(true);
  };

  const hideTimePicker = () => {
    setTimepickerVisible(false);
  };

  useRunAfterInteraction(() => {
    setFieldValue(name, value);
  }, [value]);

  return (
    <>
      <Pressable onPress={showTimePicker} w={"100%"}>
        <Box alignItems="center">
          <Box>
            <FormControl isRequired={isRequired}>
              <Stack w={"100%"}>
                <FormControl.Label>{label}</FormControl.Label>
                <Input
                  borderColor={"#1A237E"}
                  borderRadius={"md"}
                  w={"100%"}
                  //@ts-ignore
                  type={type}
                  defaultValue={value.toString()}
                  placeholder={placeholder}
                  isReadOnly={isReadOnly}
                  isInvalid={isInvalid}
                  value={
                    selectedTime
                      ? moment(selectedTime).format("DD-MM-YYYY")
                      : value
                      ? moment(value).format("DD-MM-YYYY")
                      : "DD-MM-YYYY"
                  }
                />
              </Stack>
            </FormControl>
            <Stack w={"100%"} mt={-1.5}>
              {isInvalid ? (
                <>
                  <CustomError errMsg={errMsg} />
                </>
              ) : (
                <></>
              )}
            </Stack>
          </Box>
        </Box>
      </Pressable>
      <DateTimePickerModal
        isVisible={timepickerVisible}
        //@ts-ignore
        mode={"date"}
        timePickerModeAndroid="default"
        onConfirm={handleTimeSelect}
        onCancel={hideTimePicker}
        is24Hour={is24Hour}
      />
    </>
  );
}, isEqual);

interface ICustomTimePicker {
  name: string;
  label: string;
  type: string;
  helperText: string;
  errMsg: string;
  value: string;
  placeholder: string;
  setFieldValue: (arg0: string, arg1: string) => void;
  isReadOnly: boolean;
  isRequired: boolean;
  isInvalid: boolean;
  is24Hour: boolean;
  mode: string;
}

export const CustomTimePicker: React.FC<ICustomTimePicker> = memo((props) => {
  const {
    name,
    label,
    type,
    helperText,
    errMsg,
    value,
    placeholder,
    setFieldValue,
    isReadOnly,
    isRequired,
    isInvalid,
    is24Hour = false,
    mode,
  } = props;

  const [selectedTime, setSelectedTime] = useState(null);
  const [timepickerVisible, setTimepickerVisible] = useState(false);

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setFieldValue(name, time);
    setTimepickerVisible(false);
  };

  const showTimePicker = () => {
    setTimepickerVisible(true);
  };

  const hideTimePicker = () => {
    setTimepickerVisible(false);
  };

  useRunAfterInteraction(() => {
    setFieldValue(name, value);
  }, [value]);

  return (
    <>
      <Pressable onPress={showTimePicker}>
        <Box alignItems="center">
          <Box>
            <FormControl isRequired={isRequired}>
              <Stack w={"100%"}>
                <FormControl.Label>{label}</FormControl.Label>
                <Input
                  borderRadius={"md"}
                  w={"100%"}
                  //@ts-ignore
                  type={type}
                  defaultValue={value}
                  placeholder={placeholder}
                  isReadOnly={isReadOnly}
                  isInvalid={isInvalid}
                  value={
                    selectedTime
                      ? moment(selectedTime).format("h:mm A")
                      : value
                      ? moment(value).format("h:mm A")
                      : "--:--"
                  }
                />
              </Stack>
            </FormControl>
            <Stack w={"100%"}>
              {isInvalid ? (
                <>
                  <CustomError errMsg={errMsg} />
                </>
              ) : (
                <></>
              )}
            </Stack>
          </Box>
        </Box>
      </Pressable>
      <DateTimePickerModal
        isVisible={timepickerVisible}
        //@ts-ignore
        mode={"time"}
        timePickerModeAndroid="default"
        onConfirm={handleTimeSelect}
        onCancel={hideTimePicker}
        is24Hour={is24Hour}
      />
    </>
  );
}, isEqual);

interface ICustomError {
  errMsg: string;
}

const CustomError: React.FC<ICustomError> = memo((props) => {
  const { errMsg } = props;

  return (
    <>
      <HStack space={1} alignItems={"center"} marginTop={2}>
        <WarningOutlineIcon size="xs" color={"danger.600"} />
        <Text color={"danger.600"} fontSize={"xs"}>
          {errMsg}
        </Text>
      </HStack>
    </>
  );
}, isEqual);
