import { Component, Input, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AccountModel } from 'src/app/models/account.model';
import { AccountService } from 'src/app/service/account.service';

@Component({
  selector: 'bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.css'],
})
export class BioComponent implements OnInit {
  @Input() account!: AccountModel;
  isVisible = false;
  accountForm!: UntypedFormGroup;
  translatedGameRole!: string;
  translatedTeamRole!: string;

  constructor(
    private accService: AccountService,
    private ufb: UntypedFormBuilder,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.accountForm = this.ufb.group({
      callsign: [
        this.account.callSign,
        [Validators.required, Validators.maxLength(128)],
      ],
      gameRole: [this.account.gameRole, [Validators.required]],
      desc: [this.account.desc, [Validators.maxLength(2000)]],
    });

    this.translateRoles();
  }

  CreateAccount() {
    if (this.accountForm.valid) {
      this.accService.updateAccount(this.accountForm.value).subscribe({
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

  haveTeam(): boolean {
    return !!this.account.teamName;
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  translateRoles(): void {
    switch (this.account.gameRole) {
      case 'Stormtrooper': {
        this.translatedGameRole = 'Штурмовик';
        break;
      }
      case 'Sniper': {
        this.translatedGameRole = 'Снайпер';
        break;
      }
      case 'Marksman': {
        this.translatedGameRole = 'Марксман';
        break;
      }
      case 'MachineGunner': {
        this.translatedGameRole = 'Пулеметчик';
        break;
      }
      case 'Other': {
        this.translatedGameRole = 'Нет такой роли, чтобы описать меня';
        break;
      }
    }

    switch (this.account.teamRole) {
      case 'Commander': {
        this.translatedTeamRole = 'Командир';
        break;
      }
      case 'DeputyCommander': {
        this.translatedTeamRole = 'Зам Командира';
        break;
      }
      case 'Member': {
        this.translatedTeamRole = 'Участник';
        break;
      }
      default:
        break;
    }
  }
}
