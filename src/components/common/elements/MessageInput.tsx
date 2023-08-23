import { useState } from "react";
import { TextField } from "./Input";

interface MessageInputProps {
  onSubmit: (message: string) => void;
}
const MessageInput = ({ onSubmit }: MessageInputProps) => {
  const [msg, setMsg] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setMsg(value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      if (msg) {
        onSubmit(msg);
        setMsg("");
      }
    }
  };

  return (
    <TextField
      inputProps={{
        value: msg,
        placeholder: "메세지를 입력하세요.",
        className:
          "appearance-none w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-yellow-300 focus:border-yellow-300 border-gray-300 placeholder-gray-400 ",
        onChange: handleChange,
        onKeyDown: handleKeyDown,
      }}
    />
  );
};

export default MessageInput;
