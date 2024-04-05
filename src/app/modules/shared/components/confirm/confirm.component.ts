import { Component, OnInit, inject } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.css'
})
export class ConfirmComponent implements OnInit {


  private dialogRef = inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA);
  public http = inject(CategoryService);
  public httpProduct = inject(ProductService);

  constructor() { }

  ngOnInit(): void {
  }


  delete() {
    if (this.data != null) {
      if (this.data.module === "category") {
        this.http.deleteCategory(this.data.id).subscribe(
          (data: any) => {
            this.dialogRef.close(1); // Cerrar el diálogo con éxito después de eliminar la categoría
          },
          (error: any) => {
            this.dialogRef.close(2); // Cerrar el diálogo con error si falla la eliminación
          }
        );
      } else if (this.data.module === "product") {
        this.httpProduct.deleteProduct(this.data.id).subscribe(
          (data: any) => {
            this.dialogRef.close(1); // Cerrar el diálogo con éxito después de eliminar el producto
          },
          (error: any) => {
            this.dialogRef.close(2); // Cerrar el diálogo con error si falla la eliminación
          }
        );
      } else {
        this.dialogRef.close(2); // Cerrar el diálogo con error si el módulo no es reconocido
      }
    }
  }
  

  cancel() {
    this.dialogRef.close();
  }
}
