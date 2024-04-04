import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//Declaramos de manera global en endpoint
const base_url = "http://localhost:8080/api/v2";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  /**
   * Get all the products
   * @returns 
   */
  getProducts() {
    const endpoint = `${base_url}/products`
    return this.http.get(endpoint);
  }

}
