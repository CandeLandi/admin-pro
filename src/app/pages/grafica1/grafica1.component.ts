import { Component } from '@angular/core';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styleUrl: './grafica1.component.css',
})
export class Grafica1Component {
  public labels1: string[] = ['Pan', 'Refresco', 'Tacos'];
  public labels2: string[] = ['Chocolate', 'Agua', 'Bananas'];
  public labels3: string[] = ['Gimnasio', 'Expensas', 'Guarderia'];

  public data1: ChartData<'doughnut'> = {
    labels: this.labels1,
    datasets: [
      { 
        data: [10, 15, 40], 
        backgroundColor: ['#6857E6', '#009FEE', '#F02059'],
      }
    ]
  };

  public data2: ChartData<'doughnut'> = {
    labels: this.labels2,
    datasets: [
      { 
        data: [20, 25, 40], 
        backgroundColor: ['#6857E6', '#009FEE', '#F02059'],
      }
    ]
  };

  public data3: ChartData<'doughnut'> = {
    labels: this.labels3,
    datasets: [
      { 
        data: [40, 10, 40], 
        backgroundColor: ['#6857E6', '#009FEE', '#F02059'],
      }
    ]
  };
}
