import React, { useEffect } from "react";
import useChatStore from "../../store/ChatStore";
import { SERVER } from "../../config";
import { useNavigate } from "react-router-dom";

const ChatCenterAdminView = () => {
  const { chats, fetchChats } = useChatStore();

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);
  const uniqueChats = [];
  const seenUsers = new Set();

  // Filter chat data by unique user
  chats?.forEach((chat) => {
    const userId = chat.user._id;
    const userRole = chat.user.role;

    if (!seenUsers.has(userId) && userRole !== "admin") {
      seenUsers.add(userId);
      uniqueChats.push(chat);
    }
  });
  const navigate = useNavigate();
  const handleViewChat = (id) => {
    navigate(`/admin/user-chat/${id}`);
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Vendor Chat Center</h1>
      <ul className="mt-4">
        {uniqueChats?.map((chat) => (
          <li
            key={chat?.user?._id}
            className="flex items-center justify-between p-4 border-b "
          >
            <div className="flex items-center gap-2">
              <img
                src={`${SERVER}${chat?.user?.avatar?.secure_url}`}
                alt=""
                className="w-12 h-12 rounded-full"
              />
              <h1 className=" capitalize text-md font-semibold">
                {chat?.user?.name}
              </h1>
            </div>
            <button
              className="text-blue-500"
              onClick={() => handleViewChat(chat?.user?._id)}
            >
              View Chat
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatCenterAdminView;
