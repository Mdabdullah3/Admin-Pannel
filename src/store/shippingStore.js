import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from '../config';

const useShippingStore = create((set, get) => ({
    shippingCharges: {},
    loading: false,
    error: null,

    // Function to fetch current shipping charges
    fetchShippingCharges: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/delivery-fees?_limit=64`, {
                withCredentials: true,
            });
            set({ shippingCharges: response.data.data, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || 'Failed to fetch shipping charges', loading: false });
        }
    },

    // Function to update multiple shipping charges
    // Function to update multiple shipping charges
    updateMultipleShippingCharges: async (updates) => {
        set({ loading: true, error: null });
        try {
            // Prepare the request body
            const deliveryFeeIds = updates.map(update => update.districtId);  
            const deliveryFee = updates[0].deliveryFee;  // Assuming all selected districts share the same fee

            if (deliveryFeeIds.length === 0 || deliveryFee === undefined) {
                throw new Error("No delivery fee or deliveryFeeIds provided");
            }

            // Send the update request
            const response = await axios.patch(`${API_URL}/delivery-fees/update-many`, {
                deliveryFeeIds,
                deliveryFee
            }, {
                withCredentials: true,
            });
            toast.success("Shipping charges updated successfully!");
            get().fetchShippingCharges();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update shipping charges");
            set({ loading: false });
        }
    },



    // Function to update a single shipping charge
    updateSingleShippingCharge: async (deliveryFeeId, deliveryFee) => {
        set({ loading: true, error: null });
        try {
            await axios.patch(`${API_URL}/delivery-fees/${deliveryFeeId}`, { deliveryFee }, {
                withCredentials: true,
            });

            toast.success("Shipping charge updated successfully!");
            get().fetchShippingCharges();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update shipping charge");
            set({ loading: false });
        }
    },
}));

export default useShippingStore;
