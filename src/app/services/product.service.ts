import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { productModel } from '../Model/productModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  addProduct(data: productModel){
    // console.log("Add Product Service called");
    return this.http.post('http://localhost:3000/products', data);
  }

  productList(){
    return this.http.get<productModel[]>('http://localhost:3000/products');
  }
}
