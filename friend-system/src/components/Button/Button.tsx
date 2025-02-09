import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "sidebar" | "danger";
}

const VARIANT_STYLES: Record<Required<ButtonProps>["variant"], string> = {
  primary: "bg-[#7D00FF] text-white hover:brightness-110 shadow-md",
  secondary: "bg-[#2D0A40] text-gray-300 hover:bg-[#3B1153]",
  sidebar: "bg-[#2D0A40] text-gray-300 hover:bg-[#3B1153] text-left",
  danger: "bg-red-600 text-white hover:bg-red-700 shadow-md",
};

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  className = "",
  disabled,
  children,
  ...props
}) => {
  return (
    <button
      className={`py-3 px-4 rounded-lg text-lg font-semibold transition-all focus:outline-none w-full 
        ${VARIANT_STYLES[variant]} 
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
      aria-label={typeof children === "string" ? children : "button"}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
