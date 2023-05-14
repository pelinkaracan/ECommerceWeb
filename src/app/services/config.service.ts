import { getCurrencySymbol, getLocaleCurrencyCode } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: "any"
})
export class ConfigService {


  /**
   * It sets from module to keep end point 
   */
  endPoint: string = '';
  constructor() { }

  ngOnInit() { }

  /**
   * Gets currency symbol
   * @returns  
   */
  getCurrencySymbol() {
    const userLocale = navigator.language;
    const currencyCode = getLocaleCurrencyCode(userLocale) ?? '';
    return getCurrencySymbol(currencyCode, 'narrow', userLocale);
  }

}