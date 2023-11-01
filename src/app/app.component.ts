import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular6Project';
  user:string|undefined;
  constructor(private authService:MsalService)
  {

  }
  ngOnInit(): void {
    this.getName();
  }
  
  LogIn()
  {
    this.authService.loginPopup()
    .subscribe((response:AuthenticationResult)=>
    { this.authService.instance.setActiveAccount(response.account);
    })

  }
  LogOut()
  {
    this.authService.logout();
  }
  getIsLoggedIn()
  {
    return this.authService.instance.getActiveAccount()!=null;
  }
  getName()
  {
    if(this.authService.instance.getActiveAccount()==null)
    {
      this.user= 'unknown';

    }
    else this.user= this.authService.instance.getActiveAccount()?.name;
  }
}
