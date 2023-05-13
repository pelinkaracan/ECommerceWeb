import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ComponentModule } from './components/component.module';
import { CartService } from './services/cart.service';
import { HomePageComponent } from './components/home-page/home-page.component';


@NgModule({
  declarations: [			
    AppComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    PaginationModule.forRoot(),
    ComponentModule
  ],
  providers: [CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
