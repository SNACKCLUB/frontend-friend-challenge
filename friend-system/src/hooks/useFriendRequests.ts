import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import { Friend } from "../types";
import { fakeDB } from "../mock-api/fakeDatabase";

const useFriendRequests = () => {
  const { user, updatePendingRequests } = useAuth();
  const [requests, setRequests] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchRequests = () => {
      setLoading(true);
      try {
        const pendingRequests: string[] = fakeDB.getFriendRequests(user) || [];

        const formattedRequests: Friend[] = pendingRequests
          .map((requestName: string) => {
            const friend = fakeDB.findUser(requestName);
            return friend ? { id: friend.id, name: friend.name, avatar: friend.avatar } : null;
          })
          .filter(Boolean) as Friend[];

        setRequests(formattedRequests);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [user]);

  const acceptRequest = (friendName: string) => {
    if (!user) return;

    const friend = requests.find((request) => request.name === friendName);
    if (!friend) return;

    fakeDB.acceptFriendRequest(user, friendName, updatePendingRequests);
    setRequests((prev) => prev.filter((request) => request.name !== friendName));
  };

  const declineRequest = (friendName: string) => {
    if (!user) return;

    const friendExists = requests.some((request) => request.name === friendName);
    if (!friendExists) return;

    fakeDB.declineFriendRequest(user, friendName, updatePendingRequests);
    updatePendingRequests();
    setRequests((prev) => prev.filter((request) => request.name !== friendName));
  };

  return { requests, loading, error, acceptRequest, declineRequest };
};

export default useFriendRequests;
