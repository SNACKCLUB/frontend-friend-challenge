import useFriendRequests from "../hooks/useFriendRequests";
import FriendCard from "./FriendCard";

const Requests = () => {
  const { requests, loading, acceptRequest, declineRequest } = useFriendRequests();

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Friend Requests</h2>

      {loading ? (
        <p className="text-gray-300">Loading...</p>
      ) : requests.length === 0 ? (
        <p className="text-gray-400">No pending requests.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((request) => (
            <FriendCard
              key={request.id}
              friend={request}
              actionType="request"
              onAction={() => acceptRequest(request.name)}
              onSecondaryAction={() => declineRequest(request.name)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Requests;
