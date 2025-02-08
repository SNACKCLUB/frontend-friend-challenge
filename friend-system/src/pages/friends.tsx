import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

interface Friend {
  id: number;
  name: string;
}

const Friends = () => {
  const { user } = useAuth();
  const [friends, setFriends] = useState<Friend[]>([]);

  useEffect(() => {
    if (user) {
      setFriends([
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
        { id: 3, name: "Charlie" },
      ]);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-[#1A0033] to-[#0D001A] text-white px-6">
      <h1 className="text-3xl md:text-4xl font-extrabold mt-10 mb-6 tracking-wider">
        FRIENDS LIST
      </h1>
      {user ? (
        <div className="w-full max-w-2xl">
          <ul className="space-y-4">
            {friends.map((friend) => (
              <li
                key={friend.id}
                className="flex justify-between items-center p-4 bg-[#240046] rounded-xl border-2 border-[#7D00FF] shadow-lg hover:border-[#D600FF] transition-all"
              >
                <span className="text-lg font-semibold">{friend.name}</span>
                <button className="px-4 py-2 text-sm font-bold rounded-full bg-gradient-to-r from-[#7D00FF] to-[#D600FF] hover:brightness-125 transition-all shadow-md">
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-lg text-gray-300">Please log in to see your friends.</p>
      )}
    </div>
  );
};

export default Friends;
