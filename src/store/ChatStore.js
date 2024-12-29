import { create } from "zustand";
import axios from "axios";
import { API_URL } from "../config";
import { toast } from "react-toastify";

const useChatStore = create((set) => ({
    chats: [],
    loading: false,
    error: null,
    fetchChats: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/reports?chatsOnly=true`, {
                withCredentials: true,
            });

            const chatsData = response.data.data;
            set({ chats: chatsData })
            set({ loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "An error occurred", loading: false });
        }
    },
    sendMessage: async (message) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/reports`, message, {
                withCredentials: true,
            });
            const chatsData = response.data.data;
            set({ chats: chatsData });
            set({ loading: false });
            toast.success('Message sent successfully!');
        } catch (error) {
            toast.error('Failed to send message:', error);
        }
    },
    updateMessage: async (message, id) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.patch(`${API_URL}/reports/${id}`, message, {
                withCredentials: true,
            });
            const chatsData = response.data.data;
            set({ chats: chatsData });
            toast.success('Message updated successfully!');
            set({ loading: false });
        } catch (error) {
            toast.error('Failed to update message:', error);
        }
    },
    deleteMessage: async (id) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.delete(`${API_URL}/reports/${id}`, {
                withCredentials: true,
            });
            const chatsData = response.data.data;
            set({ chats: chatsData });
            toast.success('Message deleted successfully!');
            set({ loading: false });
        } catch (error) {
            toast.error('Failed to delete message:', error);
        }
    },
    singleMessage: async (id) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/reports/${id}`, {
                withCredentials: true,
            });
            const chatsData = response.data.data;
            set({ chats: chatsData });
        } catch (error) {
            set({ error: error.response?.data?.message || "An error occurred", loading: false });
        }
    },
    loadUserChats: async (id, replyToId) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/users/${id}/reports?_filter[replyTo]=${replyToId}&chatsOnly=true&_limit=100000`, {
                withCredentials: true,
            });
            const chatsData = response.data.data;
            set({ chats: chatsData });
        } catch (error) {
            set({ error: error.response?.data?.message || "An error occurred", loading: false });
        }
    },
}));

export default useChatStore;
