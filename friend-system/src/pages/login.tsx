import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [name, setName] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    if (!name.trim()) {
      toast.warn("⚠️ Please enter a valid name!", { position: "top-center" });
      return;
    }

    const success = await login(name);
    if (success) {
      toast.success("✅ Login successful!", { position: "top-center" });
      router.push("/friends");
    } else {
      toast.error("❌ Invalid name. Please try again.", { position: "top-center" });
    }
  };

  const handleRegisterRedirect = () => {
    router.push("/register");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#1A0033] to-[#0D001A] text-white px-6">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-wider text-center">
        LOGIN
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
        onClick={handleLogin}
        className="mt-6 w-full max-w-md px-8 py-3 text-lg font-bold uppercase rounded-full bg-gradient-to-r from-[#7D00FF] to-[#D600FF] hover:brightness-125 transition-all shadow-md"
      >
        Login
      </button>
      <button
        onClick={handleRegisterRedirect}
        className="mt-3 w-full max-w-md px-8 py-3 text-lg font-bold uppercase rounded-full bg-gradient-to-r from-[#00FF7F] to-[#00D6FF] hover:brightness-125 transition-all shadow-md"
      >
        Create Account
      </button>
    </div>
  );
};

export default Login;
