import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerUser } from "../services/authService";

const Register = () => {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    if (!name.trim()) {
      toast.warn("⚠️ Please enter a valid name!", { position: "top-center" });
      return;
    }

    const success = await registerUser(name);
    if (success) {
      toast.success("✅ Account created successfully! Redirecting to login...", { position: "top-center" });
      setTimeout(() => router.push("/login"), 2000); // Aguarda 2s antes de redirecionar
    } else {
      toast.error("❌ This name is already taken. Try another.", { position: "top-center" });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#1A0033] to-[#0D001A] text-white px-6">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-wider text-center">
        CREATE ACCOUNT
      </h1>
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded-full bg-[#240046] text-white placeholder-gray-400 text-lg outline-none border-2 border-[#7D00FF] focus:border-[#D600FF] transition-all"
        />
      </div>
      <button
        onClick={handleRegister}
        className="mt-6 w-full max-w-md px-8 py-3 text-lg font-bold uppercase rounded-full bg-gradient-to-r from-[#00FF7F] to-[#00D6FF] hover:brightness-125 transition-all shadow-md"
      >
        Register
      </button>
      <button
        onClick={() => router.push("/login")}
        className="mt-3 text-sm text-gray-300 hover:text-gray-100 transition-all"
      >
        Back to Login
      </button>
    </div>
  );
};

export default Register;
