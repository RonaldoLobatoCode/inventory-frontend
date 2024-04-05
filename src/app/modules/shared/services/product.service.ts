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

  /**
   * Save the product
   */
  saveProduct(body: any) {
    const endpoint = `${base_url}/products`;
    return this.http.post(endpoint, body);
  }

  /**
   * Update the
   * @param body 
   * @param id 
   * @returns 
   */
  updateProduct(body: any, id: number) {
    const endpoint = `${base_url}/products/${id}`;
    return this.http.put(endpoint, body);
  }

  /**
   * delete product by id
   * @param id 
   * @returns 
   */
  deleteProduct(id: any) {
    const endpoint = `${base_url}/products/${id}`;
    return this.http.delete(endpoint);
  }

  /**
   * filter by name
   * @param name 
   * @returns 
   */
  getProductByName(name: any) {
    const endpoint = `${base_url}/products/filter/${name}`;
    return this.http.get(endpoint);
  }
}
