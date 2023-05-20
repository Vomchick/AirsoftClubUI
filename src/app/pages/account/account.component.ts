import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AccountModel } from 'src/app/models/account.model';
import { InfoModel } from 'src/app/models/info.model';
import { AccountService } from 'src/app/service/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  infos: InfoModel[] = [];
  account!: AccountModel;
  accountForm!: UntypedFormGroup;
  show: boolean = false;

  constructor(
    private accService: AccountService,
    private ufb: UntypedFormBuilder,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.accService.getAccount().subscribe({
      next: (response) => {
        if (response != null) {
          this.account = response;
          this.show = true;
        }
      },
      error: (err) => {
        this.message.error('Сервер недоступен');
        console.log(err);
      },
    });

    this.accountForm = this.ufb.group({
      callsign: [null, [Validators.required, Validators.maxLength(128)]],
      gameRole: [null, [Validators.required]],
      desc: [null, [Validators.maxLength(2000)]],
    });
  }

  haveAccount(): boolean {
    return !!this.account;
  }

  CreateAccount() {
    if (this.accountForm.valid) {
      this.accService.addAccount(this.accountForm.value).subscribe({
        next: (res) => {
          window.location.reload();
        },
        error: (err) => {
          this.createMessage();
          console.log(err);
        },
      });
    } else {
      Object.values(this.accountForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  createMessage(): void {
    this.message.error(
      'Что-то пошло не так. Проверьте введенные данные или попробуйте позже'
    );
  }
}
