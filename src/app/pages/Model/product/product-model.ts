export interface CategoryEcommerceResponse {
    categoryId: number;
    name: string;
    description: string;
    parentCategory: CategoryEcommerceResponse | null;
  }
  
  export interface ProductEcommerceResponse {
    quantity: number;
    productId: number;
    name: string;
    description: string;
    price: number;
    isOnSale: boolean;
    discountPrice: number;
    percentOnSale: number;
    sku: string;
    stockQuantity: number;
    brand: string;
    status: string;
    imageUrl: string;
    category: CategoryEcommerceResponse;
  }
