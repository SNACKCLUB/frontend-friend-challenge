import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import { Friend } from "../types";

const useFriends = () => {
  const { user } = useAuth();
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchFriends = async () => {
      try {
        const response = await fetch(`http://localhost:5001/users?name=${user}`);
        if (!response.ok) throw new Error("Failed to fetch friends");
        
        const data = await response.json();

        setFriends(data.length > 0 && data[0].friends ? data[0].friends : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, [user]);

  return { friends, loading, error };
};

export default useFriends;
