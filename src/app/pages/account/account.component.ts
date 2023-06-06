import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthorType } from 'src/app/app.module';
import { AccountModel } from 'src/app/models/account.model';
import { InfoPostModel } from 'src/app/models/infoPost.model';
import { AccountService } from 'src/app/service/account.service';
import { InfoService } from 'src/app/service/info.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  infos: InfoPostModel[] = [];
  account!: AccountModel;
  accountForm!: UntypedFormGroup;
  infoForm!: UntypedFormGroup;
  show: boolean = false;

  isVisible: boolean = false;

  constructor(
    private accService: AccountService,
    private ufb: UntypedFormBuilder,
    private message: NzMessageService,
    private infoService: InfoService
  ) {}

  ngOnInit(): void {
    this.accService.getAccount().subscribe({
      next: (response) => {
        if (response != null) {
          this.account = response;
          this.infoService
            .getAllInfos({
              authorId: '00000000-0000-0000-0000-000000000000',
              authorType: AuthorType.Player,
            })
            .subscribe({
              next: (infoPosts) => {
                this.infos = infoPosts;
              },
            });
        }
        this.show = true;
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

    this.infoForm = this.ufb.group({
      text: [null, [Validators.required, Validators.maxLength(2000)]],
      authorType: [AuthorType.Player],
      authorId: ['00000000-0000-0000-0000-000000000000'],
    });
  }

  haveAccount(): boolean {
    return !!this.account;
  }

  CreateInfoPost() {
    if (this.infoForm.valid) {
      this.infoService.addInfo(this.infoForm.value).subscribe({
        next: (res) => {
          this.isVisible = false;
          window.location.reload();
        },
        error: (err) => {
          this.createMessage();
          console.log(err);
        },
      });
    } else {
      Object.values(this.infoForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
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

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
