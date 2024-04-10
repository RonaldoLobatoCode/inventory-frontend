import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CategoryService } from '../../../shared/services/category.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogCategoryComponent } from '../dialog-category/dialog-category.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmComponent } from '../../../shared/components/confirm/confirm.component';
import { MatPaginator } from '@angular/material/paginator';
import { UtilService } from '../../../shared/services/util.service';

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

  isAdmin: any;

  //Paginator
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private snackBar: MatSnackBar, private util: UtilService) { }

  ngOnInit(): void {
    this.getCategories();
    this.isAdmin = this.util.isAdmin();
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
      this.dataSource.paginator = this.paginator;
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
  * Metodo para enviar la informacion al dialog category 
  */
  edit(id: number, name: string, description: string) {
    const dialogRef = this.dialog.open(DialogCategoryComponent, {
      data: { id: id, name: name, description: description },
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar("Categoría actualizada", "Exito");
        this.getCategories();
      }
      else if (result == 2) {
        this.openSnackBar("Error inesperado, no se pudo actualizar la categoría", "Error");
      }
    });
  }

  delete(id: any) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: { id: id, module: "category" },
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.categoryService.deleteCategory(id).subscribe(
          (data: any) => {
            this.openSnackBar("Categoría eliminada", "Éxito");
            this.getCategories(); // Actualizar la lista de categorías después de la eliminación exitosa
          },
          (error: any) => {
            this.openSnackBar("Error inesperado, no se pudo eliminar la categoría", "Error");
          }
        );
      }
    });
  }

  /* 
  * Metodo para buscar por id
  */
  buscar(termino: string) {
    if (termino.length === 0) {
      return this.getCategories();
    }

    this.categoryService.getCategoryById(termino).subscribe((response: any) => {
      this.processCategoriesResponse(response);
    })
  }

  /**
   * Metodo para exportar archivo excel
   */
  exportExcel() {
    this.categoryService.exportCategories().subscribe((data: any) => {
      let file = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      let fileUrl = URL.createObjectURL(file);
      var anchor = document.createElement("a");
      anchor.download = "categories.xlsx";
      anchor.href = fileUrl;
      anchor.click();

      this.openSnackBar("Archivo exportado exitosamente", "Exito");
    }, (error: any) => {
      this.openSnackBar("No se pudo exportar el archivo", "Error");
    })
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