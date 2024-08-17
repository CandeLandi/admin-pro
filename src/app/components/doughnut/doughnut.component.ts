import { Component, Input } from '@angular/core';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styleUrl: './doughnut.component.css'
})
export class DoughnutComponent {

  @Input() title: string = 'Sin titulo';
 

  // Doughnut
  @Input('labels') 
  doughnutChartLabels: string[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail-Order Sales',
  ];

  @Input('data')  doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [{ 
      data: [350, 450, 100],
      backgroundColor:  ['#6857E6', '#009FEE', '#F02059'] 
    }],
  };

}
