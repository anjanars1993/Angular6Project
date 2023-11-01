import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {HomeComponent} from './home.component';
import {PageNotFoundComponent} from './page-not-found.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { EmployeeService } from './employees/employee.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent } from "@azure/msal-angular";
import { PublicClientApplication, InteractionType  } from "@azure/msal-browser";
const isIE =
  window.navigator.userAgent.indexOf("MSIE ") > -1 ||
  window.navigator.userAgent.indexOf("Trident/") > -1;
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set("https://graph.microsoft.com/v1.0/me", ["user.read"]);
  protectedResourceMap.set("https://ars-portal.azurewebsites.net", ["api://75498e66-1137-4092-82a1-19a1e739c5db/Read.Name"]);

@NgModule({
  declarations: [
    AppComponent,HomeComponent,PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,AppRoutingModule,HttpClientModule, MsalModule.forRoot(
      new PublicClientApplication({
        auth: {
          clientId: "4328f07a-199a-4ac2-ad81-4f411ffef36c", // Application (client) ID from the app registration
          authority:
            "https://login.microsoftonline.com/00ff3f75-9797-4ed6-997e-ec40ebe706e4 ", // The Azure cloud instance and the app's sign-in audience (tenant ID, common, organizations, or consumers)
          redirectUri: "https://ars-online.com/home", // This is your redirect URI
        },
        cache: {
          cacheLocation: "localStorage",
          storeAuthStateInCookie: isIE, // Set to true for Internet Explorer 11
        },
      }),
      {
        interactionType: InteractionType.Popup, // MSAL Guard Configuration
        authRequest: {
          scopes: ['user.read','api://75498e66-1137-4092-82a1-19a1e739c5db/Read.Name']
        },
        loginFailedRoute: "https://google.com" 
    }, {
        interactionType: InteractionType.Redirect, // MSAL Interceptor Configuration
        protectedResourceMap
    }),
  ],
  providers: [EmployeeService,{
    provide: HTTP_INTERCEPTORS,
    useClass: MsalInterceptor,
    multi: true},
    MsalGuard],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
