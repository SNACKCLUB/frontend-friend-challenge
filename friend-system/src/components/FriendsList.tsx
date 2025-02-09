import useFriends from "../hooks/useFriends";

const FriendsList = () => {
  const { friends, loading, error } = useFriends();

  return (
    <section className="flex flex-col items-center justify-center h-screen text-white">
      <h1 className="text-4xl font-extrabold tracking-wide mb-6 text-[#D6AFFF]">
        FRIENDS LIST
      </h1>

      {error && (
        <div className="bg-red-500/80 text-white p-3 rounded-lg mb-4 w-72 text-center shadow-md">
          ⚠️ {error}
        </div>
      )}

      {loading ? (
        <p className="text-gray-400 text-lg">Loading friends...</p>
      ) : friends.length === 0 ? (
        <div className="flex flex-col items-center">
          <p className="text-gray-300 text-lg">You don't have any friends yet.</p>
          <p className="text-[#D6AFFF] text-md mt-2">Start adding new friends in the Explore tab!</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {friends.map((friend, index) => (
            <li
              key={index}
              className="bg-[#2D0A40] p-3 rounded-lg w-64 text-center shadow-lg text-lg font-semibold"
            >
              {friend.name}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default FriendsList;
