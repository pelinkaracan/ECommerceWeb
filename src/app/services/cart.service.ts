import { Injectable } from '@angular/core';
import { CartItem } from '../entities/CartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {

constructor() { }
  cartItems: CartItem[] = [];

  addToCart(cartItem: CartItem) {
    this.cartItems.push(cartItem);
  }

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  removeFromCart(cartItem:CartItem){
    const index = this.cartItems.indexOf(cartItem);
    this.cartItems.splice(index, 1);
  }
}
