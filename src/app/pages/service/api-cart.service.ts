import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartProduct } from '../Model/cart/cart-model';
import { ProductEcommerceResponse } from '../Model/product/product-model';


@Injectable({
  providedIn: 'root'
})
export class ApiCartService {
  private cartItemsSubject = new BehaviorSubject<CartProduct[]>(this.loadCartFromStorage());
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {}

  private loadCartFromStorage(): CartProduct[] {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  }

  private saveCartToStorage(cartItems: CartProduct[]): void {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }

  getCartItems(): CartProduct[] {
    return this.cartItemsSubject.getValue();
  }

  addToCart(product:ProductEcommerceResponse ) {
    const productCart: CartProduct = {
      ...product};
    productCart.quantity = 1;

    const cartItems = this.getCartItems();
    const existingProduct = cartItems.find(item => item.productId === productCart.productId);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cartItems.push(productCart);
    }

    this.cartItemsSubject.next(cartItems);
    this.saveCartToStorage(cartItems);
  }

  removeFromCart(productId: number) {
    const cartItems = this.getCartItems().filter(item => item.productId !== productId);
    this.cartItemsSubject.next(cartItems);
    this.saveCartToStorage(cartItems);
  }

  updateQuantity(productId: number, quantity: number) {
    const cartItems = this.getCartItems();
    const product = cartItems.find(item => item.productId === productId);

    if (product) {
      product.quantity = quantity;
      this.cartItemsSubject.next(cartItems)
      this.saveCartToStorage(cartItems);
    }
  }

  getItemsCount(): number {
    return this.getCartItems().reduce((count, item) => count + item.quantity, 0);
  }

  getItemsDiscountCount(): number {
    return this.getCartItems().reduce((count, item) => count + (item.isOnSale ? item.quantity : 0), 0);
  }

  getTotal(): number {
    return this.getCartItems().reduce(
      (sum, item) => sum + (item.isOnSale ? item.discountPrice : item.price) * item.quantity,  0);
  }

  getTotalWithDiscount(): number {
    return this.getCartItems().reduce(
      (sum, item) => sum + (item.isOnSale ? item.percentOnSale*item.price : 0) * item.quantity,  0);
  }

  getTotalWithoutDiscount(): number {
    return this.getCartItems().reduce(
      (sum, item) => sum + item.price * item.quantity,  0);
  }
}