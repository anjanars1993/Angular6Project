import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules, NoPreloading } from '@angular/router';
import {HomeComponent} from './home.component';
import {PageNotFoundComponent} from './page-not-found.component';



const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'',redirectTo:'/home',pathMatch:"full"},
  {path:'employees',loadChildren:()=>
    import('./employees/employee.module').then(mod => mod.EmployeeModule)},
  {path:'**',component:PageNotFoundComponent},
];
  
@NgModule({
  declarations: [

  ],
  imports: [RouterModule.forRoot(routes,{preloadingStrategy:NoPreloading})],
  exports: [RouterModule]
})
export class AppRoutingModule { }