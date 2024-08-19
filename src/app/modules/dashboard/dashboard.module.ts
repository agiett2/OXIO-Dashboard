import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { UsersListComponent } from './components/users-list/users-list.component';
import { AnalysisComponent } from './components/analysis/analysis.component';
import { UserDataService } from '../shared/services/user-data.service';
import { SharedModule } from "../shared/shared.module";
import { AddNewUserComponent } from './components/add-new-user/add-new-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [UsersListComponent, AnalysisComponent, AddNewUserComponent],
  imports: [CommonModule, DashboardRoutingModule, FormsModule, ReactiveFormsModule, SharedModule],
})
export class DashboardModule { }
