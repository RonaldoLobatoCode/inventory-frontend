import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../shared/services/category.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { ProductService } from '../../../shared/services/product.service';
import { consumerPollProducersForChange } from '@angular/core/primitives/signals';

export interface CategoryElement {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-dialog-product',
  templateUrl: './dialog-product.component.html',
  styleUrl: './dialog-product.component.css'
})
export class DialogProductComponent implements OnInit {

  private fb = inject(FormBuilder);
  private categoryService = inject(CategoryService);
  private dialogRef = inject(MatDialogRef);
  private productService = inject(ProductService);
  public data = inject(MAT_DIALOG_DATA);

  public productFrom!: FormGroup;

  categories: CategoryElement[] = [];

  public statusTitle: string = "Agregar";

  selectedFile: any;
  nameImg: string = "";

  ngOnInit(): void {
    this.productFrom = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
      category: ['', Validators.required],
      picture: ['', Validators.required],
    });

    if (this.data != null) {
      this.statusTitle = "Actualizar";
    }

    this.getCategories();
  }

  onSave() {
    let data = {
      name: this.productFrom.get('name')?.value,
      price: this.productFrom.get('price')?.value,
      stock: this.productFrom.get('stock')?.value,
      category: this.productFrom.get('category')?.value,
      picture: this.selectedFile
    }

    const uploadImageData = new FormData();
    uploadImageData.append('picture', data.picture, data.picture.name);
    uploadImageData.append('name', data.name);
    uploadImageData.append('price', data.price);
    uploadImageData.append('stock', data.stock);
    uploadImageData.append('category', data.category);

    //Call the service to save a product
    this.productService.saveProduct(uploadImageData).subscribe((data: any) => {
      this.dialogRef.close(1);
    }, (error) => {
      this.dialogRef.close(2);
      console.log("Error al registrar", data)
    })
  }


  /**
   * List categories in the select 
   */
  getCategories() {
    this.categoryService.getCategories().subscribe((data: any) => {
      this.categories = data.categoryResponse.category;
    }, (error: any) => {
      console.log("Error al listar categorias", error)
    })
  }

  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);

    this.nameImg = event.target.files[0].name;
  }

  onCancel() {
    this.dialogRef.close();
  }
}
