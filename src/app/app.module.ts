import { APP_INITIALIZER, Inject, NgModule, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ComponentModule } from './components/component.module';
import { CartService } from './services/cart.service';
import { ConfigService } from './services/config.service';


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
  providers: [CartService,
    {
      provide: APP_INITIALIZER,
      useFactory :() => {
        const configService = inject(ConfigService)
        return () =>  new Promise((resolve) => {
          const configs = require('../../config.json');
          configService.endPoint = configs.endpoint;
          resolve(true);
        });
      },
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
