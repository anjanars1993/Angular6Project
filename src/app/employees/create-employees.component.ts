import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup,ValidationErrors,ValidatorFn,Validators } from '@angular/forms';
import { CustomEmailDomainValidator } from '../shared/custom-email-domain.validator';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from './employee.service';
import { IEmployee } from './IEmployee-model';
import { ISkill } from './ISkill-model';

@Component({
  selector: 'app-create-employees',
  templateUrl: './create-employees.component.html',
  styleUrls: ['./create-employees.component.css']
})
export class CreateEmployeesComponent implements OnInit{
  employeeForm:FormGroup;
  panelTitle:string;
  //characterCount:number;
  constructor(private _fb:FormBuilder,private _activatedRoute:ActivatedRoute
    ,private _employeeService:EmployeeService,private _router:Router){

  }
ngOnInit(): void {
  // this.employeeForm=new FormGroup({
  //   fullName:new FormControl(),
  //   email:new FormControl(),
  //   skills:new FormGroup({
  //     skillName:new FormControl(),
  //     experienceInYears:new FormControl(),
  //     proficiency:new FormControl()
  //   })
  // })
  this.employeeForm=this._fb.group({
    id:[''],
    fullName:['',[Validators.required,Validators.minLength(2),Validators.maxLength(10)]],
    //email:['',[emailDomain]],
    // email:['',[CreateEmployeesComponent.emailDomain('gmail.com')]],
    emailGroup:this._fb.group({
      email:['',[CustomEmailDomainValidator.emailDomain('gmail.com')]],
      confirmEmail:['',Validators.required],
    },{validators:emailMisMatch}),
    phone:[''],
    contactPreference:['',[Validators.required]],
    // skills:this._fb.group({
    //   skillName:['',[Validators.required]],
    //   experienceInYears:['',[Validators.required]],
    //   //proficiency:['beginner',[Validators.required]]
    //   proficiency:['',[Validators.required]]
    // })
    skills:this._fb.array([
    this.LoadFormGroup()
    ])
  })
 
  // this.employeeForm.get('fullName')?.valueChanges.subscribe((value:string)=>{
  //   console.log(value);
  //   this.characterCount=value.length;
  // });
  // this.employeeForm.valueChanges.subscribe((value:any)=>{
  //   console.log(JSON.stringify(value));
  // });
  // this.employeeForm.get('skills')?.valueChanges.subscribe((value:string)=>{
  //     console.log(value);
  //     this.characterCount=value.length;
  //   });
this.employeeForm.valueChanges.subscribe((emp)=>
  {
    this.LoopThrough(this.employeeForm);
  })
this.employeeForm.controls['contactPreference'].valueChanges.subscribe((preferedOption)=>
  {
    if(preferedOption==='phone')
    {
      this.employeeForm.get('phone')?.setValidators([Validators.required]);
      this.employeeForm.get('email')?.clearValidators();
      //this.employeeForm.get('email')?.setValidators([emailDomain])
      // this.employeeForm.get('email')?.setValidators([CreateEmployeesComponent.emailDomain('gmail.com')])
      this.employeeForm.get('email')?.setValidators([CustomEmailDomainValidator.emailDomain('gmail.com')])
    }
    else
    {
      //this.employeeForm.get('email')?.setValidators([Validators.required,emailDomain]);
      // this.employeeForm.get('email')?.setValidators([Validators.required,CreateEmployeesComponent.emailDomain('gmail.com')]);
      this.employeeForm.get('email')?.setValidators([Validators.required,CustomEmailDomainValidator.emailDomain('gmail.com')]);
      this.employeeForm.get('phone')?.clearValidators();
    }
    this.employeeForm.get('email')?.updateValueAndValidity();
    this.employeeForm.get('phone')?.updateValueAndValidity();
  })
  this._activatedRoute.params.subscribe((val)=>
  {
    const id=  Number(val['id']);
    if(id){
      this.panelTitle="Edit Employee"
      this._employeeService.getEmployeeById(id).subscribe({
        next: (emp) => { 
          this.SetEmployeeDetails(emp);
        },
        error: (e) => console.log(e),
        complete: () => console.info('complete') 
        })
    } 
    else{
      this.panelTitle="Create Employee"
    }
  })
  
}
SetEmployeeDetails(emp:IEmployee)
{
  debugger;
  this.employeeForm.patchValue({
    id:emp.id,
    fullName:emp.fullName,
    emailGroup: {
      email:emp.email,
      confirmEmail:emp.email
    },
    phone:emp.phone,
    contactPreference:emp.contactPreference,
  })

  this.employeeForm.setControl('skills',this.PatchValueForFormArray(emp.skills))

}
PatchValueForFormArray(skillSets: ISkill[]): FormArray {
  const formArray = new FormArray<FormGroup>([]);
  skillSets.forEach(s => {
    formArray.push(this._fb.group({
      skillName: s.skillName,
      experienceInYears: s.experienceInYears,
      proficiency: s.proficiency
    }));
  });

  return formArray;
}
DeleteSkill(formArrayInstance:number)
{
  (<FormArray>this.employeeForm.get('skills')).removeAt(formArrayInstance);
  (<FormArray>this.employeeForm.get('skills')).markAsDirty;
  (<FormArray>this.employeeForm.get('skills')).markAsTouched;
}
getControls() {
  return (this.employeeForm.get('skills') as FormArray).controls;
}
LoadFormGroup():FormGroup{
    return this._fb.group({
      skillName:['',[Validators.required]],
      experienceInYears:['',[Validators.required]],
      proficiency:['',[Validators.required]]
    })
}
LoadData():void
{
  // this.employeeForm.setValue({
  //   fullName:'John',
  //   email:'john@gmail.com',
  //   skills:{
  //     skillName:'dotnet',
  //     experienceInYears:7,
  //     proficiency:'beginner'
  //   }
  // })
  // this.employeeForm.patchValue({
  //   fullName:'John',
  //   email:'john@gmail.com',   
  // })
  
  //this.LoopThrough(this.employeeForm);
}
AddSkill(){
  (<FormArray>this.employeeForm.controls['skills']).push(this.LoadFormGroup());
}
errorMessages:any={
  'fullName':{
    'required':'Full Name is required',
    'minlength':'Full Name should have min of 2 letters',
    'maxlength':'Full Name should have max of 10 letters'
  },
  'email':{
    'required':'Email is required',
    'emailDomain':'Domain should be \'gmail.com\''
  },
  'confirmEmail':{
    'required':'Confirm Email is required',
  },
  'emailGroup':{
    'mismatch':'Email and Confirm Email should match',
  },
  'phone':{
    'required':'Phone is required'
  },
  'contactPreference':{
    'required':'Contact preference is required'
  },
  //these are not required as errors are taken from controls directly in html since it is a form array
  // 'skillName':{
  //   'required':'Skill name is required'
  // },
  // 'experienceInYears':{
  //   'required':'Exp in years is required'
  // },
  // 'proficiency':{
  //   'required':'Proficiency is required'
  // }
}
formErrors:any={
  'fullName':'',
  'email':'',
  'confirmEmail':'',
  'emailGroup':'',
  'phone':'',
  'contactPreference':'',
  //these are not required as errors are taken from controls directly in html since it is a form array
  // 'skillName':'',
  // 'experienceInYears':'',
  // 'proficiency':''
}
// LoopThrough(group:FormGroup=this.employeeForm)
// {
//   Object.keys(group.controls).forEach((key:string)=>
//   {
//     const abstractControl=group.get(key)
//     this.formErrors[key] = '';
//     //console.log(key+" : "+abstractControl?.value)
//     if(abstractControl && abstractControl.errors &&
//       ((abstractControl.touched ||abstractControl.dirty)||key=='email' ||key=='phone'))
//     {
//       const msg=this.errorMessages[key];
//       for(var error in abstractControl?.errors)
//       {
//         this.formErrors[key]=msg[error];
//       }
//     }
//     if(abstractControl instanceof FormGroup)
//     {
//       this.LoopThrough(abstractControl);
//     }
//   })
//   console.log(this.formErrors)
// }

LoopThrough(group:FormGroup=this.employeeForm)
{
  Object.keys(group.controls).forEach((key:string)=>
  {
    const abstractControl=group.get(key)
    this.formErrors[key] = '';
    //console.log(key+" : "+abstractControl?.value)
    if(abstractControl && abstractControl.errors &&
      ((abstractControl.touched ||abstractControl.dirty)||key=='email' ||key=='phone'|| abstractControl.value!=='')
      )
    {
      const msg=this.errorMessages[key];
      for(var error in abstractControl?.errors)
      {
        this.formErrors[key]=msg[error];
      }
    }
    if(abstractControl instanceof FormGroup)
    {
      this.LoopThrough(abstractControl);
    }
    //No need to loop through controls in form array and record the errors as we need to loop through each instance which is not possible from here
    // if(abstractControl instanceof FormArray)
    // {
    //   for(let control of abstractControl.controls)
    //   {
    //     if(control instanceof FormGroup){
    //       {
    //         this.LoopThrough(control);
    //       }
    //     }
    //   }     
    // }
  })
  console.log(this.formErrors)
}
//employee:IEmployee;
employee={} as IEmployee;
onSubmit()
{
  debugger;
  this.employee.id=+this.employeeForm.get('id')?.value;
  this.employee.email=this.employeeForm.get('emailGroup')?.get('email')?.value;
  this.employee.phone=this.employeeForm.get('phone')?.value;
  this.employee.contactPreference=this.employeeForm.get('contactPreference')?.value;
  this.employee.fullName=this.employeeForm.get('fullName')?.value;
  this.employee.skills=this.employeeForm.get('skills')?.value;
  if(this.employeeForm.get('id')?.value=='')
  {
    this._employeeService.getEmployees().subscribe(data => {
      const maxId=Math.max.apply(Math,data.map(obj => obj.id)); 
      const newEmployee:IEmployee=this.employee;
      newEmployee.id=maxId+1;
    this._employeeService.saveEmployees(newEmployee)?.subscribe(
      (emp)=>{
        this._router.navigate(['employees/list']);
      }
    )
    })
  }
  else
  {
    const newEmployee:IEmployee=this.employee;
      this._employeeService.updateEmployees(newEmployee).subscribe({     
      next: () => { 
        this._router.navigate(['employees/list']);
      },
      error: (e) => console.log(e),
      complete: () => console.info('complete') 
      })
  }
}

static emailDomain(domainName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const email:string=control.value;
    const domain:string=email.substring(email.lastIndexOf('@')+1);
    if(email==='' || domain.toLocaleLowerCase()===domainName.toLocaleLowerCase())
    { //avoid validation if empty, we are not testing for required here
      return null;
    }
    const errors: ValidationErrors = {};
    if (email && domain.toLocaleLowerCase()!==domainName.toLocaleLowerCase()) {
      errors['emailDomain'] ={};
    }
    return Object.keys(errors).length ? errors : null;
  };
}

}
// function emailDomain(control: AbstractControl): {[key:string]:any} | null
// {
//   debugger;
//   const email:string=control.value;
//   const domain:string=email.substring(email.lastIndexOf('@')+1);
//   if(email==='' || domain==='gmail.com')
//   {
//     return null;
//   }
//   else 
//   {
//     return {'emailDomain':true};
//   }
// }
function emailMisMatch(form: AbstractControl): {[key:string]:any} | null
{
  const email:AbstractControl=form.get('email')?.value;
  const confirmEmail:AbstractControl=form.get('confirmEmail')?.value;
  if(email===confirmEmail || (form.get('confirmEmail')?.pristine && email.value==='' && confirmEmail.value===''))
  {
    return null;
  }
  else 
  {
    return {'mismatch':true};
  }
}


