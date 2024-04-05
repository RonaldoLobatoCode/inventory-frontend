import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogProductComponent } from '../dialog-product/dialog-product.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmComponent } from '../../../shared/components/confirm/confirm.component';

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


  public dialog = inject(MatDialog);

  constructor(private serviceProduct: ProductService, private _snackBar: MatSnackBar) { }

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
    if (response.metadata[0].code == "00") {
      let listProduct = response.product.products;

      listProduct.forEach((element: ProductElements) => {
        //element.category = element.category.name;
        element.picture = 'data:image/jpeg;base64,' + element.picture;
        dateProduct.push(element);
      });

      //Set the datasource
      this.dataSource = new MatTableDataSource<ProductElements>(dateProduct);
      this.dataSource.paginator = this.paginator;
    }
  }

  openDialogProduct(): void {
    const dialogRef = this.dialog.open(DialogProductComponent, {
      width: '750px'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar("Producto Guardado", "Exitoso");
        this.getProductos();
      } else if (result == 2) {
        this.openSnackBar("Error inesperado, no se pudo guardar el producto", "Error");
      }
    });
  }


  edit(id: number, name: string, price: number, stock: number, category: any) {
    const dialogRef = this.dialog.open(DialogProductComponent, {
      width: '750px',
      data: { id: id, name: name, price: price, stock: stock, category: category },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar("Producto actualizado", "Exitoso");
        this.getProductos();
      } else if (result == 2) {
        this.openSnackBar("Error inesperado, no se pudo actualizar el producto", "Error");
      }
    });
  }

  delete(id: any) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: { id: id, module: "product" },
      width: '450px'
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.serviceProduct.deleteProduct(id).subscribe(
          (data: any) => {
            this.openSnackBar("Producto eliminado", "Éxito");
            this.getProductos(); // Actualizar la lista de productos después de la eliminación exitosa
          },
          (error: any) => {
            this.openSnackBar("Error inesperado, no se pudo eliminar el producto", "Error");
          }
        );
      }
    });
  }
  

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }
}
