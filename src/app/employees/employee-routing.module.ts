import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListEmployeesComponent } from './list-employees.component';
import { CreateEmployeesComponent } from './create-employees.component';


const routes: Routes = [
  //  {path:'employees',children:[
        {path:'list',component:ListEmployeesComponent},
        {path:'create',component:CreateEmployeesComponent},
        {path:'edit/:id',component:CreateEmployeesComponent},
    //]}
  
];
  
@NgModule({
  declarations: [
  ],
  imports: [RouterModule.forChild(routes)],
  exports: []
})
export class EmployeeRoutingModule { }