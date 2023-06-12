import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {FormsModule,ReactiveFormsModule} from  '@angular/forms'

import { CreateEmployeesComponent } from './employees/create-employees.component';
import { ListEmployeesComponent } from './employees/list-employees.component';
import { Routes, RouterModule } from '@angular/router';

const appRoutes:Routes=[
  {path:'list',component:ListEmployeesComponent},
  {path:'create',component:CreateEmployeesComponent},
  {path:'',redirectTo:'/list',pathMatch:"full"},
]

@NgModule({
  declarations: [
    AppComponent,CreateEmployeesComponent,
    ListEmployeesComponent
  ],
  imports: [
    BrowserModule,FormsModule,ReactiveFormsModule,RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
