import { NgModule } from '@angular/core';
import { CreateEmployeesComponent } from './create-employees.component';
import { ListEmployeesComponent } from './list-employees.component';
import { SharedModule } from '../shared/shared.module'
import {EmployeeRoutingModule} from './employee-routing.module'

@NgModule({
  declarations: [CreateEmployeesComponent,ListEmployeesComponent],
  imports: [
    SharedModule,EmployeeRoutingModule
  ]
})
export class EmployeeModule { }
