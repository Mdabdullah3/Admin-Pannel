import { create } from 'zustand';
import axios from 'axios';
import { API_URL } from '../config';
import { toast } from 'react-toastify';

const useOtherStore = create((set) => ({
    others: [],
    other: null,
    loading: false,
    error: null,

    // Get all others
    fetchOthers: async () => {
        set({ loading: true });
        try {
            const response = await axios.get(`${API_URL}/others`, {
                withCredentials: true,
            });
            set({ others: response.data.data, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    // Get a single other by ID
    fetchOtherById: async (otherId) => {
        set({ loading: true });
        try {
            const response = await axios.get(`${API_URL}/others/${otherId}`, {
                withCredentials: true,
            });
            set({ other: response.data.data, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    // Create a new other
    createOther: async (newOther) => {
        set({ loading: true });
        try {
            const response = await axios.post(`${API_URL}/others`, newOther, {
                withCredentials: true,
            });
            set((state) => ({ others: [...state.others, response.data.data], loading: false }));
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    // Update an existing other
    updateOther: async (otherId, updatedOther) => {
        set({ loading: true });
        try {
            const response = await axios.patch(`${API_URL}/others/${otherId}`, updatedOther, {
                withCredentials: true,
            });

            set((state) => ({
                others: state.others.map((other) =>
                    other._id === otherId ? response.data.data : other
                ),
                loading: false,
            }));
            toast.success('Other updated successfully!');
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    // Delete an other
    deleteOther: async (otherId) => {
        set({ loading: true });
        try {
            await axios.delete(`${API_URL}/others/${otherId}`, {
                withCredentials: true,
            });
            set((state) => ({
                others: state.others.filter((other) => other._id !== otherId),
                loading: false,
            }));
            toast.success('Image deleted successfully!');
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },
}));

export default useOtherStore;