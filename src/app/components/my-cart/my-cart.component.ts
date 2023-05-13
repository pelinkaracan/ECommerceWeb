import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CartService } from 'src/app/services/cart.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order, OrderDetail } from 'src/app/entities/Order';
import { CartItem } from 'src/app/entities/CartItem';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageModalComponent } from '../message-modal/message-modal.component';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalValues: any = { totalPrice: 0, totalTax: 0, totalPriceWithTax: 0 };
  endPoint: string ='';
  currencySymbol: string;
  constructor(private location: Location, private cartService: CartService, private http: HttpClient,
    private modalService: NgbModal, private router: Router, private configService: ConfigService) { 
      this.endPoint =  this.configService.endPoint;
      this.currencySymbol =  this.configService.getCurrencySymbol();
    }

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotalValues();
  }

  calculateTotalValues() {
    this.totalValues = { totalPrice: 0, totalTax: 0, totalPriceWithTax:0 };
    for (const item of this.cartItems) {
      this.totalValues.totalTax = item.product.price * item.quantity * 0.18;
      this.totalValues.totalPrice += item.product.price * item.quantity;
    }
    this.totalValues.totalPriceWithTax = this.totalValues.totalPrice + this.totalValues.totalTax;
  }


  goBack() {
    this.location.back();
  }

  createOrder() {
    const url = `${this.endPoint}/order`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const data: Order = new Order();
    data.userId = '645a23178d0a14499d404d91';
    for (const item of this.cartItems) {
      const detail: OrderDetail = new OrderDetail();
      detail.productId = item.product.id;
      detail.quantity = item.quantity;
      data.items.push(detail);
    }
    this.http.post(url, data, { headers }).subscribe(
      response => {
        const result :any  = response;
        const modalRef = this.modalService.open(MessageModalComponent);
        modalRef.componentInstance.title = 'My Message';
        modalRef.componentInstance.message = `Your Order :${result.id.substring(0, 10)} is created successfully.`;
        modalRef.componentInstance.isOrder = true;
        modalRef.result.then((result) => {
          // Handle the modal result
          if (result === 'OK') {
            this.router.navigate(['']);
            this.cartService.emptyCart();
          }
        }).catch((error) => {
          // Handle any error that occurs
          console.log(error);
        });
      },
      error => {
        console.error('An error occurred:', error);
      }
    );
  }

  decrement(item: CartItem) {
    item.quantity--;
    if(item.quantity === 0)
    {
      const modalRef = this.modalService.open(MessageModalComponent);
      modalRef.componentInstance.title = 'My Message';
      modalRef.componentInstance.message = `Do you want this product:${item.product.name} from your cart`;
      modalRef.componentInstance.isOrder = false;
      modalRef.result.then((result) => {
        // Handle the modal result
        if (result === 'OK') {
          this.cartService.removeFromCart(item);
        }
        else if (result === 'CANCEL') {
          item.quantity++;
        }
      }).catch((error) => {
        // Handle any error that occurs
        console.log(error);
      });
      
    }
    this.calculateTotalValues();
  }

  increment(item: CartItem) {
    item.quantity++;
    this.calculateTotalValues();
  }

}
