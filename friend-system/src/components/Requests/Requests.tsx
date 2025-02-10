import React from "react";
import useFriendRequests from "../../hooks/useFriendRequests";
import FriendCard from "../FriendCard";

const Requests = () => {
  const { requests, loading, acceptRequest, declineRequest } = useFriendRequests();

  const isEmpty = !loading && requests.length === 0;
  
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Friend Requests</h2>

      {loading && (
        <p className="text-gray-300" aria-live="polite">Loading...</p>
      )}

      {isEmpty && (
        <p className="text-gray-400" aria-live="polite">No pending requests.</p>
      )}

      {!loading && requests.length > 0 && (
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
