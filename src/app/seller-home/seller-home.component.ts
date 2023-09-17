import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { productModel } from '../Model/productModel';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'],
})
export class SellerHomeComponent implements OnInit {
  productList: undefined | productModel[];
  constructor(private product: ProductService) {}
  ngOnInit(): void {
    this.product.productList().subscribe((response) => {
      console.warn(response);
      this.productList = response;
    });
  }
}
