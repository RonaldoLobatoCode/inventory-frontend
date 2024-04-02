import { Component, OnInit, inject } from '@angular/core';
import { CategoryService } from '../../../shared/services/category.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogCategoryComponent } from '../dialog-category/dialog-category.component';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface CategoryElement {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {

  //Injectamos el servicio al componente
  private categoryService = inject(CategoryService);

  public dialog = inject(MatDialog);

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getCategories();
  }

  //Seteamos las columnas a la tabla
  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];

  dataSource = new MatTableDataSource<CategoryElement>();

  getCategories(): void {
    this.categoryService.getCategories().subscribe((data: any) => {
      this.processCategoriesResponse(data);
      console.log("Respuesta de categorias", data);
    }, (error: any) => {
      console.log("Error : ", error);
    })
  }

  processCategoriesResponse(response: any) {

    const dataCategory: CategoryElement[] = [];

    if (response.metadata[0].code == "00") {

      let listCategory = response.categoryResponse.category;
      listCategory.forEach((element: CategoryElement) => {
        dataCategory.push(element);
      });

      this.dataSource = new MatTableDataSource<CategoryElement>(dataCategory);

    }
  }

  /*
  * Metodo para abrir un dialog
  * Establecemos como parametro al nuevo componente
  */
  openDialog() {
    const dialogRef = this.dialog.open(DialogCategoryComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar("Categoría guardada", "Exito");
        this.getCategories();
      }
      else if (result == 2) {
        this.openSnackBar("Error inesperado, no se pudo guardar la categoría", "Error");
      }
    });
  }

  /*
  *Mensaje de SnackBar
  */
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }
}