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
import { AuthService } from 'src/app/services/auth.service';
import { LoginPageComponent } from '../login-page/login-page.component';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {

  /**
   * It keeps items of cart
   */
  cartItems: CartItem[] = [];
  /**
   * Total values of my cart component
   */
  totalValues: any = { totalPrice: 0, totalTax: 0, totalPriceWithTax: 0 };
  /**
   * It keeps endPoint of rest api
   */
  endPoint: string = '';
  /**
   * It keeps currency symbol
   */
  currencySymbol: string;
  constructor(private location: Location, private cartService: CartService, private http: HttpClient,
    private modalService: NgbModal, private router: Router, private configService: ConfigService,
    private authService: AuthService) {
    this.endPoint = this.configService.endPoint;
    this.currencySymbol = this.configService.getCurrencySymbol();
  }

  /**
   * on init
   */
  ngOnInit() {
    // Load cart items
    this.cartItems = this.cartService.getCartItems();
    // It calculate total values
    this.calculateTotalValues();
  }

  /**
   * Calculates total values that are totalPrice, totalTax,totalPrice With tax
   */
  calculateTotalValues() {
    this.totalValues = { totalPrice: 0, totalTax: 0, totalPriceWithTax: 0 };
    for (const item of this.cartItems) {
      this.totalValues.totalTax = item.product.price * item.quantity * 0.18;
      this.totalValues.totalPrice += item.product.price * item.quantity;
    }
    this.totalValues.totalPriceWithTax = this.totalValues.totalPrice + this.totalValues.totalTax;
  }

  /**
   * It locate the previous page
   */
  goBack() {
    this.location.back();
  }


  /**
   * Creates order
   */
  createOrder() {
    const url = `${this.endPoint}/order`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const data: Order = new Order();
    // get logged in user
    const user: any = this.authService.getLoggedInUser();
    if (this.authService.isLoggedIn() && this.authService.getLoggedInUser() !== null) {
      // set userId to order
      data.userId = user.Id;
      for (const item of this.cartItems) {
        const detail: OrderDetail = new OrderDetail();
        detail.productId = item.product.id;
        detail.quantity = item.quantity;
        data.items.push(detail);
      }
      this.http.post(url, data, { headers }).subscribe(
        response => {
          this.showOrderInformation(response);
        },
        error => {
          console.error('An error occurred:', error);
        }
      );
    }
    else {
      this.showLoginMessage();
    }
  }


  /**
   * It shows be login message
   */
  private showLoginMessage() {
    const modalRef = this.modalService.open(MessageModalComponent);
    modalRef.componentInstance.title = 'Information';
    modalRef.componentInstance.message = `Please be login.`;
    modalRef.componentInstance.isOrder = false;
    modalRef.result.then((result) => {
      // Handle the modal result
      if (result === 'OK') {
        const modalRef = this.modalService.open(LoginPageComponent);
      }
    }).catch((error) => {
      // Handle any error that occurs
      console.log(error);
    });
  }

  /**
   * It shows order Information
   * @param response 
   */
  private showOrderInformation(response: Object) {
    const result: any = response;
    const modalRef = this.modalService.open(MessageModalComponent);
    modalRef.componentInstance.title = 'Information';
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
  }


  /**
   * It decrements quantity of product in my cart
   * @param item 
   */
  decrement(item: CartItem) {
    item.quantity--;
    if (item.quantity === 0) {
      this.askQuestionTouser(item);

    }
    this.calculateTotalValues();
  }

  /**
   * It asks question that is about remove product from cart
   * @param item 
   */
  private askQuestionTouser(item: CartItem) {
    const modalRef = this.modalService.open(MessageModalComponent);
    modalRef.componentInstance.title = 'Remove Product';
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

  /**
   * It increment quantity of product in my cart
   * @param item 
   */
  increment(item: CartItem) {
    item.quantity++;
    this.calculateTotalValues();
  }

}
