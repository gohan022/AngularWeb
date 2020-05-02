import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/data/product.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  page = 1;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  queryParams = {
    page: this.page
  };
  isFetching = false;

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    /*
    this.route.queryParams.subscribe(
      (params: Params) => {
        if (params.page) {
          this.page = +params.page;
          this.queryParams = {
            ...params,
            page: +params.page - 1
          };
        } else {
          this.page = 1;
          this.queryParams = {
            ...params,
            page: 0
          };
        }
        this.listProducts();
      }
    );*/
  }

  loadPage(page: number) {
    this.router.navigate(['products'], {queryParams: {page}, queryParamsHandling: 'merge'});
  }

  updatePageSize(size: number) {
    this.router.navigate(['products'], {queryParams: {size}});
  }

  listProducts() {
    this.isFetching = true;

    this.productService.getProductList(this.queryParams).subscribe(
      data => {
        this.products = data.content;
        this.page = data.number;
        this.pageSize = data.size;
        this.totalPages = data.totalPages;
        this.totalElements = data.totalElements;
        this.isFetching = false;
      },
      error => {
        this.isFetching = false;
      }
    );
  }

}
