import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncreaserComponent } from './increaser/increaser.component';
import { FormsModule } from '@angular/forms';
import { DoughnutComponent } from './doughnut/doughnut.component';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { ModalImageComponent } from './modal-image/modal-image.component';




@NgModule({
  declarations: [
    IncreaserComponent,
    DoughnutComponent,
    ModalImageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    BaseChartDirective,

  ],
  exports: [
    IncreaserComponent,
    DoughnutComponent,
    ModalImageComponent
  ],
  providers: [provideCharts(withDefaultRegisterables())],
})
export class ComponentsModule { }
