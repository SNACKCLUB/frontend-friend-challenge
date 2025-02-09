import React from "react";

interface AvatarSelectorProps {
  avatars: string[];
  selectedAvatar: string;
  setSelectedAvatar: (avatar: string) => void;
}

const AvatarSelector = ({ avatars, selectedAvatar, setSelectedAvatar }: AvatarSelectorProps) => {
  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <p className="text-lg font-semibold text-gray-300">Choose your avatar</p>
      
      <div className="w-full max-w-md overflow-x-auto whitespace-nowrap flex gap-4 px-4 py-2 scrollbar-hide">
        {avatars.map((avatar, index) => (
          <img
            key={index}
            src={avatar}
            alt={`Avatar ${index + 1}`}
            className={`w-20 h-20 rounded-full cursor-pointer border-4 transition-all duration-200 ${
              selectedAvatar === avatar ? "border-[#7D00FF] scale-110 shadow-lg" : "border-transparent hover:scale-105 opacity-80 hover:opacity-100"
            }`}
            onClick={() => setSelectedAvatar(avatar)}
            aria-label={`Select Avatar ${index + 1}`}
            role="button"
          />
        ))}
      </div>
    </div>
  );
};

export default AvatarSelector;
