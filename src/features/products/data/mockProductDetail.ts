import { ProductDetail } from "../types";

export const mockProductDetail: ProductDetail = {
  id: "SMG-S24U",
  brand: "Samsung",
  name: "Galaxy S24 Ultra",
  description:
    "El Samsung Galaxy S24 Ultra es un smartphone de gama alta con una pantalla Dynamic AMOLED 2X de 6.8 pulgadas, procesador Qualcomm Snapdragon 8 Gen 3 for Galaxy, y un avanzado sistema de cámara con inteligencia artificial.",
  basePrice: 1329,
  rating: 4.6,
  specs: {
    screen: '6.8" Dynamic AMOLED 2X',
    resolution: "3120 x 1440 pixels",
    processor: "Qualcomm Snapdragon 8 Gen 3 for Galaxy Octa-Core",
    mainCamera:
      "200 MP (F1.7) Principal, OIS + 10 MP (F2.4) Zoom x3, OIS + 12 MP (F2.2) Ultra gran angular + 50 MP (F3.4) Zoom x5, OIS",
    selfieCamera: "12 MP",
    battery: "5000 mAh",
    os: "Android 14",
    screenRefreshRate: "120 Hz",
  },
  colorOptions: [
    {
      name: "Titanium Violet",
      hexCode: "#8E6F96",
      imageUrl: "/images/phones/samsung.png",
    },
    {
      name: "Titanium Black",
      hexCode: "#000000",
      imageUrl: "/images/phones/samsung.png",
    },
    {
      name: "Titanium Gray",
      hexCode: "#808080",
      imageUrl: "/images/phones/samsung.png",
    },
    {
      name: "Titanium Yellow",
      hexCode: "#FFFF00",
      imageUrl: "/images/phones/samsung.png",
    },
  ],
  storageOptions: [
    { capacity: "256 GB", price: 1229 },
    { capacity: "512 GB", price: 1329 },
    { capacity: "1 TB", price: 1529 },
  ],
  similarProducts: [
    {
      id: "1",
      brand: "Apple",
      name: "iPhone 15 Pro",
      basePrice: 1219,
      imageUrl: "/images/phones/iphone.png",
    },
    {
      id: "2",
      brand: "Google",
      name: "Pixel 8a",
      basePrice: 549,
      imageUrl: "/images/phones/pixel.png",
    },
    {
      id: "3",
      brand: "Apple",
      name: "iPhone 15",
      basePrice: 959,
      imageUrl: "/images/phones/iphone.png",
    },
    {
      id: "5",
      brand: "Samsung",
      name: "Galaxy A25 5G",
      basePrice: 239,
      imageUrl: "/images/phones/samsung.png",
    },
    {
      id: "6",
      brand: "Xiaomi",
      name: "Xiaomi 14",
      basePrice: 699,
      imageUrl: "/images/phones/xiaomi.png",
    },
    {
      id: "7",
      brand: "OnePlus",
      name: "OnePlus 12",
      basePrice: 799,
      imageUrl: "/images/phones/oneplus.png",
    },
  ],
};
