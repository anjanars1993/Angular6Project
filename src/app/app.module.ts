import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {HomeComponent} from './home.component';
import {PageNotFoundComponent} from './page-not-found.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { EmployeeService } from './employees/employee.service';
import {HttpClientModule} from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,HomeComponent,PageNotFoundComponent
  ],
  imports: [
    BrowserModule,AppRoutingModule,HttpClientModule 
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
