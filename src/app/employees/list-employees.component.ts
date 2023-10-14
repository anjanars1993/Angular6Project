import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { IEmployee } from './IEmployee-model';
import { EnvelopeDetails } from './EnvelopeDetails-model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit{
  envelopeDetails:EnvelopeDetails;
constructor(private _employeeService:EmployeeService,private _router:Router)
{
  
}
LoadData(){
  this._employeeService.getEmployees().subscribe({
        
    next: (emp) => { 
      this.employees=emp;
    },
    error: (e) => console.log(e),
    complete: () => console.info('complete') 
    })
}
employees: IEmployee[];
  ngOnInit(): void {
    this.LoadData();
  }
  EditEmployee(id:number)
  {
  this._router.navigate(['employees/edit',id]);
  }
  DeleteEmployee(id:number)
  {
    debugger;
    this._employeeService.deleteEmployee(id).subscribe({
      next: () => { 
        console.log("Employee with id "+id+" is deleted")
        this.LoadData();
      },
      error: (e) => console.log(e),
      complete: () => console.info('complete') 
      }
    );
  }
  Docusign(id:number)
  {
    this.envelopeDetails={
      employeesDetailedDataId:id,
      SignerEmail:'anjanars21.06@gmail.com',
      SignerName:'Anjana R S New'
    }
    this._employeeService.BeginDocusign(this.envelopeDetails).subscribe({
        
      next: (emp) => { 
        
      },
      error: (e) => console.log(e),
      complete: () => console.info('complete') 
      })
  }
}
