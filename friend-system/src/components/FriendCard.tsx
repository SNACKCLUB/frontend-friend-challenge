import { Friend } from "../types";
import Button from "./Button";

interface FriendCardProps {
  friend: Friend;
  isFriend: boolean;
  onAction: () => void;
}

const FriendCard = ({ friend, isFriend, onAction }: FriendCardProps) => {
  return (
    <div className="bg-[#240046] rounded-2xl p-6 shadow-lg text-white flex flex-col items-center gap-4 w-64 relative border-4 border-[#7D00FF] transition-transform hover:scale-105">
      <div className="relative w-full h-48 bg-[#180026] rounded-xl overflow-hidden">
        <img src={friend.avatar} alt={friend.name} className="w-full h-full object-cover" />
      </div>
      <h3 className="text-xl font-semibold mt-3 text-center">{friend.name}</h3>
      <span className={`text-sm px-4 py-1 rounded-full font-medium ${isFriend ? "bg-green-600" : "bg-red-600"}`}>
        {isFriend ? "Friend" : "Not Friend"}
      </span>
      <Button
        variant={isFriend ? "secondary" : "primary"}
        onClick={onAction}
        className="px-4 py-2 text-md rounded-lg w-full"
      >
        {isFriend ? "Remove" : "Add Friend"}
      </Button>
    </div>
  );
};

export default FriendCard;
