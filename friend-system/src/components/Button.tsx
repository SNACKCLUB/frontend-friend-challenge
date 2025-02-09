interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "sidebar";
}

const Button = ({ variant = "primary", className, children, ...props }: ButtonProps) => {
  const baseStyles =
    "py-3 px-4 rounded-lg text-lg font-semibold transition-all focus:outline-none";
  
  const variants = {
    primary: "bg-[#7D00FF] text-white hover:brightness-110 shadow-md",
    secondary: "bg-[#2D0A40] text-gray-300 hover:bg-[#3B1153]",
    sidebar: "bg-[#2D0A40] text-gray-300 hover:bg-[#3B1153] w-full text-left",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className || ""}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
