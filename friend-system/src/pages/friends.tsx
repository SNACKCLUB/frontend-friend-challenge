import useFriends from "../hooks/useFriends";

const Friends = () => {
  const { friends, loading, error } = useFriends();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <h1 className="text-3xl font-bold mb-4">FRIENDS LIST</h1>

      {error && (
        <div className="bg-red-500 text-white p-3 rounded-lg mb-4 w-64 text-center">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-gray-300">Loading friends...</p>
      ) : friends.length === 0 ? (
        <p className="text-gray-400">No friends found.</p>
      ) : (
        <ul className="space-y-2">
          {friends.map((friend, index) => (
            <li
              key={index}
              className="bg-gray-800 p-2 rounded-lg w-64 text-center"
            >
              {friend.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Friends;
