import { ButtonHTMLAttributes } from "react";

type Props = {
  text: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: () => void;
  isDisabled?: boolean;
};

export function Button({ text, type, onClick, isDisabled }: Props) {
  return (
    <button
      className="bg-black text-white py-2 px-4 rounded disabled:opacity-70"
      type={type}
      onClick={onClick}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
}
