import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: UntypedFormGroup;
  passwordVisible = false;

  constructor(
    private authService: AuthService,
    private ufb: UntypedFormBuilder,
    private router: Router,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.ufb.group({
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
    });
  }

  createMessage(): void {
    this.message.error(
      'Что-то пошло не так. Проверьте свой пароль и логин или попробуйте позже'
    );
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
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
      Object.values(this.loginForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
