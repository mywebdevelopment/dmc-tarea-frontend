import { ProductEcommerceResponse } from "../product/product-model";


export interface CartProduct extends ProductEcommerceResponse {
  quantity: number;
}