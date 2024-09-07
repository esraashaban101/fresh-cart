import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  msgerror: string = '';
  isLoading: boolean = false;
  private readonly _AuthService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router= inject(Router);
  formlogin: FormGroup = this._FormBuilder.group(
    {

      email: [null, [Validators.required, Validators.email]],

      password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],


    }
  );
  // formlogin: FormGroup = new FormGroup(
  //   {
  //     name: new FormControl(null, [
  //       Validators.required,
  //       Validators.minLength(3),
  //       Validators.maxLength(20),
  //     ]),
  //     email: new FormControl(null, [Validators.required, Validators.email]),
  //     password: new FormControl(null, [
  //       Validators.required,
  //       Validators.pattern(/^\w{6,}$/),
  //     ]),
  //     rePassword: new FormControl(null),
  //     phone: new FormControl(null, [
  //       Validators.required,
  //       Validators.pattern(/^01[0125][0-9]{8}$/),
  //     ]),
  //   },
  //   this.confirmpassword
  // );

  loginSubmit(): void {
    this.isLoading = true;
    if (this.formlogin.valid)
      this._AuthService.setloginformdata(this.formlogin.value).subscribe({
        next: (res) => {
          console.log(res);
          if(res.message =="success")
          {
            // save token
            localStorage.setItem('userToken', res.token);
          this._AuthService.saveUserData();
            this._Router.navigate(['/home'])
          }
          this.isLoading = false;
        },
        error: (err) => {
          console.log((this.msgerror = 'In Correct email or Password'));
          this.isLoading = false;
        },
      });
      else{
             this.formlogin.markAllAsTouched()
      }
  }
}
