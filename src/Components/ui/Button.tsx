import { ButtonHTMLAttributes, ReactNode } from "react";

interface Iprops extends ButtonHTMLAttributes<HTMLButtonElement> {
  className: string;
  children: ReactNode;
}

const Button = ({ children, className, ...rest }: Iprops) => {
  return (
    <button className={className} {...rest}>
      {children}
    </button>
  );
};

export default Button;
