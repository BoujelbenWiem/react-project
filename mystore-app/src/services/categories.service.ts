import api from "./api";
import type { Category } from "../modals/Category";

export const getCategories = async (): Promise<Category[]> => {
    try {
        const response = await api.get<Category[]>('/categories');
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};
