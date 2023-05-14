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
  /**
   * It get searchKeyword viewChild and uses in class
   */
  @ViewChild('searchKeyword', { static: false }) searchKeyword?: ElementRef;

  /**
   * It keeps a number that is decided how many data gets in a page 
   */
  selectedOption: number = 10;

  /**
   * It keeps current page of pagination 
   */
  currentPage: number = 1;

  /**
   * It keeps a number of pages
   */
  totalPages: number = 0;

  /**
   * Page size of product list component
   */
  pageSize: number = 10;

  /**
   * It keeps product datas
   */
  products: Product[] = [];

  /**
   * Filter  of product list 
   */
  filter: string = "";

  /**
   * It keeps a number How many products are shown in a row
   */
  productsPerRow = 2;

  /**
   * It keeps end point
   */
  endPoint: string = '';

  /**
   * It keeps currency symbol
   */
  currencySymbol: string;

  /**
   * Creates an instance of product list component.
   * @param router 
   * @param http 
   * @param configService 
   */
  constructor(private router: Router, private http: HttpClient, private configService: ConfigService) {
    this.endPoint = this.configService.endPoint;
    this.currencySymbol = this.configService.getCurrencySymbol();
  }

  /**
   * on init
   */
  ngOnInit() {
    // get product list by page size and page number
    this.getData();
  }

  /**
   * Determines whether option selected on
   */
  onOptionSelected() {
    this.pageSize = this.selectedOption;
    this.getData();
  }

  /**
   * Get product list by page size and page number
   */
  getData() {
    // It keeps url to get products
    let url = `${this.endPoint}/products?page=${this.currentPage}&pageSize=${this.pageSize}`;
    if (this.filter !== '') {
      // It keeps url to get products by filter
      url = `${this.endPoint}/products?page=${this.currentPage}&pageSize=${this.pageSize}&filter=${this.filter}`;
    }
    this.http.get<any>(url).subscribe(response => {
      this.products = response.items;
      this.products.forEach((product) => {
        // select products after get these products images
        let imageUrl = `${this.endPoint}/products/${product.id}/image`;
        this.http.get(imageUrl, { responseType: 'arraybuffer' })
          .subscribe(data => {
            const imageBlob = new Blob([data], { type: 'image/jpeg' });
            product.image = URL.createObjectURL(imageBlob);
          });
      });
      this.totalPages = response.totalPages;
    });
  }

  /**
   * go to page that is clicked 
   * @param page 
   */
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getData();
    }
  }

  /**
   * Sets product count of per row value
   * @param productsPerRowValue 
   */
  setProductPerRowValue(productsPerRowValue: number): void {
    this.productsPerRow = productsPerRowValue;
  }

  /**
   * Redirects to product detail page
   * @param product 
   */
  redirectToProduct(product: Product): void {
    const queryParams = { product: JSON.stringify(product) }
    this.router.navigate(['/productDetail', queryParams]);
  }

  /**
   * Searchs product by name
   */
  searchProduct() {
    this.currentPage = 1;
    if (this.searchKeyword?.nativeElement.value !== '') {
      this.filter = `name contains ${this.searchKeyword?.nativeElement.value}`;
    }
    else {
      this.filter = '';
    }
    this.getData();
  }
}
