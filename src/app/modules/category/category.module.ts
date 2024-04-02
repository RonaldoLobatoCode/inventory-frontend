import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './components/category/category.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogCategoryComponent } from './components/dialog-category/dialog-category.component';



@NgModule({
  declarations: [
    CategoryComponent,
    DialogCategoryComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    //Manejo para los formularios reactivos
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CategoryModule { }
