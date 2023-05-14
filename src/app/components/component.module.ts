import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { FormsModule } from '@angular/forms';
import { MyCartComponent } from './my-cart/my-cart.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CartService } from '../services/cart.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from '../app-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { ConfigService } from '../services/config.service';
import { JwtInterceptor } from '../interceptors/jwt.interceptor';
import { LoginPageComponent } from './login-page/login-page.component';


@NgModule({
  declarations: [	
    ProductListComponent,
    ProductDetailComponent,
    MyCartComponent,
    HomePageComponent,
    LoginPageComponent
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
  providers: [CartService,ConfigService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }]
})
export class ComponentModule { }
