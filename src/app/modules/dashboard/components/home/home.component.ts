import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { ProductElements } from '../../../product/components/product/product.component';
//Importar con el /auto
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  //Bar
  chartBar: any;

  //Doughnut
  doughnut: any;

  constructor(private serviceProduct: ProductService) { }

  ngOnInit(): void {
    this.getProductos();
  }

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

    //Almacenar todos los nombres de los productos
    const nameProduct: String[] = [];
    const stock: number[] = [];

    if (response.metadata[0].code == "00") {
      const listProduct = response.product.products;

      listProduct.forEach((element: ProductElements) => {
        nameProduct.push(element.name);
        stock.push(element.stock);
      });

      //Creamos el grafico de barras
      try {
        this.chartBar = new Chart('canvas-bar', {
          type: 'bar',
          data: {
            labels: nameProduct,
            datasets: [
              {
                label: 'Grafico de Productos',
                data: stock,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.5)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 205, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(64, 83, 96, 0.8)',
                  'rgba(140, 164, 180, 0.8)',
                  'rgba(123, 231, 20, 0.39)',
                  'rgba(147, 126, 95, 1)',
                  'rgba(83, 147, 128, 1)',
                  'rgba(147, 126, 95, 1)',
                  'rgba(62, 165, 46, 1)',
                  'rgba(244, 235, 201, 1)',
                  'rgba(239, 211, 113, 1)',
                  'rgba(151, 169, 136, 1)',
                  'rgba(29, 63, 23, 1)'
                ]
              }
            ],
          },

        });
      } catch (error) {
        console.error('Error al crear gráfico de barras:', error);
      }

      //Creamos el grafico circular
      try {
        this.doughnut = new Chart('canvas-doughnut', {
          type: 'doughnut',
          data: {
            labels: nameProduct,
            datasets: [
              {
                label: 'Productos',
                data: stock,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.5)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 205, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(64, 83, 96, 0.8)',
                  'rgba(140, 164, 180, 0.8)',
                  'rgba(123, 231, 20, 0.39)',
                  'rgba(147, 126, 95, 1)',
                  'rgba(83, 147, 128, 1)',
                  'rgba(147, 126, 95, 1)',
                  'rgba(62, 165, 46, 1)',
                  'rgba(244, 235, 201, 1)',
                  'rgba(239, 211, 113, 1)',
                  'rgba(151, 169, 136, 1)',
                  'rgba(29, 63, 23, 1)'
                ]
              }
            ],
          },

        });
      } catch (error) {
        console.error('Error al crear gráfico de barras:', error);
      }
    }
  }
}
