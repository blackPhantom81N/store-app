import { Input } from "@chakra-ui/react";
import React from "react";

interface TextInputProps {
  placeholder?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = ({ placeholder, name, value, onChange }: TextInputProps) => {
  return (
    <>
      <Input
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default TextInput;
