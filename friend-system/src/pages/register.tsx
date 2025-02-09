import { useState } from "react";
import { useRouter } from "next/router";
import { registerUser } from "../services/authService";
import Button from "../components/Button";
import AvatarSelector from "../components/AvatarSelector";
import { fakeDB } from "../mock-api/fakeDatabase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [name, setName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    if (!name.trim() || !selectedAvatar) {
      toast.warn("⚠️ Please enter a name and select an avatar.");
      return;
    }

    const success = await registerUser(name, selectedAvatar);
    if (success) {
      toast.success("Account created successfully! Redirecting...");
      setTimeout(() => router.push("/login"), 2000);
    } else {
      toast.error("This name is already taken. Try another.");
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#1A0033] to-[#0D001A] text-white px-6">
      <h1 className="text-4xl font-extrabold mb-6 tracking-wider text-center">CREATE ACCOUNT</h1>

      <AvatarSelector
        avatars={fakeDB.getAvatars()}
        selectedAvatar={selectedAvatar}
        setSelectedAvatar={setSelectedAvatar}
      />

      <div className="relative w-full max-w-md mt-6">
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded-full bg-[#240046] text-white placeholder-gray-400 text-lg outline-none border-2 border-[#7D00FF] focus:border-[#D600FF] transition-all"
        />
      </div>

      <Button
        variant="primary"
        onClick={handleRegister}
        className="mt-6 w-full max-w-md"
      >
        Register
      </Button>

      <Button
        onClick={() => router.push("/login")}
        variant="secondary"
        className="mt-3 w-full max-w-md"
      >
        Back to Login
      </Button>
    </section>
  );
};

export default Register;
