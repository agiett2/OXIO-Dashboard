import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTableComponent } from './components/user-table/user-table.component';
import { ChartComponent } from './components/chart/chart.component';
import { ChartModule } from 'primeng/chart';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [UserTableComponent, ChartComponent, ModalComponent],
  imports: [CommonModule, ChartModule, ],
  exports: [UserTableComponent, ChartComponent, ModalComponent],

})
export class SharedModule {}
