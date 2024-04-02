import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//Declaramos de manera global en endpoint
const base_url = "http://localhost:8080/api/v1";


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  //Establecer conexion con los distintos metodos http
  constructor(private http: HttpClient) { }

  //Metodo para obtener todas las categorias
  getCategories(){
    const endpoint = `${base_url}/categories`;
    return this.http.get(endpoint);
  }

  //Metodo para guardar categoria
  saveCategory(body: any){
    const endpoint = `${base_url}/categories`;
    return this.http.post(endpoint, body);
  }
}
