import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm!: UntypedFormGroup;

  passwordVisible = false;
  passwordConfirmVisible = false;

  constructor(
    private authService: AuthService,
    private ufb: UntypedFormBuilder,
    private router: Router,
    private message: NzMessageService
  ) {}

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

  ngOnInit(): void {
    this.registerForm = this.ufb.group({
      userName: [null, [Validators.required, Validators.maxLength(20)]],
      password: [
        null,
        [
          Validators.required,
          Validators.pattern(/^(?=.*[0-9])(?=.*\w\D)[\w]{8,}/),
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
  createMessage(): void {
    this.message.error(
      'Что-то пошло не так. Воспользуйтесь другим логином, возможно этот занят, или попробуйте позже'
    );
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (res) => {
          window.location.reload();
          //this.router.navigate(['account']);
        },
        error: (err) => {
          this.createMessage();
          console.log(err);
        },
      });
    } else {
      Object.values(this.registerForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
