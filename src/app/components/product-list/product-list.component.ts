import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/entities/Product';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @ViewChild('searchKeyword', { static: false }) searchKeyword?: ElementRef;
  selectedOption: number = 10;
  currentPage: number = 1;
  totalPages: number = 0;
  pageSize: number = 10;
  products: Product[] = [];
  filter: string = "";

  productsPerRow = 2;
  endPoint :string = '';
  currencySymbol: string;

  constructor(private router: Router, private http: HttpClient, private configService: ConfigService) { 
    this.endPoint =  this.configService.endPoint;
    this.currencySymbol =  this.configService.getCurrencySymbol();
  }

  ngOnInit() {
    this.getData();
  }

  onOptionSelected() {
    this.pageSize = this.selectedOption;
    this.getData();
  }

  getData() {
    debugger;
    // let urlX = this.configService.getConfig();
    let url = `${this.endPoint}/products?page=${this.currentPage}&pageSize=${this.pageSize}`;
    if(this.filter !==''){
       url = `${this.endPoint}/products?page=${this.currentPage}&pageSize=${this.pageSize}&filter=${this.filter}`;
    }
  
    this.http.get<any>(url).subscribe(response => {
      this.products = response.items;
      this.totalPages = response.totalPages;
    });
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.getData();
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getData();
    }
  }

  setProductPerRowValue(productsPerRowValue:number) : void{
    this.productsPerRow = productsPerRowValue;
  }

  redirectToProduct(product: Product): void {
    const queryParams = { product: JSON.stringify(product) }
    this.router.navigate(['/productDetail',  queryParams]);
  }

  searchProduct(){
    debugger;
    this.currentPage = 1;
    if(this.searchKeyword?.nativeElement.value !== ''){
      this.filter = `name contains ${this.searchKeyword?.nativeElement.value}`;
    }
    else{
      this.filter = '';
    }
    this.getData();
  }
}
