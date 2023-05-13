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

  product:Product=new Product();
  currencySymbol :string =''
  cartButtonText = "";

  constructor(private route: ActivatedRoute, private location: Location, private cartService: CartService,
    private router: Router, private configService: ConfigService) {
      this.currencySymbol =  this.configService.getCurrencySymbol();
     }

  ngOnInit() {
    const queryParams=this.route.snapshot.paramMap.get('product') ?? '';
    this.product = JSON.parse(queryParams);
    this.cartButtonText =`${this.currencySymbol} ${this.product.price} Add To Cart `
   
  }

  goBack() {
    this.location.back();
  }

  addToCart(){
    debugger;
    const cartItems = this.cartService.getCartItems();
    const items = cartItems.filter(e => e.product.id === this.product.id);
    if(items.length > 0)
    {
      items[0].quantity ++;
    }
    else{
        this.createCartItem();
    }
    this.router.navigate(['/cart']);
  }

  private createCartItem(){
    const cartItem:CartItem =new CartItem();
    cartItem.product = this.product;
    cartItem.quantity = 1;
    this.cartService.addToCart(cartItem);
  }

}
