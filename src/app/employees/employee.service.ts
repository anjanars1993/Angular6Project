import { Injectable } from "@angular/core";
import { IEmployee } from "./IEmployee-model";
import {Observable} from 'rxjs/internal/Observable';
import { of } from "rxjs";
import { catchError, delay, max } from "rxjs/operators";
import {HttpClient, HttpErrorResponse} from "@angular/common/http"
import { throwError } from 'rxjs';


@Injectable()
export class EmployeeService{
  constructor(private _http:HttpClient){
  }
      public getEmployees():Observable<IEmployee[]>{
        //return of(this.employees).pipe(delay(1000));
        return this._http.get<IEmployee[]>("http://localhost:3000/employees")
        .pipe(catchError(this.HandlError));
      } 
      private HandlError(err:HttpErrorResponse)
      {
        if(err.error instanceof ErrorEvent)
        {
          console.log("clent side error: " + err.error.message)
        }
        else
        {
          console.log("server side error: " + err.error.message)
        }
        return throwError(() => new Error('There is a problem in the service. We are noticed and working on resolving it asap.'))
        

      }
      public getEmployeeById(id:number):Observable<IEmployee>{
        return this._http.get<IEmployee>("http://localhost:3000/employees/"+id)
        .pipe(catchError(this.HandlError));
        // this.employee=this.employees.find(x=>x.id==id)!;
        // return this.employee;
      } 


      public saveEmployees(employee:IEmployee):Observable<IEmployee>|undefined{
        // if(employee.id===null)
        // {
          // employee.id=+this.getMaximumId()!+1
          // this.employees.push(employee);
          
          return this._http.post<IEmployee>("http://localhost:3000/employees",employee)
          .pipe(catchError(this.HandlError))
        //}
        // else
        // {  
        //    const index=this.employees.findIndex(x=>x.id==employee.id);
        //    this.employees[index]=employee;
        // }
      } 
      public updateEmployees(employee:IEmployee):Observable<void>{
        // if(employee.id===null)
        // {
          // employee.id=+this.getMaximumId()!+1
          // this.employees.push(employee);
          
          return this._http.put<void>("http://localhost:3000/employees/"+employee.id,employee)
          .pipe(catchError(this.HandlError))
        //}
        // else
        // {  
        //    const index=this.employees.findIndex(x=>x.id==employee.id);
        //    this.employees[index]=employee;
        // }
      } 
      public deleteEmployee(id:number|null):Observable<void>
      {
        return this._http.delete<void>("http://localhost:3000/employees/"+id)
        .pipe(catchError(this.HandlError));
        // const index=this.employees.findIndex(x=>x.id==id);
        // if(index!==-1)
        // {
        //   this.employees.splice(index,1);
        // }
      }
}