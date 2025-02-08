import { useState } from "react";
import { useRouter } from "next/router";
import useAuth from "../hooks/useAuth";
import Button from "../components/Button";

const Login = () => {
  const [name, setName] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    if (!name.trim()) {
      return;
    }

    const success = await login(name);
    if (success) {
      router.push("/friends");
    } else {
      alert("❌ Invalid name. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#1A0033] to-[#0D001A] text-white px-6">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-wider text-center">LOGIN</h1>
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded-full bg-[#240046] text-white placeholder-gray-400 text-lg outline-none border-2 border-[#7D00FF] focus:border-[#D600FF] transition-all"
        />
      </div>
      <Button onClick={handleLogin} className="mt-6 w-full max-w-md">
        Login
      </Button>
      <Button onClick={() => router.push("/register")} variant="secondary" className="mt-3 w-full max-w-md">
        Create Account
      </Button>
    </div>
  );
};

export default Login;
