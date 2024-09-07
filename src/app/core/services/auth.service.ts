import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData:any = null;
  private readonly _HttpClient = inject(HttpClient);
  private _Router = inject(Router);
  setRegisterformdata(data:object):Observable<any>
  {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signup`,data);
  }
  setloginformdata(data:object):Observable<any>
  {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signin`,data);
  }
   saveUserData():void
   {
      if(localStorage!==null)
      {
         this.userData= jwtDecode(localStorage.getItem('userToken')!)
      }
      console.log(this.userData)
   }
   logout()
   {
    console.log("hoiiii")

    localStorage.removeItem('userToken');
    this.userData=null;
    this._Router.navigate(['/login'])

   }
   setVerifyEmail(data:object):Observable<any>
   {
       return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`,data)
   }
   setVerifyCode(data:object):Observable<any>
   {
       return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`,data)
   }
  setNewPass(data:object):Observable<any>
   {
       return this._HttpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`,data)
   }
}
