import api from './api';
import type { Product } from '../modals/Product';

export const getTopSellers = async (): Promise<Product[]> => {
  try {
    const response = await api.get<Product[]>('/products?isTopSeller=true');
    return response.data;
  } catch (error) {
    console.error('Error fetching top sellers:', error);
    throw error;
  }
};

export const getNewProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get<Product[]>('/products?isNewProduct=true');
    return response.data;
  } catch (error) {
    console.error('Error fetching new products:', error);
    throw error;
  }
};

export const getProductsByCategory = async (categoryId: string, page: number = 1, limit: number = 6, sort?: string, order?: string, q?: string): Promise<{data: Product[]; total: number}> => {
  try {
    const params: any = {
      categoryId,
      _page: page,
      _limit: limit,
    };
    if (sort && order) {

      params._sort = sort;
      params._order = order;
    }
    if (q) {
      params.q = q;
    }
    const response = await api.get<Product[]>('/products', { params });  
    return {data: response.data, total : Number(response.headers['x-total-count'])};  
  } catch (error) {
    console.error(`Error fetching products for category ${categoryId}:`, error);
    throw error;
  }
};

export const getProducts =async (
  params: Record<string, string | number>
)=>{
  const res =await api.get<Product[]>('/products', {params});
  return {data: res.data, total : Number(res.headers['x-total-count'])};
}

export const getProductById = async (id: string): Promise<Product> => {
  try {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }
};

