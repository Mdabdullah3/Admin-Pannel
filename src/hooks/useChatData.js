import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config";
import { toast } from "react-toastify";

const useChatData = (userId, conversationId) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChats = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `${API_URL}/users/${userId}/reports?_filter[replyTo]=${conversationId}&chatsOnly=true`,
                    { withCredentials: true }
                );
                const fetchedChats = response?.data?.data || [];
                setMessages((prevMessages) => [
                    ...prevMessages,
                    ...fetchedChats,
                ]);
            } catch (err) {
                console.error("Error fetching user chats:", err);
                setError("Failed to load chats");
                toast.error("Failed to load chats");
            } finally {
                setLoading(false);
            }
        };

        if (userId) fetchChats();
    }, [userId, conversationId]);

    return { messages, loading, error, setMessages };
};

export default useChatData;
