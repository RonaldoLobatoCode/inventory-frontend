import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../shared/services/category.service';
import { MatDialogRef } from '@angular/material/dialog';

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

  constructor(private fb: FormBuilder, private http: CategoryService, private dialogRef: MatDialogRef<DialogCategoryComponent>) { }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSave() {
    let data = {
      name: this.categoryForm.get('name')?.value,
      description: this.categoryForm.get('description')?.value
    }
    this.http.saveCategory(data).subscribe(data => {
      console.log(data);
      this.dialogRef.close(1);
    }, (error: any) => {
      this.dialogRef.close(2);
    })
  }

  onCancel() {
    this.dialogRef.close();
  }
}
