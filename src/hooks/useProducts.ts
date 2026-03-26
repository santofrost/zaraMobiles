import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/api/product.service";

export const useProducts = (search?: string) => {
  return useQuery({
    queryKey: ["products", { search }],
    queryFn: () => getProducts({ search, limit: 20, offset: 0 }),
  });
};
