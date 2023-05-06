import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm!: UntypedFormGroup;

  confirmationValidator = (
    control: UntypedFormControl
  ): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.registerForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  constructor(
    private authService: AuthService,
    private ufb: UntypedFormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.ufb.group({
      userName: [null, [Validators.required, Validators.maxLength(20)]],
      password: [
        null,
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[A-Za-z]|[А-Яа-я])(?=.*\d)[A-Za-z\d]|[А-Яа-я\d]{8,}$/
          ),
        ],
      ],
      confirmPassword: [
        null,
        [Validators.required, this.confirmationValidator],
      ],
    });
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() =>
      this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    );
  }

  onSubmit() {
    /*if (this.loginForm.valid) {
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.router.navigate(['admin']);
      },
      error: (err) => {
        alert(
          'Something went wrong. Check your password and username or try later'
        );
        console.log(err);
      },
    });
  } else {
    Object.values(this.loginForm.controls).forEach((control) => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }*/
    //тут должен быть subscribe
    //this.authService.login(this.user);
    //this.clearUser();
  }
}
