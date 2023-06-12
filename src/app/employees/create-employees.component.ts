import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-create-employees',
  templateUrl: './create-employees.component.html',
  styleUrls: ['./create-employees.component.css']
})
export class CreateEmployeesComponent implements OnInit{
  employeeForm:FormGroup;
  //characterCount:number;
  constructor(private _fb:FormBuilder){

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
    fullName:['',[Validators.required,Validators.minLength(2),Validators.maxLength(10)]],
    email:['',emailDomain],
    phone:[''],
    contactPreference:['',[Validators.required]],
    skills:this._fb.group({
      skillName:['',[Validators.required]],
      experienceInYears:['',[Validators.required]],
      //proficiency:['beginner',[Validators.required]]
      proficiency:['',[Validators.required]]
    })
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
    debugger;
    if(preferedOption==='phone')
    {
      this.employeeForm.get('phone')?.setValidators([Validators.required]);
      this.employeeForm.get('email')?.clearValidators();
      this.employeeForm.get('email')?.setValidators([emailDomain])
    }
    else
    {
      this.employeeForm.get('email')?.setValidators([Validators.required,emailDomain]);
      this.employeeForm.get('phone')?.clearValidators();
    }
    this.employeeForm.get('email')?.updateValueAndValidity();
    this.employeeForm.get('phone')?.updateValueAndValidity();
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
  'phone':{
    'required':'Phone is required'
  },
  'contactPreference':{
    'required':'Contact preference is required'
  },
  'skillName':{
    'required':'Skill name is required'
  },
  'experienceInYears':{
    'required':'Exp in years is required'
  },
  'proficiency':{
    'required':'Proficiency is required'
  }
}
formErrors:any={
  'fullName':'',
  'email':'',
  'phone':'',
  'contactPreference':'',
  'skillName':'',
  'experienceInYears':'',
  'proficiency':''
}
LoopThrough(group:FormGroup=this.employeeForm)
{
  Object.keys(group.controls).forEach((key:string)=>
  {
    const abstractControl=group.get(key)
    if(abstractControl instanceof FormGroup)
    {
      this.LoopThrough(abstractControl);
    }
    else
    {
      this.formErrors[key] = '';
      //console.log(key+" : "+abstractControl?.value)
      if(abstractControl && abstractControl.errors &&
        ((abstractControl.touched ||abstractControl.dirty)||key=='email' ||key=='phone'))
      {
        const msg=this.errorMessages[key];
        for(var error in abstractControl?.errors)
        {
          this.formErrors[key]=msg[error];
        }
      }
      
    }
  })
  console.log(this.formErrors)
}

onSubmit()
{
  console.log(this.employeeForm)
  console.log(this.employeeForm.controls['fullName'].value)
  console.log(this.employeeForm.get('fullName')?.valid)
}



}
function emailDomain(control: AbstractControl): {[key:string]:any} | null
{
  debugger;
  const email:string=control.value;
  const domain:string=email.substring(email.lastIndexOf('@')+1);
  if(email==='' || domain==='gmail.com')
  {
    return null;
  }
  else 
  {
    return {'emailDomain':true};
  }
}
