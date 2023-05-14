import { Injectable } from '@angular/core';
import { CartItem } from '../entities/CartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }
  cartItems: CartItem[] = [];

  /**
   * Adds product to cart
   * @param cartItem 
   */
  addToCart(cartItem: CartItem) {
    this.cartItems.push(cartItem);
  }

  /**
   * Gets cart items
   * @returns cart items 
   */
  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  /**
   * Removes product from cart
   * @param cartItem 
   */
  removeFromCart(cartItem: CartItem) {
    const index = this.cartItems.indexOf(cartItem);
    this.cartItems.splice(index, 1);
  }

  /**
   * Emptys cart
   */
  emptyCart() {
    this.cartItems = [];
  }
}
