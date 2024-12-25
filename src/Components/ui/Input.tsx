import { InputHTMLAttributes } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ ...rest }: IProps) => {
  return (
    <input
      className="border-2 border-gray-300 mb-2 p-2 text-md rounded-md shadow-lg focus:border-indigo-500 outline-none focus:ring-indigo-500"
      {...rest}
    />
  );
};

export default Input;
