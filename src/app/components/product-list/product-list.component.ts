import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/entities/Product';
import { DomSanitizer } from '@angular/platform-browser';

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

  constructor(private router: Router, private http: HttpClient, private _sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.getData();
  }

  onOptionSelected() {
    this.pageSize = this.selectedOption;
    this.getData();
  }

  getData() {
    let url = `https://localhost:7060/api/products?page=${this.currentPage}&pageSize=${this.pageSize}`;
    if(this.filter !==''){
       url = `https://localhost:7060/api/products?page=${this.currentPage}&pageSize=${this.pageSize}&filter=${this.filter}`;
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
    if(this.searchKeyword?.nativeElement.value !== ''){
      this.filter = `name contains ${this.searchKeyword?.nativeElement.value}`;
    }
    else{
      this.filter = '';
    }
    this.getData();
  }
}
