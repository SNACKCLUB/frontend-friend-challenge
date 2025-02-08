import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({ variant = "primary", className, ...props }) => {
  const baseStyles =
    "w-full px-8 py-3 text-lg font-bold uppercase rounded-full transition-all shadow-md";
  const variants = {
    primary: "bg-gradient-to-r from-[#7D00FF] to-[#D600FF] hover:brightness-125",
    secondary: "bg-gradient-to-r from-[#00FF7F] to-[#00D6FF] hover:brightness-125",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    />
  );
};

export default Button;
