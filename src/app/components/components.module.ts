import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncreaserComponent } from './increaser/increaser.component';
import { FormsModule } from '@angular/forms';
import { DoughnutComponent } from './doughnut/doughnut.component';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';




@NgModule({
  declarations: [
    IncreaserComponent,
    DoughnutComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    BaseChartDirective,
  
  ],
  exports: [
    IncreaserComponent,
    DoughnutComponent
  ],
  providers: [provideCharts(withDefaultRegisterables())],
})
export class ComponentsModule { }
