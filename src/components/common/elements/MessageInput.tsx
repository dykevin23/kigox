import { useState } from "react";
import ControlledInput from "./Input";

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
    <ControlledInput
      name="message"
      value={msg}
      placeholder="메세지를 입력하세요."
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
};

export default MessageInput;
