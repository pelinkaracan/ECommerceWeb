import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule } from '@angular/forms';
import { MyCartComponent } from './my-cart/my-cart.component';
import { HttpClientModule } from '@angular/common/http';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CartService } from '../services/cart.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from '../app-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { ConfigService } from '../services/config.service';


@NgModule({
  declarations: [	
    ProductListComponent,
    ProductDetailComponent,
    LoginPageComponent,
    MyCartComponent,
    HomePageComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    PaginationModule.forRoot(),
    NgbModule
  ],
  exports:[
    HomePageComponent
  ],
  providers: [CartService,ConfigService]
})
export class ComponentModule { }
