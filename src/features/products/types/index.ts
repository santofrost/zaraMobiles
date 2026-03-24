export interface Product {
  id: string;
  brand: string;
  name: string;
  price: number;
  currency: string;
  imageUrl: string;
}

export interface StorageOption {
  capacity: string;
  price: number;
}

export interface ColorOption {
  name: string;
  hexCode: string;
  imageUrl: string;
}

export interface ProductSpecs {
  screen: string;
  resolution: string;
  processor: string;
  mainCamera: string;
  selfieCamera: string;
  battery: string;
  os: string;
  screenRefreshRate: string;
}

export interface SimilarProduct {
  id: string;
  brand: string;
  name: string;
  basePrice: number;
  imageUrl: string;
}

export interface ProductDetail {
  id: string;
  brand: string;
  name: string;
  description: string;
  basePrice: number;
  rating: number;
  specs: ProductSpecs;
  colorOptions: ColorOption[];
  storageOptions: StorageOption[];
  similarProducts: SimilarProduct[];
}

export interface CartItem {
  cartId: string;
  productId: string;
  brand: string;
  name: string;
  imageUrl: string;
  storage: string;
  color: string;
  price: number;
  quantity: number;
}
