import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface ProductElements {
  id: number;
  name: string,
  price: number,
  stock: number,
  category: any,
  picture: any
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  constructor(private serviceProduct: ProductService) { }

  ngOnInit(): void {
    this.getProductos();
  }
  //Paginator
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  //Seteamos las columnas a la tabla
  displayedColumns: string[] = ['id', 'name', 'price', 'stock', 'category', 'picture', 'actions'];

  dataSource = new MatTableDataSource<ProductElements>();

  getProductos() {
    this.serviceProduct.getProducts().subscribe((data: any) => {
      this.processProductResponse(data);
      console.log("Respuesta de productos", data);
    }, (error: any) => {
      console.log("Error en productos : ", error);
    })
  }

  //Process data
  processProductResponse(response: any) {
    const dateProduct: ProductElements[] = [];
    if(response.metadata[0].code == "00") {
      let listProduct = response.product.products;

      listProduct.forEach((element : ProductElements) => {
        element.category = element.category.name;
        element.picture = 'data:image/jpeg;base64,'+element.picture;
        dateProduct.push(element);
      });

      //Set the datasource
      this.dataSource = new MatTableDataSource<ProductElements>(dateProduct);
      this.paginator = this.paginator;
    }
  }
}
