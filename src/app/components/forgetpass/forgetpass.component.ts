import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpass',
  standalone: true,
  imports:[ReactiveFormsModule],
  templateUrl: './forgetpass.component.html',
  styleUrl: './forgetpass.component.scss'
})
export class ForgetpassComponent
{
  step:number = 1;
  private readonly _AuthService= inject(AuthService);
  private readonly _Router=inject(Router)
  verifyEmail:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
  })
  verifyCode:FormGroup = new FormGroup({
    resetCode:new FormControl(null,[Validators.required,Validators.pattern(/^[0-9/]{6}$/)]),
  })
  resetPass:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    newPassword:new FormControl(null,[Validators.required,Validators.pattern(/^[0-9/]{6}$/)])
  })

 verifyEmailSubmit()
 {
  let emailvalue= this.verifyEmail.get('email')?.value;
  this.resetPass.get('email')?.patchValue(emailvalue);
  this._AuthService.setVerifyEmail(this.verifyEmail.value).subscribe(
    {
      next:(res)=>{
              console.log(res)
              if(res.statusMsg=='success')
              {
                this.step=2;
              }
      },
      error:(err)=>{
              console.log(err);

      }
    }
  )

 }
 verifyCodeSubmit()
 {
  this._AuthService.setVerifyCode(this.verifyCode.value).subscribe(
    {
      next:(res)=>{
              console.log(res)
              if(res.status=='Success')
              {
                this.step=3;
              }
      },
      error:(err)=>{
              console.log(err);

      }
    }
  )

 }
 verifyPassSubmit()
 {
  this._AuthService.setNewPass(this.resetPass.value).subscribe(
    {
      next:(res)=>{
              console.log(res)
               localStorage.setItem('userToken', res.token);
               this._AuthService.saveUserData()
               this._Router.navigate(['/home'])
      },
      error:(err)=>{
              console.log(err);

      }
    }
  )
 }
}
