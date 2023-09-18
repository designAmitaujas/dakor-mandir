import capitalize from "lodash/capitalize";
import toString from "lodash/toString";
import {
  Button,
  FormControl,
  ICheckboxProps,
  Input,
  ISelectProps,
  Select,
  Spinner,
  Text,
  TextArea,
} from "native-base";
import { IButtonProps } from "native-base/lib/typescript/components/primitives/Button/types";
import { IInputProps } from "native-base/lib/typescript/components/primitives/Input/types";
import React, { memo, useEffect, useState } from "react";
import isEqual from "react-fast-compare";

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

interface ICustomButton extends IButtonProps {
  name: string;
  isSubmitting: boolean;
  onSubmit: () => void;
}

interface ICustomSelect extends ISelectProps {
  isRequired: boolean;
  isInvalid: boolean;
  label?: string;
  options: { label: string; value: string }[];
  name: string;
  setFieldValue: (arg0: string, arg1: string) => void;
  initValue?: string;
  errMsg: string;
}

interface ICustomCheckBox extends ICheckboxProps {
  isRequired: boolean;
  isInvalid: boolean;
  label: string;
  errMsg: string;
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
    type,
  } = props;

  const handleChangeText = (val: string) => {
    setFieldValue(name, val);
  };

  return (
    <FormControl isRequired={isRequired} isInvalid={isInvalid}>
      {label && <FormControl.Label>{label}</FormControl.Label>}
      <Input
        {...props}
        keyboardType={keyboardType}
        placeholder={placeholder}
        value={toString(currentValue)}
        onChangeText={handleChangeText}
        borderRadius="12"
        type={type}
      />
      <FormControl.ErrorMessage mt={0.5}>
        {capitalize(errMsg)}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}, isEqual);

export const CustomTextArea: React.FC<ICustomInput> = memo((props) => {
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
    <FormControl isRequired={isRequired} isInvalid={isInvalid}>
      {label && (
        <FormControl.Label fontWeight={"bold"}>{label}</FormControl.Label>
      )}
      <TextArea
        {...props}
        keyboardType={keyboardType}
        placeholder={placeholder}
        value={toString(currentValue)}
        onChangeText={handleChangeText}
        borderRadius="12"
        autoCompleteType={true}
      />
      <FormControl.ErrorMessage mt={0.5}>
        {capitalize(errMsg)}
      </FormControl.ErrorMessage>
    </FormControl>
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
  } = props;

  const [val, setValue] = useState("");

  useEffect(() => {
    if (initValue) {
      setValue(val);
    }
  }, [initValue]);

  const handleValueChange = (e: string) => {
    if (e) {
      setValue(e);
      setFieldValue(name, e);
    }
  };

  useEffect(() => {}, [errMsg]);

  return (
    <>
      <FormControl isRequired={isRequired} isInvalid={isInvalid}>
        <FormControl.Label fontWeight={"bold"}>
          {capitalize(label) + " "}
        </FormControl.Label>
      </FormControl>
      <Select {...props} selectedValue={val} onValueChange={handleValueChange}>
        {options.map((item) => {
          return (
            <Select.Item
              key={item.label + item.value}
              label={capitalize(item.label)}
              value={item.value}
            />
          );
        })}
      </Select>
      <FormControl>
        <FormControl.ErrorMessage>
          <Text>{capitalize(errMsg)}</Text>
        </FormControl.ErrorMessage>
      </FormControl>
    </>
  );
}, isEqual);

export const CustomCheckBox: React.FC<ICustomCheckBox> = memo((props) => {
  const { isInvalid, isRequired, label, errMsg } = props;

  return (
    <FormControl isRequired={isRequired} isInvalid={isInvalid}>
      <FormControl.Label fontWeight={"bold"}>
        {capitalize(label) + " "}
      </FormControl.Label>
      <FormControl.ErrorMessage>{capitalize(errMsg)}</FormControl.ErrorMessage>
    </FormControl>
  );
}, isEqual);

export const CustomButton: React.FC<ICustomButton> = memo((props) => {
  const { isSubmitting, name, onSubmit } = props;

  return (
    <Button
      {...props}
      onPress={onSubmit}
      leftIcon={
        isSubmitting === true ? (
          <Spinner color={"black"} />
        ) : (
          props.leftIcon || null
        )
      }
    >
      <Text>{capitalize(name)}</Text>
    </Button>
  );
}, isEqual);
