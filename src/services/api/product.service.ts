import { apiClient } from "./client";

interface GetProductsParams {
    search?: string;
    limit?: number;
    offset?: number;
}

export const getProducts = async (params?: GetProductsParams) => {
    const { data } = await apiClient.get("/products", { params });
    return data;
};

export const getProductById = async (id: string) => {
    const { data } = await apiClient.get(`/products/${id}`);
    return data;
};