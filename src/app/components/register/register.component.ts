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
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  msgerror: string = '';
  isLoading: boolean = false;
  private readonly _AuthService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router= inject(Router);
  formRegister: FormGroup = this._FormBuilder.group(
    {
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      email: [null, [Validators.required, Validators.email]],

      password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
      rePassword: [null],
      phone: [
        null,
        [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
      ],
    },
    {
      validators: this.confirmpassword,
    }
  );
  // formRegister: FormGroup = new FormGroup(
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

  confirmpassword(g: AbstractControl) {
    if (g.get('password')?.value === g.get('rePassword')?.value) return null;
    else return { mismatch: true };
  }
  registerSubmit(): void {
    this.isLoading = true;
    if (this.formRegister.valid)
      this._AuthService.setRegisterformdata(this.formRegister.value).subscribe({
        next: (res) => {
          console.log(res);
          if(res.message =="success")
          {

            this._Router.navigate(['/login'])
          }
          this.isLoading = false;
        },
        error: (err) => {
          console.log((this.msgerror = err.error.message));
          this.isLoading = false;
        },
      });
      else{
             this.formRegister.markAllAsTouched()
      }
  }
}
