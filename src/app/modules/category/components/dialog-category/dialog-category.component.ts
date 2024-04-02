import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../shared/services/category.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-category',
  templateUrl: './dialog-category.component.html',
  styleUrl: './dialog-category.component.css'
})
export class DialogCategoryComponent implements OnInit {

  /*
  * Creamos un objeto para el manejo de formulario
  */
  categoryForm!: FormGroup;

  /*
  * Modifica los estados para las acciones
  * para actualizar o registrar
  */
  statusTitle: string = "Agregar";
  statusButton: string = "Guardar";

  public data = inject(MAT_DIALOG_DATA);

  constructor(private fb: FormBuilder, private http: CategoryService, private dialogRef: MatDialogRef<DialogCategoryComponent>) { }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });

    if (this.data != null) {
      this.updateForm(this.data);
      this.statusTitle = "Actualizar";
      this.statusButton = "Actualizar";
    }
  }

  onSave() {
    let data = {
      name: this.categoryForm.get('name')?.value,
      description: this.categoryForm.get('description')?.value
    }

    if (this.data != null) {
      //Update register
      this.http.updateCategory(data, this.data.id).subscribe(data => {
        this.dialogRef.close(1);
      }, (error: any) => {
        this.dialogRef.close(2);
      })
    } else {
      //Create new register
      this.http.saveCategory(data).subscribe(data => {
        console.log(data);
        this.dialogRef.close(1);
      }, (error: any) => {
        this.dialogRef.close(2);
      })
    }
  }

  //Pasamos la data a los campos de texto
  updateForm(data: any) {
    this.categoryForm = this.fb.group({
      name: [data.name, Validators.required],
      description: [data.description, Validators.required]
    });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
