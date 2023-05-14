import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location, getCurrencySymbol, getLocaleCurrencyCode } from '@angular/common';
import { Product } from 'src/app/entities/Product';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/entities/CartItem';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  /**
   * It keeps detail of Product
   */
  product: Product = new Product();

  /**
   * It keeps currency symbol
   */
  currencySymbol: string = '';

  /**
   * It keeps a text of add to cart button
   */
  cartButtonText = "";


  /**
   * Creates an instance of product detail component.
   * @param route 
   * @param location 
   * @param cartService 
   * @param router 
   * @param configService 
   */
  constructor(private route: ActivatedRoute, private location: Location, private cartService: CartService,
    private router: Router, private configService: ConfigService) {
    this.currencySymbol = this.configService.getCurrencySymbol();
  }


  /**
   * on init
   */
  ngOnInit() {
    // It gets product from parameters of route
    const queryParams = this.route.snapshot.paramMap.get('product') ?? '';
    this.product = JSON.parse(queryParams);
    this.cartButtonText = `${this.currencySymbol} ${this.product.price} Add To Cart `;
  }


  /**
   * Go previous page
   */
  goBack() {
    this.location.back();
  }

  /**
   * Adds product to cart
   */
  addToCart() {
    const cartItems = this.cartService.getCartItems();
    const items = cartItems.filter(e => e.product.id === this.product.id);
    if (items.length > 0) {
      items[0].quantity++;
    }
    else {
      this.createCartItem();
    }
    this.router.navigate(['/cart']);
  }

  /**
   * Creates cart item
   */
  private createCartItem() {
    const cartItem: CartItem = new CartItem();
    cartItem.product = this.product;
    cartItem.quantity = 1;
    this.cartService.addToCart(cartItem);
  }

}
