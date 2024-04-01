import { Component, OnInit, inject } from '@angular/core';
import { CategoryService } from '../../../shared/services/category.service';
import { MatTableDataSource } from '@angular/material/table';

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
      listCategory.forEach((element: CategoryElement)=> {
        dataCategory.push(element);
      });

      this.dataSource = new MatTableDataSource<CategoryElement>(dataCategory);

    }
  }
}
