import { Component, Input, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NzIconService } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { delay } from 'rxjs';
import { TeamRoles } from 'src/app/app.module';
import { AccountModel } from 'src/app/models/account.model';
import { TeamClubModel } from 'src/app/models/teamClub.model';
import { AccountService } from 'src/app/service/account.service';
import { ClubService } from 'src/app/service/club.service';
import { TeamService } from 'src/app/service/team.service';

@Component({
  selector: 'bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.css'],
})
export class BioComponent implements OnInit {
  @Input() account!: AccountModel;
  @Input() teamClub!: TeamClubModel;
  @Input() isTeam!: boolean;
  @Input() TeamRole: TeamRoles = TeamRoles.Member;
  @Input() ClubChange: boolean = false;

  isVisibleTeamClub = false;
  isVisibleAccount = false;

  accountForm!: UntypedFormGroup;
  teamClubForm!: UntypedFormGroup;

  translatedGameRole!: string;
  translatedTeamRole!: string;

  constructor(
    private accService: AccountService,
    private teamService: TeamService,
    private clubService: ClubService,
    private ufb: UntypedFormBuilder,
    private message: NzMessageService,
    private router: Router,
    private iconService: NzIconService
  ) {
    this.iconService.fetchFromIconfont({
      scriptUrl: 'https://at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
    });
  }

  ngOnInit(): void {
    /*if (!!this.teamClub && this.isTeam) {
      this.teamService.getRights(this.teamClub.id).subscribe({
        next: (res) => {
          if (res != null && res != TeamRoles.Member) {
            this.CanChange = true;
          }
        },
      });
    } else {
      this.clubService.getRights(this.teamClub.id).subscribe({
        next: (res) => {
          if (res != null) this.CanChange = res;
        },
      });
    }*/

    if (!!this.account) {
      this.accountForm = this.ufb.group({
        callsign: [
          this.account.callSign,
          [Validators.required, Validators.maxLength(128)],
        ],
        gameRole: [this.account.gameRole, [Validators.required]],
        desc: [this.account.desc, [Validators.maxLength(2000)]],
        //image: [this.account.imageFile, []],
      });
      this.translateRoles();
    }
    if (!!this.teamClub) {
      this.teamClubForm = this.ufb.group({
        name: [
          this.teamClub.name,
          [Validators.required, Validators.maxLength(128)],
        ],
        description: [this.teamClub.description, [Validators.maxLength(2000)]],
      });
    }
  }

  /*handleChange(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      this.message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      this.message.error(`${info.file.name} file upload failed.`);
    }
  }*/

  NotMember() {
    if (this.TeamRole != null && this.TeamRole != TeamRoles.Member) return true;
    else return false;
  }

  IsCommander() {
    if (this.TeamRole == TeamRoles.Commander) return true;
    else return false;
  }

  UpdateAccount() {
    //debugger;
    if (this.accountForm.valid) {
      this.accService.updateAccount(this.accountForm.value).subscribe({
        next: (res) => {
          this.isVisibleAccount = false;
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

  UpdateTeamClub() {
    //debugger;
    if (this.teamClubForm.valid && this.isTeam) {
      this.teamService.updateTeam(this.teamClubForm.value).subscribe({
        next: (res) => {
          this.isVisibleTeamClub = false;
          window.location.reload();
        },
        error: (err) => {
          this.createMessage();
          console.log(err);
        },
      });
    } else if (this.teamClubForm.valid) {
      this.clubService
        .updateClub(this.teamClub.id, this.teamClubForm.value)
        .subscribe({
          next: (res) => {
            this.isVisibleTeamClub = false;
            window.location.reload();
          },
          error: (err) => {
            this.createMessage();
            console.log(err);
          },
        });
    } else {
      Object.values(this.teamClubForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  deleteTeamClub() {
    if (this.isTeam) {
      this.teamService.deleteTeam().subscribe({
        next: () => {
          this.router.navigate(['teams']);
        },
        error: (err) => {
          this.createMessage();
          console.log(err);
        },
      });
    }
    if (!this.isTeam) {
      this.clubService.deleteClub(this.teamClub.id).subscribe({
        next: () => {
          this.router.navigate(['clubs']);
        },
        error: (err) => {
          this.createMessage();
          console.log(err);
        },
      });
    }
  }

  TeamLeave() {
    if (this.isTeam) {
      this.teamService.leaveTeam().subscribe({
        next: () => {
          this.router.navigate(['teams']);
        },
        error: (err) => {
          this.createMessage();
          console.log(err);
        },
      });
    }
  }

  beforeUpload(file: File) {
    console.log(file);
    return false;
  }

  createMessage(): void {
    this.message.error(
      'Что-то пошло не так. Проверьте введенные данные или попробуйте позже'
    );
  }

  haveTeam(): boolean {
    return !!this.account.teamName;
  }

  isItAccount(): boolean {
    return !!this.account;
  }

  showModalAccount(): void {
    this.isVisibleAccount = true;
  }

  handleCancelAccount(): void {
    this.isVisibleAccount = false;
  }

  showModalTeamClub(): void {
    this.isVisibleTeamClub = true;
  }

  handleCancelTeamClub(): void {
    this.isVisibleTeamClub = false;
  }

  AccountFirst(): string {
    return this.account.callSign.substring(0, 1);
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
