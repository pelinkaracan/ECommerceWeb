import { getCurrencySymbol, getLocaleCurrencyCode } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn :"any"
})
export class ConfigService {

  endPoint :string ='';
  constructor() { }

  ngOnInit(){
   
  }

  getCurrencySymbol()  {
    const userLocale = navigator.language;
    const currencyCode = getLocaleCurrencyCode(userLocale) ?? '';
    return getCurrencySymbol(currencyCode,'narrow', userLocale);
  }

}