import { useState } from "react";
import { useRouter } from "next/router";
import { registerUser } from "../services/authService";
import { toast } from "react-toastify";
import Button from "../components/Button";

const Register = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    if (!name.trim()) {
      toast.warn("Please enter a valid name.");
      return;
    }
  
    const success = await registerUser(name);
    if (success) {
      toast.success("Account created successfully! Please log in.");
      router.push("/login");
    } else {
      toast.error("This name is already taken. Try another.");
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#1A0033] to-[#0D001A] text-white px-6">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-wider text-center">CREATE ACCOUNT</h1>
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError("");
          }}
          className="w-full p-3 rounded-full bg-[#240046] text-white placeholder-gray-400 text-lg outline-none border-2 border-[#7D00FF] focus:border-[#D600FF] transition-all"
        />
      </div>
      {error && <p className="text-red-400 mt-2">{error}</p>}
      <Button
        variant="primary"
        onClick={handleRegister}
        className="mt-6 w-full max-w-md px-8 py-3"
      >
        Register
      </Button>

      <Button
        onClick={() => router.push("/login")}
        variant="secondary"
        className="mt-3 w-full max-w-md px-8 py-3"
      >
        Back to Login
      </Button>
    </section>
  );
};

export default Register;
