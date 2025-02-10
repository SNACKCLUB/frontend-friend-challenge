import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import { Friend } from "../types";
import { fakeDB } from "../mock-api/fakeDatabase";

const useFriends = () => {
  const { user } = useAuth();
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchFriends = () => {
      try {
        const foundUser = fakeDB.findUser(user);
        if (!foundUser) throw new Error("User not found");

        const friendList = foundUser.friends
          .map(friendName => fakeDB.findUser(friendName))
          .filter(Boolean)
          .map(friend => ({
            ...friend!,
            avatar: friend!.avatar
          })) as Friend[];

        setFriends(friendList);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, [user]);

  const removeFriend = (friendId: number) => {
    if (!user) return;

    const success = fakeDB.removeFriend(user, friendId);
    
    if (success) {
      const foundUser = fakeDB.findUser(user);
      if (foundUser) {
        setFriends(prevFriends => prevFriends.filter(friend => friend.id !== friendId));
      }
    }
  };

  return { friends, loading, error, removeFriend };
};

export default useFriends;
